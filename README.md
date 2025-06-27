
# 🎥 Plotrix

Plotrix is a **semantic movie search** and **AI-powered exploration** web app that helps you rediscover movies by describing what you remember—plot snippets, scenes, characters, or any detail. Under the hood, Plotrix uses MindsDB Knowledge Bases for vector‐based semantic search over a 7,000+ movie corpus, FastAPI for its backend API, and a React/Tailwind frontend for a snappy, modern UX.

[![Viewers](https://img.shields.io/github/watchers/roshni-pahari/plotrix?style=social)](https://github.com/roshni-pahari/plotrix/watchers)

---

## 📺 Live Demo

<iframe src="https://www.loom.com/embed/fd17ea7b39bd45179cc815ddaae2900e?sid=8c578f7a-de00-40e2-86e4-2db56b12f06a?autoplay=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen width="100%" height="400"></iframe>

---

## 🌟 What Plotrix Does

1. **Semantic Plot Search**  
   - Describe any piece of a movie plot in plain English.  
   - MindsDB embeds your query and finds the top-4 closest movie plots from our KB.

2. **Poster Integration**  
   - Fetches high-quality poster images from TMDB for each result.

3. **AI-Generated Metadata**  
   - Uses MindsDB AI Tables to infer director, cast, box office, ratings, mood tags, and similar titles.

4. **Interactive Q&A Bot**  
   - A MindsDB Agent lets you ask follow-up questions (“What’s the twist ending?”, “Who directed this?”) and get concise answers.

5. **Filter by Origin & Year**  
   - Combine semantic search with SQL filters on metadata (e.g., “American films from 2010”).

---

## 📸 Screenshots

### 🏠 Landing Page
![Landing Page 1](https://github.com/user-attachments/assets/326cd499-c726-4d31-acdf-0089c2ba6810)  
![Landing Page 2](https://github.com/user-attachments/assets/48408930-b5bc-46de-85a4-a3b398b0e5ea)

### 🔍 Search Results
![Search Results with Posters](https://github.com/user-attachments/assets/541bcb7b-36df-41cb-88f7-5f4dbc9f5788)

### 🎬 Movie Details
![Movie Details](https://github.com/user-attachments/assets/2a377222-24a2-4027-8e07-f4aba043cbf5)

### 🤖 Movie Expert Bot Chat
![Movie-expert Bot Chat](https://github.com/user-attachments/assets/ee4aa111-5612-4110-b61e-7ada4fa6d3f3)

### ℹ️ About Page
![About Page](https://github.com/user-attachments/assets/8a1ba80a-0c85-45a4-a0ab-e19fe92ca15f)

---

## 🏗️ Architecture & Tech Stack

- **MindsDB** (via Docker Compose)  
  - **KB**: Semantic search over cleaned Wikipedia Movie Plots (2000–2017, ~7,000 entries)  
  - **Agent** & **AI Tables**: Q&A and metadata enrichment  
- **FastAPI** (Python)  
  - `/search_movies` → semantic SELECT queries  
  - `/movie_poster` → TMDB integration  
  - `/movie_insights` → Agent Q&A  
  - `/movie_metadata` → AI Table enrichment  
- **React + Tailwind**  
  - Landing page with rotating plot examples & poster carousel  
  - Search UI, filters, results grid, insights modal  
- **TMDB API** for poster images  
- **Docker Compose** for local MindsDB instance

---

## 🛠️ Getting Started

### Prerequisites
- Docker & Docker Compose  
- Python 3.8+  
- Node.js & Yarn  

### 1. Backend Setup

```bash
git clone https://github.com/roshni-pahari/plotrix.git
cd plotrix
````

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

1. **Create `.env` file:**

```env
TMDB_API_KEY=your_tmdb_api_key
MINDSDB_URL=http://127.0.0.1:47334
MINDSDB_PROJECT=mindsdb
OPENAI_API_KEY=your_openai_api_key
```

2. **Start MindsDB:**

```bash
docker compose up -d
# To stop: docker compose down
```

3. **Run FastAPI Backend:**

```bash
uvicorn app:app --reload
```

### 2. Frontend Setup

```bash
cd frontend
yarn install
yarn run dev
```

Then open: `http://localhost:3000`

---

## 📋 MindsDB Setup (Summary)

Inside MindsDB’s SQL editor, paste the `.txt` files in this order:

1. `database_setup.txt`
2. `kb_setup.txt`
3. `agent_setup.txt`
4. `ai_model_setup.txt`
5. *(Optional)* `evaluation_test.txt`

👉 Full guide in [`MINDSDB_SETUP.md`](mindsdb/MINDSDB_SETUP.md)

---

## 🎯 Quest 019 Compliance

| Requirement                        | Implementation                         |
| ---------------------------------- | -------------------------------------- |
| CREATE KNOWLEDGE\_BASE & INSERT    | ✅ `1_sematic_search.txt`               |
| Semantic SELECT + WHERE LIKE query | ✅ `/search_movies`                     |
| Metadata filters (origin/year)     | ✅ SQL filters included                 |
| CREATE JOB                         | ✅ in `1_sematic_search.txt`            |
| AI Tables & Agent                  | ✅ `2_agent&tables.txt`                 |
| Demo video & README                | ✅ This file + Loom demo                |
| +10 pts CREATE AGENT               | ✅ `/movie_insights`                    |
| +10 pts AI Table enrichment        | ✅ `/movie_metadata`                    |
| +10 pts Evaluate Knowledge Base    | ⚠️ `3_evaluate_syntax.txt` (bug noted) |

> **Note:** Known issue where `EVALUATE KNOWLEDGE_BASE` sorts by `doc_id` instead of semantic similarity.

---

## 🙏 Acknowledgments

* Dataset: [Wikipedia Movie Plots (Kaggle)](https://www.kaggle.com/datasets/jrobischon/wikipedia-movie-plots)
* AI & Vector Search: [MindsDB](https://mindsdb.com), [OpenAI](https://openai.com)
* Posters: [TMDB](https://www.themoviedb.org)

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---
