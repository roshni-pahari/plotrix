
# 🎥 Plotrix

A **semantic movie search** and **AI-powered exploration** app built with MindsDB, FastAPI, and React. Enter a plot description (optionally filter by origin or release year), and get back the top 4 movie recommendations ranked by semantic relevance—complete with plot snippets, poster images, AI-generated metadata, and a conversational movie-expert bot.

🔗 **Repo:** https://github.com/roshni-pahari/plotrix.git  
📺 **Demo Video:** https://www.loom.com/share/fd17ea7b39bd45179cc815ddaae2900e?sid=8c578f7a-de00-40e2-86e4-2db56b12f06a  

---

## 🚀 Quick Start

1. **Clone & enter**  
   ```bash
   git clone https://github.com/roshni-pahari/plotrix.git
   cd plotrix


2. **Watch the demo**
   Click the link above or embed in your README:

   
   [![Plotrix Demo](https://cdn.loom.com/sessions/thumbnails/fd17ea7b39bd45179cc815ddaae2900e-00001.png)](https://www.loom.com/share/fd17ea7b39bd45179cc815ddaae2900e)
   

   ![Screenshot 1]()
   ![Screenshot 2]()

3. **Install & run backend**

   * Install Docker Desktop
   * Create a Python venv, then:

     ```bash
     python3 -m venv venv
     source venv/bin/activate
     pip install -r requirements.txt
     ```
   * In the project root, start MindsDB + dependencies:

     ```bash
     docker compose up -d
     # when done, docker compose down
     ```
   * **Configure TMDB**:

     1. Sign up at [https://www.themoviedb.org/](https://www.themoviedb.org/) → get API key (1000 requests/day free)
     2. Create `.env` with:

        ```
        TMDB_API_KEY=your_tmdb_key_here
        MINDSDB_URL=http://127.0.0.1:47334
        MINDSDB_PROJECT=mindsdb
        ```
   * **Run FastAPI**:

     ```bash
     uvicorn app:app --reload
     ```

     (Without TMDB key, app still works but posters won’t load.)

4. **Install & run frontend**

   ```bash
   cd frontend
   yarn install
   yarn run dev
   ```

   Open `http://localhost:3000`.

5. **Configure MindsDB**
   Follow the dedicated MindsDB setup guide → [`MINDSDB_SETUP.md`](./MINDSDB_SETUP.md).

   * Copy-paste the `.txt` SQL files in order, replacing `<your_spreadsheet_id>`, `<your_openai_api_key>`, etc.
   * Create your Google Sheet from `movie_data.csv`, make it public, and plug in its sheet ID.

---

## 🎯 Competition Compliance (Quest 019)

Plotrix fulfills all Quest 019 requirements:

| Requirement                               | Status                               |
| ----------------------------------------- | ------------------------------------ |
| 🔧 CREATE KNOWLEDGE\_BASE & INSERT data   | ✅ in `kb_setup.txt`                  |
| 🔍 Semantic SELECT ... WHERE content LIKE | ✅ tested in SQL                      |
| 🗂️ metadata\_columns & SQL filters       | ✅ origin/year filters                |
| 🕒 JOB integration                        | ✅ `CREATE JOB` in `kb_setup.txt`     |
| 🤖 AI Tables & Agents                     | ✅ `ai_model.txt` & `agent_setup.txt` |
| 📹 Demo video + this README               | ✅ video + instructions               |
| 🐞 EVALUATE KNOWLEDGE\_BASE (not working) | ⚠️ known bug; documented             |
| 🍒 EXTRA: CREATE AGENT (+10 pts)          | ✅ implemented                        |
| 🍒 EXTRA: AI Table enrichment (+10 pts)   | ✅ implemented                        |

> ⚠️ **Note on evaluation**: The `evaluation_test.txt` script shows that `EVALUATE KNOWLEDGE_BASE version='doc_id'` currently ranks by `doc_id` rather than semantic similarity. A detailed bug report has been submitted to MindsDB.

---

