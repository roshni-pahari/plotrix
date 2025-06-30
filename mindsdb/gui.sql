----THIS FILE CONTAINS ALL THE CODE TO IMPLEMENT SEMANTIC SEARCH FEATURE----
----COPY AND PASTE EACH BLOCK AND PLACE THEM IN MINDSDB SQL EDITOR----------
----TO EXECUTE, SELECT THE CODE BLOCK IN THE EDITOR AND PRESS RUN-----------
----NOTE: IT WILL ONLY RUN THE SELECTED CODE BLOCK AND IGNORE OTHERS-------- 

----------------------------------------------------------------
-- Step 1: Connect a Google Sheet as a virtual database
-- Replace `your_spreadsheet_id` and `your_sheet_name` with actual values
CREATE DATABASE movie_sheet
WITH ENGINE = "sheets",
PARAMETERS = {
  "spreadsheet_id": "<your_spreadsheet_id>",
  "sheet_name": "<your_sheet_name>"
};

------------------------------------------------------------
-- Optional: Preview the first few rows to verify the connection
SELECT * FROM movie_sheet.movie_data LIMIT 50;

------------------------------------------------------------

-- Step 2: Create a Knowledge Base for semantic search
-- Replace model provider or config based on your setup
CREATE KNOWLEDGE_BASE plotrix_kb
USING
  embedding_model = {
    "provider": "openai",
    "model_name": "text-embedding-3-large",
    "api_key": "<your_openai_api_key>"
  },
  -- Optionally, include a reranking model for improved results
  -- reranking_model = {
  --   "provider": "openai",
  --   "model_name": "gpt-4o",
  --   "api_key": "<your_openai_api_key>"
  -- },
  metadata_columns = ['origin', 'release_year', 'title', 'genre'],
  content_columns = ['plot'],
  id_column = 'unique_id';

------------------------------------------------------------

-- Optional: Delete the KB if you need to recreate it
DROP KNOWLEDGE_BASE plotrix_kb;

------------------------------------------------------------

-- Step 3: Insert data into the Knowledge Base from the sheet, this may take few minutes
INSERT INTO plotrix_kb
SELECT unique_id, origin, release_year, title, plot, genre
FROM movie_sheet.movie_data;

------------------------------------------------------------

-- Step 4: Test semantic search with optional filters
SELECT *
FROM plotrix_kb
WHERE content = 'A skilled thief who enters dreams to steal secrets but must plant an idea instead.'
  AND origin = 'American'
  AND release_year = 2010
LIMIT 5;

------------------------------------------------------------

-- Step 5: Schedule automatic syncing using a JOB
-- This will insert new rows every 1 minute (if new IDs are added)
CREATE JOB movie_schedule AS (
  INSERT INTO plotrix_kb
  SELECT unique_id, origin, release_year, title, plot, genre
  FROM movie_sheet.movie_data
  WHERE unique_id > <last_inserted_id>
)
EVERY 1 min;

-- Replace <last_inserted_id> with the latest ID currently in your KB or sheets

------------------------------------------------------------

-- Job Management Utilities

-- Drop the job if it already exists
DROP JOB IF EXISTS movie_schedule;

-- View job execution logs
SELECT * FROM log.jobs_history WHERE name = 'movie_schedule';

-- List all active jobs
SHOW JOBS;

------------------------------------------------------------

-- Miscellaneous Testing Queries


-- View latest entries in the sheet
SELECT *
FROM movie_sheet.movie_data
ORDER BY unique_id DESC
LIMIT 5;

----------------------------------------------------------------




----THIS FILE CONTAINS ALL THE CODE TO IMPLEMENT AGENTS AND AI TABLES-------
----COPY AND PASTE EACH BLOCK AND PLACE THEM IN MINDSDB SQL EDITOR----------
----TO EXECUTE, SELECT THAT CODE BLOCK IN THE EDITOR AND PRESS RUN-----------
----NOTE: IT WILL ONLY RUN THE SELECTED CODE BLOCK AND IGNORE OTHERS-------- 



------------------------------------------------------------
-- Step 6: Create an Agent Bot for movie Q&A
-- This agent responds to user questions about specific movies using a detailed prompt.
-- Replace <your_openai_api_key> with your own valid API key.

CREATE AGENT plotrix_bot
USING
  model = 'gpt-4o',
  openai_api_key = '<your_openai_api_key>',
  prompt_template = '
You are a knowledgeable film expert who understands global cinema deeply.

A user is asking about the movie titled "{{title}}" released in {{release_year}} from {{origin}}.

Movie Description:
{{plot}}

User’s Question:
"{{question}}"

Respond insightfully and specifically, referencing the plot, origin, release year, genre, and cinematic context. Avoid vague or generic replies. Keep it short.
';

------------------------------------------------------------

-- Optional: Drop the agent if you need to recreate or update it
DROP AGENT IF EXISTS plotrix_bot;

------------------------------------------------------------

-- Example: Use the Agent to answer a question about a specific movie
SELECT answer
FROM plotrix_bot
WHERE
  title = 'Inception'
  AND plot = 'A skilled thief who enters dreams to steal secrets but must plant an idea instead.'
  AND origin = 'American'
  AND release_year = 2010
  AND question = 'What is the meaning of the ending?';

------------------------------------------------------------

-- Step 7: Create an AI Table Model to enrich movie metadata
-- This model predicts detailed movie insights like director, rating, awards, etc.
-- Replace <your_openai_api_key> with your own valid API key.

CREATE MODEL movie_info
PREDICT response
INPUT title, plot, genre, origin, release_year
USING
  engine = 'openai',
  model_name = 'gpt-4o',
  openai_api_key = '<your_openai_api_key>',
  prompt_template = '
You are a cinema expert trained to infer detailed metadata from a movie’s title, genre, plot, origin, and release year.

Generate the following fields exactly, one per line:

director: Realistic director  
lead_actors: 2–3 comma-separated major actors  
box_office: Approximate global box office (e.g. "$500M worldwide")  
imdb_rating: IMDb rating out of 10    
awards: Comma-separated major awards or nominations (at most 3)  
mood_tags: Exactly 5 comma-separated tone/emotion descriptors  
similar_movies: Exactly 3 comma-separated movie titles  

Title: {{title}}  
Plot: {{plot}}  
Genre: {{genre}}  
Origin: {{origin}}  
Release Year: {{release_year}}
';

------------------------------------------------------------

-- Optional: Drop the model if needed
DROP MODEL IF EXISTS movie_info;

------------------------------------------------------------

-- Example: Query the model to generate enriched information about a movie
SELECT response
FROM movie_info
WHERE
  title = 'Inception'
  AND plot = 'A skilled thief who enters dreams to steal secrets but must plant an idea instead.'
  AND genre = 'Sci-Fi, Action'
  AND origin = 'American'
  AND release_year = 2010;




----THIS FILE CONTAINS ALL THE CODE TO IMPLEMENT EVALUATE SYNTAX------------
----COPY AND PASTE EACH BLOCK AND PLACE THEM IN MINDSDB SQL EDITOR----------
----TO EXECUTE, SELECT THAT CODE BLOCK IN THE EDITOR AND PRESS RUN----------
----NOTE: IT WILL ONLY RUN THE SELECTED CODE BLOCK AND IGNORE OTHERS-------- 
----FOR THE EVALUATION, UPLOAD THE 'eval_data.csv' IN GOOGLE SHEET----------
----NAME IT 'eval_data', MAKE IT PUBLIC AND GET SPREADSHEET ID -------------




-- MindsDB KB Evaluation Attempt (Not Working as Intended)
-- This configuration tests the `EVALUATE KNOWLEDGE_BASE` syntax on a semantic knowledge base.
-- However, the observed behavior does not match the expectations outlined in MindsDB's documentation.

-- The evaluation uses a Google Sheet as a test dataset where:
-- - `doc_id` references a target document in the knowledge base (via `unique_id`)
-- - `question` is the natural language input used to retrieve the corresponding document

-- ❗ Issue Summary:
-- Instead of performing semantic (embedding-based) search, MindsDB seems to rank results
-- purely based on the numerical order of `doc_id` (e.g., 1, 2, 3...).
-- As a result:
--   - If `doc_id` is small (typically < 100), the evaluation reports a successful hit — even when the question is gibberish or empty.
--   - If `doc_id` is large (> 100), the evaluation fails to find it — even if the question semantically matches the document perfectly.
--   - This indicates that semantic similarity is not being computed at all, and `doc_id` is incorrectly being used to influence ranking.

-- This breaks the intended purpose of the evaluation pipeline — semantic correctness.
-- The issue is not due to user schema or data error. It appears to be a flaw in MindsDB’s evaluation engine.
-- A detailed bug report has been submitted to MindsDB for further investigation.

------------------------------------------------------------
-- Step 1: Create test database from Google Sheets
-- Replace with your own spreadsheet ID and sheet name if replicating
CREATE DATABASE eval_csv_3
WITH ENGINE = "sheets",
PARAMETERS = {
  "spreadsheet_id": "<your_spreadsheet_id>", ---use the sheet id of the eval_data.csv uploaded in google sheets
  "sheet_name": "eval_data" 
};

-- Optional cleanup step if rerunning
DROP DATABASE IF EXISTS eval_csv_3;

------------------------------------------------------------
-- Step 2: Execute knowledge base evaluation
-- ✅ Expected behavior: For each question, return the top-k semantically similar documents.
-- A hit occurs if the target `doc_id` is within the top-k semantically ranked results.
-- ❌ Actual behavior: Results are returned in order of smallest `doc_id`, and semantic similarity is ignored.
-- Questions with small `doc_id` always return "found in top-k", while those with large `doc_id` never do — regardless of question content.

EVALUATE KNOWLEDGE_BASE plotrix_kb
USING
    test_table = eval_csv_3.eval_data,
    version = 'doc_id',
    evaluate = true,
    llm = {
        'provider': 'openai',
        'api_key': '<your_openai_api_key>',
        'model_name': 'gpt-4o'
    };

------------------------------------------------------------
-- Optional: Manually inspect data to validate doc_id behavior
SELECT * FROM plotrix_kb LIMIT 5;
SELECT * FROM eval_csv_3.eval_data LIMIT 5;
