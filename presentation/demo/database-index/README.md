# Database Index Demo

Demo for the Database Indexing presentation with 1 million movie records.

## Prerequisites

- PostgreSQL 12+ installed
- psql CLI available

## Quick Start

```bash
# Connect to PostgreSQL
psql -U postgres

# Create a demo database
CREATE DATABASE index_demo;
\c index_demo

# Run the setup script
\i setup.sql
```

## Demo Flow

### 1. No Index (Slow)
```sql
EXPLAIN ANALYZE SELECT * FROM movies WHERE title = 'Movie_500000';
-- Result: Seq Scan, ~450ms
```

### 2. With Index (Fast)
```sql
CREATE INDEX idx_movies_title ON movies(title);
EXPLAIN ANALYZE SELECT * FROM movies WHERE title = 'Movie_500000';
-- Result: Index Scan, ~0.05ms (9000x faster!)
```

### 3. Wrong Index - Low Selectivity
```sql
CREATE INDEX idx_movies_genre ON movies(genre);
EXPLAIN ANALYZE SELECT * FROM movies WHERE genre = 'Action';
-- Result: Seq Scan (index ignored because 20% of rows match)
```

### 4. Wrong Index - Function on Column
```sql
EXPLAIN ANALYZE SELECT * FROM movies WHERE UPPER(title) = 'MOVIE_500000';
-- Result: Seq Scan (function disables index)

-- Fix with expression index:
CREATE INDEX idx_movies_title_upper ON movies(UPPER(title));
```

### 5. Composite Index - Order Matters
```sql
-- Bad: Low selectivity first
CREATE INDEX idx_bad ON movies(genre, title);

-- Good: High selectivity first
CREATE INDEX idx_good ON movies(title, genre);
```

## Key Metrics to Show

| Scenario | Execution Time |
|----------|----------------|
| No Index | ~450 ms |
| With Index | ~0.05 ms |
| Wrong Index (low selectivity) | ~380 ms |
| Wrong Index (function) | ~520 ms |
| Composite (wrong order) | ~12 ms |
| Composite (correct order) | ~0.08 ms |

## Cleanup

```sql
DROP TABLE movies;
-- or
DROP DATABASE index_demo;
```
