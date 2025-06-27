
# 🧠 MindsDB Setup Instructions (for Plotrix)

This guide explains how to configure MindsDB to power Plotrix's semantic search, AI metadata generation, and conversational movie Q&A features.

---

## ⚙️ Step 1: Start MindsDB via Docker

Assuming your backend is already set up and Docker is installed:

```bash
docker compose up -d
````

This will start MindsDB at:

```
http://127.0.0.1:47334/
```

Open that URL in your browser — you should see something like this:

![Image](https://github.com/user-attachments/assets/833610ba-c8f7-4172-a910-64e28b5ff5d7)

---

## 🧾 Step 2: Prepare the Dataset

This project uses a curated version of the [Wikipedia Movie Plots](https://www.kaggle.com/datasets/jrobischon/wikipedia-movie-plots) dataset.

The cleaned version (`movie_data.csv`) is included in this repo.

### ✅ What’s been cleaned:

* Only movies released between **2000 and 2017**
* Only origins: `American`, `Bollywood`, `British`, `Japanese`, `South Korean`
* Columns used:
  `unique_id`, `release_year`, `title`, `origin`, `genre`, `plot`

---

## 🧤 Step 3: Upload to Google Sheets

1. Visit [Google Sheets](https://sheets.new)
2. Upload `movie_data.csv`
3. Rename the sheet tab to: `movie_data`
4. Click **Share** → change access to **"Anyone with the link"** (Viewer)
5. Copy the **Spreadsheet ID** from the URL:

   ```
   https://docs.google.com/spreadsheets/d/<your_spreadsheet_id>/edit
   ```

---

## 🧠 Step 4: Configure MindsDB

Once MindsDB is open in your browser (via the SQL Editor):

### A. Use the Provided `.txt` Files

From the `mindsdb_setup/` folder (or wherever you've placed them):

1. Open each `.txt` file one at a time
2. Copy-paste the SQL code into the MindsDB editor
3. Execute them **step-by-step**
4. Replace all placeholder values as needed:

| Placeholder             | Replace With                                                        |
| ----------------------- | ------------------------------------------------------------------- |
| `<your_spreadsheet_id>` | The Google Sheet ID you copied earlier                              |
| `<your_sheet_name>`     | Should be `movie_data` unless changed (or eval_data for the evaluation code)                              |
| `<your_openai_api_key>` | Your [OpenAI API key](https://platform.openai.com/account/api-keys) |

### 📌 Suggested Order:

Start with:

* `1_semantic_search.txt`

Then continue with:

* `2_agent&tables.txt`

And finally (optional):

* `3_evaluate_syntax.txt`

---

## 🧪 Step 5: Test the Setup

Example semantic query:

```sql
SELECT *
FROM plotrix_kb
WHERE content = 'A man enters dreams to plant an idea in someone’s mind'
AND origin = 'American'
AND release_year = 2010
LIMIT 5;
```

You can also test the Agent and AI Table model using examples in the respective `.txt` files.

---

## 📝 Notes

* All SQL logic lives in clean, ready-to-paste `.txt` files.
* This README is **only for MindsDB setup** — refer to the project root `README.md` for backend/frontend setup.
* MindsDB must remain running in the background while using Plotrix.

---
