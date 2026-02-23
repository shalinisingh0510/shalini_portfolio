-- Seed blog data: categories + 12 technical blog posts
-- Run AFTER schema.sql and blog-extend.sql in Supabase SQL Editor

-- Categories
INSERT INTO public.blog_categories (slug, name, description) VALUES
  ('dsa', 'DSA', 'Data Structures & Algorithms'),
  ('system-design', 'System Design', 'Architecture, scalability, and design patterns'),
  ('mern-stack', 'MERN Stack', 'MongoDB, Express, React, Node.js development'),
  ('cloud', 'Cloud & DevOps', 'AWS, Docker, CI/CD and cloud infrastructure'),
  ('web-dev', 'Web Development', 'Frontend, backend, and full-stack web technologies')
ON CONFLICT (slug) DO NOTHING;

-- Blog Posts
INSERT INTO public.blog_posts (slug, title, excerpt, content, author_name, college_name, category_id, is_published, published_at, seo_title, seo_description)
VALUES

-- 1. Binary Search
('mastering-binary-search',
 'Mastering Binary Search: The Foundation of Efficient Algorithms',
 'A deep dive into binary search — from basic implementation to advanced variations like lower bound, upper bound, and search in rotated arrays.',
 '# Mastering Binary Search

Binary Search is one of the most fundamental algorithms in computer science. It reduces the search space by half in every step, achieving **O(log n)** time complexity.

## Why Binary Search Matters

In interviews and competitive programming, Binary Search is everywhere — from finding elements in sorted arrays to solving optimization problems using "Binary Search on Answer."

## Basic Implementation

```cpp
int binarySearch(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}
```

## Variations

### Lower Bound
Find the first position where `arr[mid] >= target`.

### Upper Bound
Find the first position where `arr[mid] > target`.

### Search in Rotated Sorted Array
Identify which half is sorted, then decide which half to search.

## Key Takeaways

- Always use `lo + (hi - lo) / 2` to avoid overflow
- Think about the **search space** — what are you searching for?
- Binary Search on Answer is a powerful technique for optimization problems

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'dsa'),
 true, now() - interval '12 days',
 'Mastering Binary Search | Shalini Kumari',
 'Deep dive into binary search with variations like lower bound, upper bound, and rotated array search.'),

-- 2. Graph Traversal
('graph-traversal-bfs-dfs',
 'Graph Traversal: BFS vs DFS Explained with Real Examples',
 'Understanding BFS and DFS graph traversal algorithms with practical examples, time complexity, and when to use which.',
 '# Graph Traversal: BFS vs DFS

Graphs are everywhere — social networks, maps, dependency resolution. Mastering BFS and DFS is essential for any developer.

## BFS (Breadth-First Search)

BFS explores **level by level**. It uses a **queue** and is ideal for:
- Shortest path in unweighted graphs
- Level-order traversal
- Finding connected components

```cpp
void bfs(int start, vector<vector<int>>& adj) {
    queue<int> q;
    vector<bool> visited(adj.size(), false);
    q.push(start);
    visited[start] = true;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}
```

## DFS (Depth-First Search)

DFS explores **as deep as possible** before backtracking. It uses a **stack** (or recursion).

Best for:
- Cycle detection
- Topological sort
- Path finding in mazes

## When to Use Which?

| Use Case | BFS | DFS |
|----------|-----|-----|
| Shortest path (unweighted) | ✅ | ❌ |
| Cycle detection | ✅ | ✅ |
| Topological sort | ❌ | ✅ |
| Connected components | ✅ | ✅ |

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'dsa'),
 true, now() - interval '11 days',
 'BFS vs DFS Graph Traversal | Shalini Kumari',
 'BFS and DFS graph traversal explained with code, examples, and comparison table.'),

-- 3. Dynamic Programming
('dynamic-programming-beginners',
 'Dynamic Programming for Beginners: Think in Subproblems',
 'A beginner-friendly guide to dynamic programming with step-by-step breakdown of classic problems.',
 '# Dynamic Programming for Beginners

Dynamic Programming (DP) is about breaking a problem into **overlapping subproblems** and storing their results.

## The Two Properties

1. **Optimal Substructure** — The optimal solution can be built from optimal solutions of subproblems.
2. **Overlapping Subproblems** — The same subproblems are solved multiple times.

## Fibonacci — The Classic Example

```javascript
// Memoized approach
function fib(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}
```

## Classic DP Problems

- **0/1 Knapsack** — Maximize value within weight capacity
- **Longest Common Subsequence** — Find longest matching subsequence
- **Coin Change** — Minimum coins to make a target sum
- **Climbing Stairs** — Count ways to reach the top

## My Approach to DP

1. Define the **state** clearly
2. Write the **recurrence relation**
3. Identify the **base case**
4. Choose **top-down** (memoization) or **bottom-up** (tabulation)

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'dsa'),
 true, now() - interval '10 days',
 'Dynamic Programming for Beginners | Shalini Kumari',
 'Beginner-friendly guide to DP with Fibonacci, Knapsack, and Coin Change problems.'),

-- 4. System Design Basics
('system-design-fundamentals',
 'System Design Fundamentals: Building Scalable Systems',
 'An introduction to system design concepts — load balancers, caching, databases, and designing for scale.',
 '# System Design Fundamentals

System design is about building software that scales. Here are the key building blocks.

## Load Balancing

Distributes incoming traffic across multiple servers. Common algorithms:
- **Round Robin** — Requests go to each server in order
- **Least Connections** — Route to the server with fewest active connections
- **IP Hash** — Route based on client IP

## Caching

Store frequently accessed data in memory for fast retrieval.

- **Client-side cache** — Browser cache, service workers
- **CDN** — Cache static assets near users
- **Application cache** — Redis, Memcached
- **Database cache** — Query result caching

## Database Design

### SQL vs NoSQL

| Feature | SQL | NoSQL |
|---------|-----|-------|
| Schema | Fixed | Flexible |
| Scaling | Vertical | Horizontal |
| ACID | Full | Eventual consistency |
| Use Case | Transactions | Big data, real-time |

## Key Concepts

- **CAP Theorem** — Consistency, Availability, Partition Tolerance (pick 2)
- **Horizontal vs Vertical Scaling**
- **Microservices vs Monolith**
- **Message Queues** — Kafka, RabbitMQ for async processing

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'system-design'),
 true, now() - interval '9 days',
 'System Design Fundamentals | Shalini Kumari',
 'Introduction to system design covering load balancers, caching, databases, and scalability.'),

-- 5. Designing a URL Shortener
('designing-url-shortener',
 'System Design: Designing a URL Shortener Like Bit.ly',
 'Step-by-step system design of a URL shortener service covering hashing, database schema, and scaling strategies.',
 '# Designing a URL Shortener

Let''s design a URL shortener like Bit.ly — a classic system design interview question.

## Requirements

### Functional
- Shorten a long URL → short URL
- Redirect short URL → original URL
- Analytics (click count, location)

### Non-Functional
- Low latency redirects
- High availability
- Handle 100M URLs

## High-Level Design

```
Client → API Gateway → App Server → Database
                                   → Cache (Redis)
```

## URL Encoding

Use **Base62 encoding** (a-z, A-Z, 0-9) for 6-character short codes:
- 62^6 = ~56 billion unique URLs

## Database Schema

```sql
CREATE TABLE urls (
    id BIGINT PRIMARY KEY,
    short_code VARCHAR(10) UNIQUE,
    original_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    click_count INT DEFAULT 0
);
```

## Scaling Strategies

1. **Cache hot URLs** in Redis
2. **Database sharding** by short_code
3. **CDN** for static redirect pages
4. **Rate limiting** to prevent abuse

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'system-design'),
 true, now() - interval '8 days',
 'Designing URL Shortener | Shalini Kumari',
 'System design of a URL shortener with hashing, database schema, and scaling strategies.'),

-- 6. React Hooks Deep Dive
('react-hooks-deep-dive',
 'React Hooks Deep Dive: useState, useEffect, and Custom Hooks',
 'A comprehensive guide to React hooks with practical examples and patterns for building modern React apps.',
 '# React Hooks Deep Dive

Hooks revolutionized React by letting you use state and lifecycle features in function components.

## useState — Managing State

```jsx
const [count, setCount] = useState(0);

// Updater function form (recommended)
setCount(prev => prev + 1);
```

## useEffect — Side Effects

```jsx
useEffect(() => {
    const controller = new AbortController();
    fetch("/api/data", { signal: controller.signal })
        .then(res => res.json())
        .then(setData);
    return () => controller.abort(); // Cleanup
}, [dependency]);
```

## useMemo & useCallback

- `useMemo` — Memoize expensive calculations
- `useCallback` — Memoize functions to prevent re-renders

## Custom Hooks

Build reusable logic:

```jsx
function useWindowSize() {
    const [size, setSize] = useState({ width: 0, height: 0 });
    useEffect(() => {
        const handler = () => setSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
        handler();
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);
    return size;
}
```

## Rules of Hooks

1. Only call hooks at the **top level**
2. Only call hooks from **React functions**
3. Custom hooks must start with **use**

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'mern-stack'),
 true, now() - interval '7 days',
 'React Hooks Deep Dive | Shalini Kumari',
 'Complete guide to React hooks: useState, useEffect, useMemo, useCallback, and custom hooks.'),

-- 7. Node.js REST API
('building-rest-api-nodejs',
 'Building a RESTful API with Node.js and Express',
 'Step-by-step guide to building production-ready REST APIs with Express.js, middleware, and error handling.',
 '# Building a REST API with Node.js and Express

Express.js makes it simple to build robust APIs. Let''s build one from scratch.

## Project Setup

```bash
npm init -y
npm install express cors dotenv
npm install -D nodemon
```

## Basic Server

```javascript
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date() });
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

## CRUD Routes

```javascript
// GET all items
app.get("/api/items", async (req, res) => { /* ... */ });

// GET single item
app.get("/api/items/:id", async (req, res) => { /* ... */ });

// POST create item
app.post("/api/items", async (req, res) => { /* ... */ });

// PUT update item
app.put("/api/items/:id", async (req, res) => { /* ... */ });

// DELETE item
app.delete("/api/items/:id", async (req, res) => { /* ... */ });
```

## Middleware Pattern

```javascript
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    // verify token...
    next();
};

app.use("/api/protected", authenticate);
```

## Error Handling

Always use a global error handler:

```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});
```

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'mern-stack'),
 true, now() - interval '6 days',
 'Building REST API with Node.js | Shalini Kumari',
 'Step-by-step guide to building REST APIs with Express.js, middleware, and error handling.'),

-- 8. MongoDB Aggregation
('mongodb-aggregation-pipeline',
 'MongoDB Aggregation Pipeline: From Basics to Advanced Queries',
 'Learn MongoDB aggregation framework with $match, $group, $lookup, and real-world pipeline examples.',
 '# MongoDB Aggregation Pipeline

The aggregation pipeline is MongoDB''s most powerful feature for data analysis and transformation.

## Pipeline Stages

Each stage transforms the data and passes it to the next:

```javascript
db.orders.aggregate([
    { $match: { status: "completed" } },
    { $group: { _id: "$customerId", total: { $sum: "$amount" } } },
    { $sort: { total: -1 } },
    { $limit: 10 }
]);
```

## Key Stages

### $match — Filter documents
```javascript
{ $match: { age: { $gte: 18 }, city: "Mumbai" } }
```

### $group — Aggregate values
```javascript
{ $group: {
    _id: "$department",
    avgSalary: { $avg: "$salary" },
    count: { $sum: 1 }
}}
```

### $lookup — Join collections
```javascript
{ $lookup: {
    from: "users",
    localField: "userId",
    foreignField: "_id",
    as: "userInfo"
}}
```

### $project — Shape output
```javascript
{ $project: {
    name: 1,
    fullName: { $concat: ["$firstName", " ", "$lastName"] },
    _id: 0
}}
```

## Performance Tips

1. Place `$match` early to reduce documents
2. Use indexes for `$match` and `$sort`
3. Use `$project` to limit fields
4. Consider `allowDiskUse` for large datasets

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'mern-stack'),
 true, now() - interval '5 days',
 'MongoDB Aggregation Pipeline | Shalini Kumari',
 'MongoDB aggregation with $match, $group, $lookup, and performance tips.'),

-- 9. AWS EC2 & S3
('aws-ec2-s3-getting-started',
 'Getting Started with AWS: EC2 and S3 for Developers',
 'A practical guide to launching EC2 instances and using S3 for storage — essential AWS services every developer should know.',
 '# Getting Started with AWS: EC2 and S3

Amazon Web Services powers the majority of the internet. Let''s explore two core services.

## EC2 — Elastic Compute Cloud

EC2 provides virtual servers (instances) in the cloud.

### Launching an Instance

1. Choose an **AMI** (Amazon Machine Image) — e.g., Ubuntu 22.04
2. Select **instance type** — t2.micro (free tier)
3. Configure **security group** — Allow SSH (22), HTTP (80), HTTPS (443)
4. Create a **key pair** for SSH access
5. Launch!

### Connecting via SSH

```bash
ssh -i my-key.pem ec2-user@<public-ip>
```

## S3 — Simple Storage Service

S3 is object storage for files, images, backups, and static websites.

### Key Concepts

- **Bucket** — Container for objects
- **Object** — File + metadata
- **Key** — Unique identifier (file path)

### Using AWS SDK

```javascript
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const client = new S3Client({ region: "ap-south-1" });

async function uploadFile(buffer, key) {
    await client.send(new PutObjectCommand({
        Bucket: "my-app-bucket",
        Key: key,
        Body: buffer,
        ContentType: "image/jpeg"
    }));
}
```

## Cost Optimization

- Use **free tier** (750 hrs/month t2.micro)
- Enable **S3 lifecycle rules** for old data
- Use **spot instances** for batch jobs

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'cloud'),
 true, now() - interval '4 days',
 'AWS EC2 and S3 Guide | Shalini Kumari',
 'Practical guide to EC2 instances and S3 storage for developers.'),

-- 10. Docker Basics
('docker-containerization-basics',
 'Docker for Beginners: Containerize Your Applications',
 'Learn Docker fundamentals — images, containers, Dockerfile, and docker-compose for modern development workflows.',
 '# Docker for Beginners

Docker packages your application and all its dependencies into a portable **container**.

## Why Docker?

- **Consistency** — Works the same everywhere
- **Isolation** — Each app runs in its own container
- **Portability** — Ship containers to any cloud
- **Speed** — Containers start in seconds

## Key Concepts

- **Image** — Blueprint/template (read-only)
- **Container** — Running instance of an image
- **Dockerfile** — Instructions to build an image
- **Registry** — Hub to store/share images (Docker Hub)

## Dockerfile Example

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

## Essential Commands

```bash
# Build an image
docker build -t my-app .

# Run a container
docker run -d -p 3000:3000 --name my-app my-app

# List containers
docker ps

# View logs
docker logs my-app

# Stop container
docker stop my-app
```

## Docker Compose

Run multi-container applications:

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: mongo:6
    volumes:
      - mongo-data:/data/db
volumes:
  mongo-data:
```

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'cloud'),
 true, now() - interval '3 days',
 'Docker Basics for Developers | Shalini Kumari',
 'Docker fundamentals: images, containers, Dockerfile, and docker-compose explained.'),

-- 11. CSS Grid and Flexbox
('css-grid-flexbox-mastery',
 'CSS Grid vs Flexbox: When to Use Each and Why',
 'A visual guide to CSS Grid and Flexbox with practical layout examples and decision-making tips.',
 '# CSS Grid vs Flexbox

Both are powerful CSS layout tools, but they serve different purposes.

## Flexbox — One-Dimensional Layout

Flexbox works along a **single axis** (row or column).

```css
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}
```

Best for:
- Navigation bars
- Card rows
- Centering content
- Flexible spacing

## CSS Grid — Two-Dimensional Layout

Grid works along **both axes** simultaneously.

```css
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}
```

Best for:
- Page layouts
- Card grids
- Dashboard designs
- Complex arrangements

## Decision Guide

| Scenario | Flexbox | Grid |
|----------|---------|------|
| Navbar | ✅ | ❌ |
| Card grid | ❌ | ✅ |
| Centering | ✅ | ✅ |
| Sidebar layout | ❌ | ✅ |
| Inline elements | ✅ | ❌ |

## Pro Tip: Combine Both

Use Grid for the overall page layout, and Flexbox for component-level alignment.

```css
.page { display: grid; grid-template-columns: 250px 1fr; }
.header { display: flex; justify-content: space-between; }
```

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'web-dev'),
 true, now() - interval '2 days',
 'CSS Grid vs Flexbox | Shalini Kumari',
 'Visual guide comparing CSS Grid and Flexbox with practical examples and decision tips.'),

-- 12. Recursion and Backtracking
('recursion-backtracking-patterns',
 'Recursion & Backtracking: Patterns Every Developer Should Know',
 'Master recursion and backtracking with patterns for subsets, permutations, N-Queens, and Sudoku solver.',
 '# Recursion & Backtracking

Recursion is the foundation of many algorithms. Backtracking extends recursion to explore and prune solution spaces.

## Recursion Basics

A recursive function calls itself with a smaller input:

```javascript
function factorial(n) {
    if (n <= 1) return 1; // Base case
    return n * factorial(n - 1); // Recursive case
}
```

## The Backtracking Template

```
function backtrack(state, choices):
    if isGoal(state):
        addToResult(state)
        return
    for choice in choices:
        if isValid(choice):
            makeChoice(choice)
            backtrack(newState, remainingChoices)
            undoChoice(choice)  // BACKTRACK
```

## Classic Problems

### 1. Generate All Subsets

```javascript
function subsets(nums) {
    const result = [];
    function bt(start, current) {
        result.push([...current]);
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            bt(i + 1, current);
            current.pop();
        }
    }
    bt(0, []);
    return result;
}
```

### 2. Permutations

Generate all orderings of elements.

### 3. N-Queens

Place N queens on an N×N chessboard so no two attack each other.

### 4. Sudoku Solver

Fill a 9×9 grid following Sudoku rules using constraint-based backtracking.

## Key Insights

- **Base case** prevents infinite recursion
- **Pruning** makes backtracking efficient
- Visualize the **recursion tree** to understand flow
- Time complexity is often **exponential** — optimize with memoization

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'dsa'),
 true, now() - interval '1 day',
 'Recursion & Backtracking Patterns | Shalini Kumari',
 'Master recursion and backtracking with subsets, permutations, N-Queens, and Sudoku patterns.')

ON CONFLICT (slug) DO NOTHING;
