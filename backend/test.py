import csv
import time
import pandas as pd
from mindsdb_sdk import connect
import json

# Config
MINDSDB_URL = "http://127.0.0.1:47334"
PROJECT_NAME = "mindsdb"
INPUT_CSV_PATH = r"C:\Users\ACER\Downloads\test.csv"
OUTPUT_CSV_PATH = r"C:\Users\ACER\Downloads\test_results.csv"

# Connect to MindsDB
con = connect(MINDSDB_URL)
project = con.get_project(PROJECT_NAME)

# Load test prompts
test_data = pd.read_csv(INPUT_CSV_PATH)

# Collect results
results = []

for _, row in test_data.iterrows():
    prompt_id = int(row["id"])
    level = row["level"]
    query_text = row["content"].replace("'", "''")

    query = f"""
        SELECT * FROM plotrix_kb
        WHERE content = '{query_text}'
        LIMIT 10;
    """

    try:
        start = time.time()
        result = project.query(query)
        elapsed = round(time.time() - start, 4)
        df = result.fetch()

        # Extract original_doc_ids from metadata
        ids = []
        for meta_str in df["metadata"]:
            try:
                meta = json.loads(meta_str)
                ids.append(str(meta.get("original_doc_id")))
            except Exception:
                ids.append("")

        # Find match position
        match_pos = next((i for i, val in enumerate(ids) if str(prompt_id) == val), -1)

        results.append({
            "id": prompt_id,
            "level": level,
            "query": row["content"],
            "response_time_sec": elapsed,
            "found_top_1": match_pos == 0,
            "found_top_5": 0 <= match_pos < 5,
            "found_top_10": 0 <= match_pos < 10,
            "match_position": match_pos if match_pos != -1 else "Not Found"
        })

    except Exception as e:
        results.append({
            "id": prompt_id,
            "level": level,
            "query": row["content"],
            "response_time_sec": None,
            "found_top_1": False,
            "found_top_5": False,
            "found_top_10": False,
            "match_position": f"Error: {str(e)}"
        })

# Write to output CSV
with open(OUTPUT_CSV_PATH, mode="w", newline='', encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=[
        "id", "level", "query", "response_time_sec",
        "found_top_1", "found_top_5", "found_top_10", "match_position"
    ])
    writer.writeheader()
    writer.writerows(results)

print(f"\n✅ Evaluation completed. Results saved to: {OUTPUT_CSV_PATH}")
