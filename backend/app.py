import os
import json
import logging
import requests
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mindsdb_sdk
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# TMDB API Configuration
TMDB_API_KEY = os.getenv("MY_API_KEY")
TMDB_BASE_URL = "https://api.themoviedb.org/3"
TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500"

# MindsDB connection
try:
    con = mindsdb_sdk.connect(os.getenv("MINDSDB_URL", "http://127.0.0.1:47334"))
    project = con.get_project(os.getenv("MINDSDB_PROJECT", "mindsdb"))
except Exception as e:
    logger.error(f"Failed to connect to MindsDB: {e}")
    raise RuntimeError(f"Failed to connect to MindsDB: {e}")

def escape_sql_string(value: str) -> str:
    return value.replace("'", "''")

async def fetch_movie_poster(title: str, year: Optional[int] = None) -> Optional[str]:
    """Fetch movie poster URL from TMDB API"""
    try:
        # search_query = f"{title} {year}" if year else title
        search_query = f"{title}"
        # TMDB API request
        response = requests.get(
            f"{TMDB_BASE_URL}/search/movie",
            params={
                "api_key": TMDB_API_KEY,
                "query": search_query,
                "include_adult": "false",
                "language": "en-US",
                "page": 1
            },
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("results"):
                # Get the first result's poster
                poster_path = data["results"][0].get("poster_path")
                if poster_path:
                    return f"{TMDB_IMAGE_BASE}{poster_path}"
        
        logger.warning(f"No poster found for movie: {title} ({year})")
        return None
        
    except requests.exceptions.RequestException as e:
        logger.error(f"TMDB API request failed for {title}: {e}")
        return None
    except Exception as e:
        logger.error(f"Unexpected error fetching poster for {title}: {e}")
        return None

# ---------------- Movie Semantic Search ----------------

class MovieSearchRequest(BaseModel):
    query: str
    origin: Optional[str] = None
    release_year: Optional[int] = None

class MovieSearchResponse(BaseModel):
    title: str
    origin: Optional[str]
    genre: str
    release_year: Optional[int]
    snippet: str
    relevance: float
    poster_url: Optional[str] = None  # New field for poster URL

@app.post("/search_movies", response_model=list[MovieSearchResponse])
async def search_movies(request: MovieSearchRequest):
    try:
        esc = escape_sql_string(request.query)
        q = f"SELECT * FROM plotrix_kb WHERE content = '{esc}'"
        if request.origin:
            q += f" AND origin = '{escape_sql_string(request.origin)}'"
        if request.release_year:
            q += f" AND release_year = {request.release_year}"
        q += " LIMIT 4;"
        
        logger.info(f"Running search_movies query: {q}")
        result = project.query(q)
        rows = result.fetch()
        
        if rows.empty:
            raise HTTPException(status_code=404, detail="No matching movies found")
        
        out = []
        for _, row in rows.iterrows():
            metadata = {}
            try:
                metadata = json.loads(row.get("metadata", "{}"))
            except Exception:
                logger.warning(f"Bad metadata: {row.get('metadata')}")
            
            title = metadata.get("title", "Unknown")
            release_year = (int(metadata["release_year"]) if metadata.get("release_year") is not None else None)
            
            # Fetch poster URL from TMDB
            poster_url = await fetch_movie_poster(title, release_year)
            
            movie_response = MovieSearchResponse(
                title=title,
                origin=metadata.get("origin"),
                genre=metadata.get("genre", ""),
                release_year=release_year,
                snippet=row.get("chunk_content", ""),
                relevance=row.get("relevance", 0.0),
                poster_url=poster_url
            )
            
            out.append(movie_response)
            
        logger.info(f"Found {len(out)} movies with poster data")
        return out
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"search_movies failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Optional: Separate endpoint for poster fetching (if you want to fetch posters separately)
@app.get("/movie_poster/{movie_title}")
async def get_movie_poster(movie_title: str, year: Optional[int] = None):
    """Separate endpoint to fetch movie poster"""
    try:
        poster_url = await fetch_movie_poster(movie_title, year)
        return {"poster_url": poster_url}
    except Exception as e:
        logger.error(f"get_movie_poster failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ---------------- Movie Q&A Bot (origin & release_year required) ----------------

class MovieBotRequest(BaseModel):
    title: str
    plot: str
    origin: str
    release_year: int
    question: str

class MovieBotResponse(BaseModel):
    answer: str

@app.post("/movie_insights", response_model=MovieBotResponse)
async def movie_insights(request: MovieBotRequest):
    try:
        t = escape_sql_string(request.title)
        p = escape_sql_string(request.plot)
        o = escape_sql_string(request.origin)
        ry = request.release_year
        q_text = escape_sql_string(request.question)
        q = (
            "SELECT answer FROM plotrix_bot WHERE "
            f"title = '{t}' AND "
            f"plot = '{p}' AND "
            f"origin = '{o}' AND "
            f"release_year = {ry} AND "
            f"question = '{q_text}';"
        )
        logger.info(f"Running movie_insights query: {q}")
        result = project.query(q)
        rows = result.fetch()
        if rows.empty:
            raise HTTPException(status_code=404, detail="No answer found")
        return MovieBotResponse(answer=rows.iloc[0]["answer"])
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"movie_insights failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ---------------- Movie Metadata Enrichment (all fields required) ----------------

class MovieEnrichRequest(BaseModel):
    title: str
    plot: str
    genre: str
    origin: str
    release_year: int

class MovieEnrichResponse(BaseModel):
    response: str

@app.post("/movie_metadata", response_model=MovieEnrichResponse)
async def movie_metadata(request: MovieEnrichRequest):
    try:
        t = escape_sql_string(request.title)
        p = escape_sql_string(request.plot)
        g = escape_sql_string(request.genre)
        o = escape_sql_string(request.origin)
        ry = request.release_year
        q = (
            "SELECT response FROM movie_info WHERE "
            f"title = '{t}' AND "
            f"plot = '{p}' AND "
            f"genre = '{g}' AND "
            f"origin = '{o}' AND "
            f"release_year = {ry};"
        )
        logger.info(f"Running movie_metadata query: {q}")
        result = project.query(q)
        rows = result.fetch()
        if rows.empty:
            raise HTTPException(status_code=404, detail="No enriched metadata found")
        return MovieEnrichResponse(response=rows.iloc[0]["response"])
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"movie_metadata failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "tmdb_configured": bool(TMDB_API_KEY)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)