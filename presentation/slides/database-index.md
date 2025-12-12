---
theme: seriph
background: https://cover.sli.dev
title: Database Indexing - A Practical Developer Guide
info: |
  A practical guide to database indexing for developers.
  Learn when, why, and how to use indexes effectively.
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
---

# Database Indexing

A Practical Developer Guide

<div class="pt-12">
  <span class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space to navigate
  </span>
</div>

---

# The Problem: Why Are Queries Slow?

Without an index, the database performs a **full table scan**

```sql
SELECT * FROM users WHERE email = 'john@example.com';
```

<v-click>

```
+----+------------------+--------+
| id | email            | name   |
+----+------------------+--------+
|  1 | alice@test.com   | Alice  |  <-- Check row 1
|  2 | bob@test.com     | Bob    |  <-- Check row 2
|  3 | carol@test.com   | Carol  |  <-- Check row 3
| .. | ...              | ...    |  <-- Check ALL rows
| 1M | john@example.com | John   |  <-- Finally found!
+----+------------------+--------+
```

</v-click>

<v-click>

**Result:** Must scan 1 million rows to find 1 record

</v-click>

---

# What is an Index?

Think of it like a **book index** - a sorted lookup structure

<div class="grid grid-cols-2 gap-4">
<div>

**Without Index (Full Scan)**
```
Read every page to find "B-Tree"
Page 1... Page 2... Page 3...
...Page 847 - Found it!
```

</div>
<div>

**With Index (Direct Lookup)**
```
Index:
  B-Tree .......... 847
  Hash ............ 234
  Query ........... 156

Jump directly to page 847!
```

</div>
</div>

<v-click>

### Database Index = Separate Data Structure

- Maintains sorted pointers to actual rows
- Enables **O(log n)** lookups instead of **O(n)**
- Trade-off: Uses extra storage, slows writes

</v-click>

---

# How B-Tree Indexes Work

Most common index type (default in MySQL, PostgreSQL, SQLite)

```
                        [50]                      <- Root (Level 0)
                       /    \
                [25]          [75]                <- Level 1
               /    \        /    \
          [10,20] [30,40] [60,70] [80,90]         <- Leaf nodes (data pointers)
```

<v-click>

### Finding value 70:

```
Step 1: Root [50]     -> 70 > 50  -> Go right
Step 2: Node [75]     -> 70 < 75  -> Go left
Step 3: Leaf [60,70]  -> Found 70! -> Return row pointer
```

**Only 3 comparisons** to search millions of rows!

</v-click>

---

# Why B-Tree is Powerful

B-Tree indexes support multiple query patterns:

<v-click>

### Equality Queries
```sql
WHERE id = 70
WHERE email = 'john@example.com'
```

</v-click>

<v-click>

### Range Queries
```sql
WHERE id > 50 AND id < 80
WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31'
```

</v-click>

<v-click>

### Sorting & Prefix
```sql
ORDER BY id          -- Uses index order
WHERE name LIKE 'John%'  -- Prefix search
```

</v-click>

---

# Index Types at a Glance

| Type | Best For | Limitations |
|------|----------|-------------|
| **B-Tree** | Range queries, sorting, prefix search | Slower for exact-match only workloads |
| **Hash** | Exact equality (`=`) only | No range, no sorting, no prefix |
| **GIN** | Full-text search, arrays, JSON | Write-heavy overhead |
| **BRIN** | Time-series, sequential data | Requires physical ordering |

<v-click>

### Quick Decision Guide

```
Need range queries (>, <, BETWEEN)?     -> B-Tree
Need ORDER BY optimization?             -> B-Tree
Only exact match (= or IN)?             -> Hash (or B-Tree)
Searching inside arrays/JSON?           -> GIN
Time-series with ordered inserts?       -> BRIN
```

</v-click>

<v-click>

**Rule of thumb:** When in doubt, use B-Tree (the default)

</v-click>

---

# When to Create Indexes

Index columns that appear in:

<div class="grid grid-cols-2 gap-8">
<div>

### DO Index

```sql
-- WHERE clauses
WHERE status = 'active'

-- JOIN conditions
JOIN orders ON users.id = orders.user_id

-- ORDER BY / GROUP BY
ORDER BY created_at DESC

-- Foreign keys
FOREIGN KEY (user_id) REFERENCES users(id)
```

</div>
<div>

### DON'T Index

```sql
-- Low cardinality columns
WHERE gender = 'M'  -- Only 2-3 values

-- Rarely queried columns
-- (Index overhead not worth it)

-- Small tables
-- (Full scan is fast enough)

-- Write-heavy tables
-- (Each INSERT updates indexes)
```

</div>
</div>

<v-click>

### Golden Rule: **High selectivity + Frequent queries = Good index candidate**

</v-click>

---

# Reading EXPLAIN Plans

Always verify your indexes are being used!

```sql
EXPLAIN SELECT * FROM users WHERE email = 'john@example.com';
```

<v-click>

### MySQL Output
```
+----+-------------+-------+------+---------------+------------+---------+-------+------+-------+
| id | select_type | table | type | possible_keys | key        | key_len | ref   | rows | Extra |
+----+-------------+-------+------+---------------+------------+---------+-------+------+-------+
|  1 | SIMPLE      | users | ref  | idx_email     | idx_email  | 767     | const |    1 |       |
+----+-------------+-------+------+---------------+------------+---------+-------+------+-------+
```

</v-click>

<v-click>

### What to look for:

| Column | Good Sign | Bad Sign |
|--------|-----------|----------|
| `type` | `ref`, `range`, `const` | `ALL` (full table scan) |
| `key` | Your index name | `NULL` |
| `rows` | Small number | Large number |
| `Extra` | `Using index` | `Using filesort` |

</v-click>

---

# Common Mistakes

<div class="grid grid-cols-2 gap-4">
<div>

### 1. Functions Break Indexes

```sql
-- Index on 'created_at' NOT used
WHERE YEAR(created_at) = 2024

-- Fix: Use range instead
WHERE created_at >= '2024-01-01'
  AND created_at < '2025-01-01'
```

</div>
<div>

### 2. Over-Indexing

```sql
-- DON'T: Index every column
CREATE INDEX idx_1 ON users(name);
CREATE INDEX idx_2 ON users(email);
CREATE INDEX idx_3 ON users(city);
CREATE INDEX idx_4 ON users(age);
-- 20 more indexes...

-- Each INSERT now updates 24 indexes!
```

</div>
</div>

<v-click>

### 3. Wrong Column Order in Composite Index

```sql
CREATE INDEX idx_status_date ON orders(status, created_at);

-- Uses index (leftmost prefix)
WHERE status = 'pending'

-- Uses index
WHERE status = 'pending' AND created_at > '2024-01-01'

-- CANNOT use index (skipped 'status')
WHERE created_at > '2024-01-01'
```

</v-click>

---

# Best Practices

<div class="grid grid-cols-2 gap-4">
<div>

### Composite Indexes

Order columns by:
1. Equality conditions first
2. Range conditions last

```sql
-- Query pattern
WHERE user_id = ?
  AND status = ?
  AND created_at > ?

-- Optimal index
CREATE INDEX idx_user_status_date
  ON orders(user_id, status, created_at);
```

</div>
<div>

### Covering Indexes

Include all queried columns to avoid table lookup:

```sql
-- Query
SELECT name, email FROM users
WHERE status = 'active';

-- Covering index
CREATE INDEX idx_status_covering
  ON users(status, name, email);

-- EXPLAIN shows "Using index"
-- No table access needed!
```

</div>
</div>

<v-click>

### Monitor & Maintain

```sql
-- Find unused indexes (PostgreSQL)
SELECT * FROM pg_stat_user_indexes WHERE idx_scan = 0;

-- Rebuild fragmented indexes periodically
REINDEX TABLE users;
```

</v-click>

---

# Real-World Impact

### Case Study: IBM FileNet P8

| Metric | Before Index | After Index |
|--------|-------------|-------------|
| Response Time | 7,000 ms | 200 ms |
| CPU Usage | 50-60% | 10-20% |
| Improvement | - | **35x faster** |

<v-click>

### Key Takeaways

- A single well-placed index can transform query performance
- Monitor slow queries and check EXPLAIN plans
- Balance read performance vs write overhead
- Start with few indexes, add based on actual query patterns

</v-click>

<v-click>

### Remember

> "The right index can turn a 10-second query into a 10-millisecond query"

</v-click>

---
layout: two-cols
---

# Quick Reference

### Do's

- Index WHERE, JOIN, ORDER BY columns
- Use composite indexes for multi-column queries
- Check EXPLAIN plans regularly
- Consider covering indexes for hot queries
- Monitor index usage statistics

::right::

<div class="pl-4">

### Don'ts

- Don't index low-cardinality columns
- Don't over-index (hurts writes)
- Don't use functions on indexed columns
- Don't ignore composite index column order
- Don't create indexes blindly from optimizer hints

</div>

<v-click>

### Index Creation Syntax

```sql
-- Single column
CREATE INDEX idx_email ON users(email);

-- Composite
CREATE INDEX idx_user_status
  ON orders(user_id, status);

-- Unique
CREATE UNIQUE INDEX idx_email_unique
  ON users(email);
```

</v-click>

---
layout: center
class: text-center
---

# Q&A

Questions about database indexing?

<div class="pt-12">

### Resources

- [PostgreSQL Index Documentation](https://www.postgresql.org/docs/current/indexes.html)
- [MySQL Index Types](https://dev.mysql.com/doc/refman/8.0/en/index-btree-hash.html)
- [Use The Index, Luke](https://use-the-index-luke.com/)

</div>
