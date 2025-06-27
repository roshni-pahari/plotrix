
# 🎥 Plotrix

![Watchers](https://img.shields.io/github/watchers/roshni-pahari/plotrix?style=social)  
![Stars](https://img.shields.io/github/stars/roshni-pahari/plotrix?style=social)  
![Forks](https://img.shields.io/github/forks/roshni-pahari/plotrix?style=social)  
![Issues](https://img.shields.io/github/issues/roshni-pahari/plotrix)  
![Pull Requests](https://img.shields.io/github/issues-pr/roshni-pahari/plotrix)  
![License](https://img.shields.io/github/license/roshni-pahari/plotrix)

---

## Table of Contents

- [Overview](#overview)  
- [Key Features](#key-features)  
- [Technologies Used](#technologies-used)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
    - [Backend Setup](#backend-setup)  
    - [Frontend Setup](#frontend-setup)  
    - [Additional Guidance](#additional-guidance)  
- [Demo](#demo)  
- [Screenshots](#screenshots)  
- [Contributing](#contributing)  
- [License](#license)  
- [Acknowledgments](#acknowledgments)  

---

## Overview

Plotrix is an AI-powered web application that helps you rediscover movies based on any detail you remember—dialogue snippets, visual motifs, or even moods. It combines semantic vector search over a 7,000+ movie-plot dataset with AI-generated metadata and an interactive chatbot, all wrapped in a sleek React/Tailwind UI and powered by FastAPI and MindsDB.

---

## Key Features

- **Semantic Plot Search**  
  Type any natural-language description (“robot left on a deserted planet,” “teen hackers in a dream world”) and get the four best matches.

- **AI-Generated Metadata**  
  Directors, cast, box-office, mood tags, similar titles—auto-enriched via MindsDB AI Tables.

- **Interactive Q&A Bot**  
  Ask follow-up questions (“Who directed it?” “Is there a twist?”) and get instant, context-aware answers.

- **Visual Discovery** (Optional)  
  Official posters from TMDB (free for up to 1,000 requests/day) accompany each result.

- **Advanced Filters**  
  Filter by country (American, Bollywood, British, Japanese, South Korean), year range, genre, or rating.

- **Dynamic Landing Experience**  
  Rotating poster carousel and live-updating example plots to showcase search flexibility.

- **Blazing Fast Performance**  
  Sub-100 ms response times on a local dev setup using FastAPI and MindsDB in Docker.

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

- **TMDB API** (optional) for poster images  
- **OpenAI API** for MindsDB Agent (requires API key)  

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

2. **Create and activate a virtual environment**

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

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Prepare environment variables**

   ```bash
   cd backend
   ```

   Create `backend/.env` with:

   ```env
  
   TMDB_API_KEY=your_tmdb_api_key   # optional; free up to 1,000 requests/day
   ```

   **How to get a TMDB key**:

   1. Visit [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
   2. Sign up / log in
   3. Create a “Developer” API key
   4. Copy it into `TMDB_API_KEY`

5. **Start MindsDB & backend**

   ```bash
   docker compose up -d   # ← includes ‘docker compose down’ as comment
   # docker compose down
   uvicorn app:app --reload
   ```

#### Frontend Setup

1. **Install and run**

   ```bash
   cd ../frontend
   yarn install
   yarn run dev
   ```

2. **Open in browser**

   ```
   http://localhost:3000
   ```

---

### Additional Guidance

* After `docker compose up`, open MindsDB at `http://localhost:47334`

* In the MindsDB SQL editor, paste in order:

  1. `mindsdb/database_setup.txt`
  2. `mindsdb/kb_setup.txt`
  3. `mindsdb/agent_setup.txt`
  4. `mindsdb/ai_model_setup.txt`
  5. *(Optional)* `mindsdb/evaluation_test.txt`

* Full MindsDB instructions: [`mindsdb/MINDSDB_SETUP.md`](mindsdb/MINDSDB_SETUP.md)

---

## Demo

[![Plotrix Demo](https://cdn.loom.com/sessions/thumbnails/fd17ea7b39bd45179cc815ddaae2900e-with-play.gif)](https://www.loom.com/share/fd17ea7b39bd45179cc815ddaae2900e?autoplay=1)

---

## Screenshots

### Landing & Search

![Landing Page](https://github.com/user-attachments/assets/326cd499-c726-4d31-acdf-0089c2ba6810)
![Search Results](https://github.com/user-attachments/assets/541bcb7b-36df-41cb-88f7-5f4dbc9f5788)

### Details & Chat

![Movie Details](https://github.com/user-attachments/assets/2a377222-24a2-4027-8e07-f4aba043cbf5)
![Movie Expert Bot](https://github.com/user-attachments/assets/ee4aa111-5612-4110-b61e-7ada4fa6d3f3)

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

