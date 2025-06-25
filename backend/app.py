import os
import json
import logging
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

# MindsDB connection
try:
    con = mindsdb_sdk.connect(os.getenv("MINDSDB_URL", "http://127.0.0.1:47334"))
    project = con.get_project(os.getenv("MINDSDB_PROJECT", "mindsdb"))
except Exception as e:
    logger.error(f"Failed to connect to MindsDB: {e}")
    raise RuntimeError(f"Failed to connect to MindsDB: {e}")

def escape_sql_string(value: str) -> str:
    return value.replace("'", "''")

# ---------------- Movie Semantic Search ----------------

class MovieSearchRequest(BaseModel):
    query: str
    origin: Optional[str] = None
    release_year: Optional[int] = None

class MovieSearchResponse(BaseModel):
    title: str
    origin: Optional[str]
    release_year: Optional[int]
    snippet: str
    relevance: float

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
            out.append(MovieSearchResponse(
                title=metadata.get("title", "Unknown"),
                origin=metadata.get("origin"),
                release_year=(int(metadata["release_year"]) if metadata.get("release_year") is not None else None),
                snippet=row.get("chunk_content", ""),
                relevance=row.get("relevance", 0.0)
            ))
        return out
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"search_movies failed: {e}")
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
