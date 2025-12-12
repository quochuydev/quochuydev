-- ============================================
-- Database Index Demo Setup
-- Run this script to create 1M movie records
-- ============================================

-- Drop table if exists (for re-running)
DROP TABLE IF EXISTS movies;

-- Create the movies table
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    release_year INT NOT NULL,
    rating DECIMAL(3,2) NOT NULL,
    director VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert 1 million records (takes ~30-60 seconds)
-- Using generate_series for bulk insert
INSERT INTO movies (title, genre, release_year, rating, director)
SELECT
    'Movie_' || i,
    (ARRAY['Action', 'Drama', 'Comedy', 'Horror', 'SciFi'])[1 + floor(random() * 5)::int],
    1990 + floor(random() * 35)::int,
    round((random() * 4 + 6)::numeric, 2),
    'Director_' || (1 + floor(random() * 1000)::int)
FROM generate_series(1, 1000000) AS i;

-- Verify count
SELECT COUNT(*) as total_movies FROM movies;

-- Check data distribution
SELECT genre, COUNT(*) as count
FROM movies
GROUP BY genre
ORDER BY count DESC;

-- ============================================
-- DEMO QUERIES - Run these during presentation
-- ============================================

-- 1. Baseline: No Index Query
\echo '=== NO INDEX - Sequential Scan ==='
EXPLAIN ANALYZE
SELECT * FROM movies WHERE title = 'Movie_500000';

-- 2. Create index on title
\echo '=== Creating Index on title ==='
CREATE INDEX idx_movies_title ON movies(title);

-- 3. With Index Query
\echo '=== WITH INDEX - Index Scan ==='
EXPLAIN ANALYZE
SELECT * FROM movies WHERE title = 'Movie_500000';

-- 4. Wrong Index: Low selectivity
\echo '=== WRONG INDEX - Low Selectivity (genre) ==='
CREATE INDEX idx_movies_genre ON movies(genre);
EXPLAIN ANALYZE
SELECT * FROM movies WHERE genre = 'Action';

-- 5. Wrong Index: Function on column
\echo '=== WRONG INDEX - Function disables index ==='
EXPLAIN ANALYZE
SELECT * FROM movies WHERE UPPER(title) = 'MOVIE_500000';

-- 6. Fix: Expression index
\echo '=== FIX - Expression Index ==='
CREATE INDEX idx_movies_title_upper ON movies(UPPER(title));
EXPLAIN ANALYZE
SELECT * FROM movies WHERE UPPER(title) = 'MOVIE_500000';

-- 7. Composite index - wrong order
\echo '=== COMPOSITE INDEX - Wrong Order ==='
DROP INDEX IF EXISTS idx_movies_genre;
CREATE INDEX idx_movies_genre_title ON movies(genre, title);
EXPLAIN ANALYZE
SELECT * FROM movies WHERE genre = 'Action' AND title = 'Movie_500000';

-- 8. Composite index - correct order
\echo '=== COMPOSITE INDEX - Correct Order ==='
CREATE INDEX idx_movies_title_genre ON movies(title, genre);
EXPLAIN ANALYZE
SELECT * FROM movies WHERE genre = 'Action' AND title = 'Movie_500000';

-- ============================================
-- CLEANUP (Optional)
-- ============================================
-- DROP TABLE movies;
