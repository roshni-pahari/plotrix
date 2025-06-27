
# 🎥 Plotrix

<p align="center">
  <a href="https://github.com/roshni-pahari/plotrix/watchers" target="_blank">
    <img src="https://img.shields.io/github/watchers/roshni-pahari/plotrix?style=for-the-badge&logo=appveyor" alt="Watchers"/>
  </a>
  <a href="https://github.com/roshni-pahari/plotrix/fork" target="_blank">
    <img src="https://img.shields.io/github/forks/roshni-pahari/plotrix?style=for-the-badge&logo=appveyor" alt="Forks"/>
  </a>
  <a href="https://github.com/roshni-pahari/plotrix/stargazers" target="_blank">
    <img src="https://img.shields.io/github/stars/roshni-pahari/plotrix?style=for-the-badge&logo=appveyor" alt="Stars"/>
  </a>
</p>
<p align="center">
  <a href="https://github.com/roshni-pahari/plotrix/issues" target="_blank">
    <img src="https://img.shields.io/github/issues/roshni-pahari/plotrix?style=for-the-badge&logo=appveyor" alt="Issues"/>
  </a>
  <a href="https://github.com/roshni-pahari/plotrix/pulls" target="_blank">
    <img src="https://img.shields.io/github/issues-pr/roshni-pahari/plotrix?style=for-the-badge&logo=appveyor" alt="Pull Requests"/>
  </a>
</p>
<p align="center">
  <a href="https://github.com/roshni-pahari/plotrix/blob/main/LICENSE" target="_blank">
    <img src="https://img.shields.io/github/license/roshni-pahari/plotrix?style=for-the-badge&logo=appveyor" alt="License"/>
  </a>
</p>

---



## Overview

Plotrix is an AI-powered movie rediscovery platform that helps users find movies by describing vague memories—like scenes, dialogues, or plot snippets. It uses MindsDB’s semantic Knowledge Base to perform natural language search over thousands of movie plots. The app also features an interactive chatbot that answers any question regarding that movie. Additionally, AI Tables generate enriched details  like director, cast, awards and similar titles for each movie. With a sleek React frontend and FastAPI backend, Plotrix turns your fuzzy recollections into precise movie matches.

---

## Key Features

- **Semantic Plot Search**  
  Type any natural-language description (“robot left on a deserted planet,” “teen hackers in a dream world”) and get the four best matches.

- **AI-Generated Metadata**  
  Directors, cast, box-office,  similar titles—auto-enriched via MindsDB AI Tables, not present in the movie data.

- **Interactive Q&A Bot**  
  Ask follow-up questions (“Who directed it?” “Is there a twist?”) and get instant, context-aware answers.

- **Visual Discovery** 
  App also response with the amazing movie posters streamlining the discovery process.

- **Advanced Filters**  
  Filter by country (American, Bollywood, British, Japanese, South Korean), release year.

- **Dynamic Landing Experience**  
  Rotating poster carousel and live-updating example plots to showcase search flexibility.


---

## Technologies Used

- **MindsDB** (Docker Compose)  
  - Vector search Knowledge Base  
  - AI Tables & Agent for metadata and chatbot  

- **FastAPI** (Python)  
  - `/search_movies` (semantic search)  
  - `/movie_poster` (TMDB integration)  
  - `/movie_metadata` (AI Table enrichment)  
  - `/movie_insights` (Agent Q&A)  

- **React** + **Tailwind CSS**  
  - Animated poster carousel  
  - Live-updating example plots  
  - Filters and modals  

- **TMDB API** for poster images (requires API key)
- **OpenAI API** for MindsDB (requires API key)  

---

## Getting Started

### Prerequisites

- **Docker** & **Docker Compose**  
- **Python 3.8+**  
- **Node.js** & **Yarn**  

---

### Installation

#### Backend Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/roshni-pahari/plotrix.git
   cd plotrix
   ````
2. **Navigate to the backend directory**

   ```bash
   cd backend
   ```

3. **Create and activate a virtual environment**

   ```bash
   python -m venv venv
   ```

   * **Windows (PowerShell)**

     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   * **macOS/Linux**

     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

5. **Prepare environment variables**

   Create `backend/.env` with:

   ```env
  
   MY_API_KEY=your_tmdb_api_key 
   ```

   **How to get a TMDB key**:

   1. Visit [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
   2. Sign up / log in if you aren't already
   3. Create a “Developer” API key
   4. Copy it into `TMDB_API_KEY`
   5. While the app functions without the TMDB key, it is recommended as it provides movie posters.

6. **Start MindsDB & backend**

   ```bash
   docker compose up -d   
   # docker compose down # if you need to close it 
   uvicorn app:app --reload
   ```

7. Open MindsDB at [`http://localhost:47334`](http://localhost:47334)  
   - 📄 Complete setup instructions: [`mindsdb/MINDSDB_SETUP.md`](mindsdb/MINDSDB_SETUP.md)

   **General Working Overview:**
   1. MindsDB scripts are stored as `.txt` files inside the `mindsdb/` folder.
   2. Set up the data connection via Google Sheets and make the sheet public.
   3. Replace the placeholder values with your actual keys:
      - OpenAI API key  
      - Google Sheets ID/key
   4. Run the scripts inside the MindsDB SQL editor.


* ⚙️ The FastAPI backend runs at [`http://localhost:8000`](http://localhost:8000)
* 🌐 The frontend expects this URL for API requests—make sure it's running before using the app.

#### Frontend Setup

1. **Install and run**

   ```bash
   cd ../frontend
   yarn install
   yarn run dev
   ```

2. **Open in browser**

   ```
   http://localhost:5173
   ```

---


## 📺 Live Demo


🔗 [Watch Full Demo on Loom](https://www.loom.com/share/fd17ea7b39bd45179cc815ddaae2900e?autoplay=1)

---

## Screenshots

### Landing & Search

![Landing Page](https://github.com/user-attachments/assets/326cd499-c726-4d31-acdf-0089c2ba6810)
![Search Results](https://github.com/user-attachments/assets/541bcb7b-36df-41cb-88f7-5f4dbc9f5788)

### Details & Chat

![Movie Details](https://github.com/user-attachments/assets/2a377222-24a2-4027-8e07-f4aba043cbf5)
![Movie Expert Bot](https://github.com/user-attachments/assets/ee4aa111-5612-4110-b61e-7ada4fa6d3f3)

---


## 🎯 Competition Compliance (Quest 019)

Plotrix fulfills all Quest 019 requirements:

| Requirement                               | Status                               |
| ----------------------------------------- | ------------------------------------ |
| 🔧 CREATE KNOWLEDGE\_BASE & INSERT data   | ✅ in `1_semantic_search.txt`                  |
| 🔍 Semantic SELECT ... WHERE content LIKE | ✅ tested in SQL                      |
| 🗂️ metadata\_columns & SQL filters       |  ✅ origin/year filters                |
| 🕒 JOB integration                        | ✅ `CREATE JOB` in `1_semantic_search.txt`     |
| 🤖 AI Tables & Agents                     | ✅ `2_agent&tables.txt` |
| 📹 Demo video + this README               | ✅ video + instructions               |
| 🐞 EVALUATE KNOWLEDGE\_BASE (not working) | ⚠️ known bug, documented             |
| 🍒 EXTRA: CREATE AGENT (+10 pts)          | ✅ implemented                        |
| 🍒 EXTRA: AI Table enrichment (+10 pts)   | ✅ implemented                        |

> ⚠️ **Note on evaluation**: The `3_evaluate_syntax.txt` script shows that `EVALUATE KNOWLEDGE_BASE version='doc_id'` currently ranks by `doc_id` rather than semantic similarity, a completely orthogonal behaviour. A detailed bug report will be submitted to MindsDB.

---


## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "Add YourFeature"`)
4. Push (`git push origin feature/YourFeature`)
5. Open a pull request

Please follow the existing code style and include tests where applicable.

---

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## Acknowledgments

* **Dataset**: [Wikipedia Movie Plots (Kaggle)](https://www.kaggle.com/datasets/jrobischon/wikipedia-movie-plots)
* **AI & Vector Search**: [MindsDB](https://mindsdb.com)
* **LLMs**: [OpenAI](https://openai.com)
* **Poster API**: [TMDB](https://www.themoviedb.org)
* **UI Icons**: [Lucide](https://lucide.dev)

```

