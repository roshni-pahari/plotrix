
# 🎥 Plotrix

Plotrix is a **semantic movie search** and **AI-powered exploration** web app that helps you rediscover movies by describing what you remember—plot snippets, scenes, characters, or any detail. Under the hood, Plotrix uses MindsDB Knowledge Bases for vector‐based semantic search over a 7,000+ movie corpus, FastAPI for its backend API, and a React/Tailwind frontend for a snappy, modern UX.


---

📺 **Demo Video:** [Watch on Loom](https://www.loom.com/share/fd17ea7b39bd45179cc815ddaae2900e?sid=8c578f7a-de00-40e2-86e4-2db56b12f06a)
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

---

### 🔍 Search Results

![Search Results with Posters](https://github.com/user-attachments/assets/541bcb7b-36df-41cb-88f7-5f4dbc9f5788)

---

### 🎬 Movie Details

![Movie Details](https://github.com/user-attachments/assets/2a377222-24a2-4027-8e07-f4aba043cbf5)

---

### 🤖 Movie Expert Bot Chat

![Movie-expert Bot Chat](https://github.com/user-attachments/assets/ee4aa111-5612-4110-b61e-7ada4fa6d3f3)

---

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

1. **Clone Repo**  
   ```bash
   git clone https://github.com/roshni-pahari/plotrix.git
   cd plotrix


2. **Create & Activate Virtual Env**

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. **Obtain API Keys**

   * **TMDB**: Sign up at [https://www.themoviedb.org/](https://www.themoviedb.org/) → get your API key (free tier: 1,000 requests/day)
   * **OpenAI**: Create a key at [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)

4. **Create `.env`** in project root:

   ```
   TMDB_API_KEY=your_tmdb_api_key
   MINDSDB_URL=http://127.0.0.1:47334
   MINDSDB_PROJECT=mindsdb
   OPENAI_API_KEY=your_openai_api_key
   ```

5. **Start MindsDB** (configured via `docker-compose.yml`):

   ```bash
   docker compose up -d
   # To stop: docker compose down
   ```

   * Open [http://127.0.0.1:47334/](http://127.0.0.1:47334/) and follow the MindsDB SQL setup guide:
     👉 see [`MINDSDB_SETUP.md`](./MINDSDB_SETUP.md)

6. **Run FastAPI**

   ```bash
   uvicorn app:app --reload
   ```

   The backend API will be available at `http://127.0.0.1:8000`.

### 2. Frontend Setup

1. **Navigate & Install**

   ```bash
   cd frontend
   yarn install
   ```
2. **Start Dev Server**

   ```bash
   yarn run dev
   ```

   Open `http://localhost:3000` in your browser.

---

## 📋 MindsDB Setup (Summary)

Inside MindsDB’s SQL editor, copy-paste the provided `.txt` files **in order**:

1. `database_setup.txt`
2. `kb_setup.txt`
3. `agent_setup.txt`
4. `ai_model_setup.txt`
5. *(Optional)* `evaluation_test.txt` — note: known bug with version='doc\_id'

Be sure to **replace placeholders**:

* `<your_spreadsheet_id>` → from your public Google Sheet
* `<your_openai_api_key>` → your OpenAI key

Refer to [`MINDSDB_SETUP.md`](./MINDSDB_SETUP.md) for full details.

---

## 🎯 Quest 019 Compliance

Plotrix meets **all** MindsDB Quest 019 requirements:

| Requirement                                         | Implementation                          |
| --------------------------------------------------- | --------------------------------------- |
| 🔧 CREATE KNOWLEDGE\_BASE & INSERT data             | ✅`1_sematic_search.txt`                          |
| 🔍 Semantic SELECT … WHERE content LIKE `<query>`   |✅ `/search_movies` endpoint               |
| 🗂️ metadata\_columns & SQL filters                 | ✅origin/year filters in SQL              |
| 🕒 JOB integration                                  | ✅`CREATE JOB` in `1_sematic_search.txt`          |
| 🤖 AI Tables & Agents                               | ✅`2_agent&tables.txt`
| ✍️ Demo video + README                              | ✅This README + Loom link                 |
| 🎁 **+10 pts** CREATE AGENT                         | ✅Implemented as `/movie_insights`        |
| 🎁 **+10 pts** AI Table enrichment                  | ✅Implemented as `/movie_metadata`        |
| 🎁 **+10 pts** EVALUATE KNOWLEDGE\_BASE (bug noted) | ⚠️`3_evaluate_syntax.txt` (bug documented)  |

> ⚠️ **Evaluation Bug:**
> The `EVALUATE KNOWLEDGE_BASE version='doc_id'` feature currently orders by `doc_id` instead of semantic similarity. We’ve documented this and filed a bug report with MindsDB.



---

## 🙏 Acknowledgments

* **Dataset**: [Wikipedia Movie Plots (Kaggle)](https://www.kaggle.com/datasets/jrobischon/wikipedia-movie-plots)
* **AI & Search** powered by MindsDB & OpenAI
* **Posters** courtesy of TMDB

Feel free to explore, improve, and open issues or PRs—happy movie hunting!

---