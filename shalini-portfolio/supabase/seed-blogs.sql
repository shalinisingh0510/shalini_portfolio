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
 'Master recursion and backtracking with subsets, permutations, N-Queens, and Sudoku patterns.'),

-- 13. Segment Tree Range Update
('segment-tree-range-update',
 'Segment Trees Deep Dive: Range Updates & Lazy Propagation',
 'Explore segment trees, range query types, and lazy propagation optimizations for interval update performance.',
 '# Segment Trees with Range Update & Lazy Propagation

Segment Trees are a powerful DSA structure for range queries and updates. This article focuses on lazy propagation for efficient range updates.

## Core Concept

- Build tree in `O(n)`.
- Query range in `O(log n)`.
- Update range in `O(log n)` with lazy flags.

## Lazy Propagation Idea

Store delayed updates in intermediate nodes to avoid traversing full subtrees.

### Pseudocode: propagate
```cpp
void propagate(int idx, int start, int end) {
    if (lazy[idx] != 0) {
        tree[idx] += (end - start + 1) * lazy[idx];
        if (start != end) {
            lazy[2*idx] += lazy[idx];
            lazy[2*idx+1] += lazy[idx];
        }
        lazy[idx] = 0;
    }
}
```

## Use Cases
- Frequency intervals
- Sliding window analytics
- Games and contest problems

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'dsa'),
 true, now() - interval '23 hours',
 'Segment Trees Lazy Propagation | Shalini Kumari',
 'DSA guide for segment trees with lazy propagation and range updates.'),

-- 14. Persistent Data Structures
('persistent-data-structures',
 'Persistent Data Structures: Immutable Versioned Trees & Lists',
 'Niche DSA article on persistent structures, copy-on-write tree operations, and versioned query history.',
 '# Persistent Data Structures

Persistent data structures keep previous versions available after updates. This is vital for undo history, snapshots, and functional programming.

## Persistent vs Immutable
- Persistent: old versions retained (partial copy).
- Immutable: no modification in-place.

## Path copying for binary trees
- Clone path from root to modified node
- Reuse unchanged branches

## Practical example: persistent array
- Store path in binary trie with bit decomposition
- Update cost: `O(log n)` for depth path

## Advantages
- Time travel debugging
- Safe concurrency (read-only views)
- Efficient undo operations

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'dsa'),
 true, now() - interval '22 hours',
 'Persistent Data Structures | Shalini Kumari',
 'Immutable/persistent data structure patterns for advanced DSA design.'),

-- 15. Eventual Consistency
('eventual-consistency-architectures',
 'Eventual Consistency in Distributed Systems: Patterns & Pitfalls',
 'Detailed guide on eventual consistency, data convergence, and anti-entropy mechanisms for distributed architecture.',
 '# Eventual Consistency in Distributed Systems

Eventual consistency allows system availability under partition, with data convergence over time.

## CAP Theorem Reminder
- Choose 2: Consistency, Availability, Partition Tolerance.
- Eventual consistency favors AP systems.

## Mechanisms
- **Gossip protocols** for state dissemination.
- **Vector clocks** for conflict resolution.
- **CRDTs** for commutative updates.

## Example: Shopping Cart
- Local cart writes accepted immediately.
- Background conflict resolution merges item counts.

## Pitfalls
- Read after write anomalies
- Stale cache values
- User expectations vs real latency

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'system-design'),
 true, now() - interval '21 hours',
 'Eventual Consistency Patterns | Shalini Kumari',
 'Niche system design article on eventual consistency architecture and conflict resolution.'),

-- 16. Paxos vs Raft
('paxos-vs-raft',
 'Paxos vs Raft: Choosing a Consensus Protocol',
 'Compare Paxos and Raft with diagrams, leader election, and practical implications for high-availability systems.',
 '# Paxos vs Raft

Consensus is the backbone of distributed fault-tolerant systems.

## Paxos Overview
- Decentralized, theoretical foundation.
- Roles: proposer, acceptor, learner.
- Harder to implement correctly.

## Raft Overview
- Leader-based, easier to understand.
- Phases: leader election, log replication, safety.

## Comparison
- Paxos: more flexible; Raft: more deterministic.
- Raft provides strong election safety and log consistency.

## When to choose
- Use Raft for production clusters (etcd, Consul)
- Use Paxos in research protocols requiring generality.

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'system-design'),
 true, now() - interval '20 hours',
 'Paxos vs Raft | Shalini Kumari',
 'Consensus protocol comparison for reliable distributed systems.'),

-- 17. CQRS & Event Sourcing
('cqrs-event-sourcing',
 'CQRS & Event Sourcing: Building Audit-Ready Systems',
 'Architectural breakdown of CQRS and event sourcing, including read/write models and replay-based debugging.',
 '# CQRS and Event Sourcing

CQRS separates the read model from the write model. Event sourcing stores state transitions as immutable events.

## Benefits
- Read scalability with specialized projections
- Fully auditable history
- Easy rebuild of state for new schemas

## Typical Structure
- Command side (writes, validation)
- Event store (append-only log)
- Query side (materialized views)

## Implementation notes
- Maintain idempotent handlers
- Version events to support schema evolution
- Use snapshots for performance

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'system-design'),
 true, now() - interval '19 hours',
 'CQRS Event Sourcing | Shalini Kumari',
 'Architectural guide to CQRS and event sourcing for reliable domain systems.'),

-- 18. Latency Tail Optimzation
('capacity-planning-latency-tail',
 'Capacity Planning & Tail Latency: SLO-Driven System Design',
 'In-depth analysis of tail latency, SLAs, and capacity planning for low-latency distributed services.',
 '# Capacity Planning & Tail Latency

High-scale services must manage p99/p999 latency to meet SLAs.

## Tail latency sources
- Garbage collection pauses
- IO contention
- Head-of-line blocking

## Mitigations
- Request hedging
- Priority queues
- Executor pools with reservation

## Design by SLO
- Define SLO first (e.g., 99.9% < 150ms)
- Build with SLI measurement and SLO alerts
- Use load testing to validate designed capacity

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'system-design'),
 true, now() - interval '18 hours',
 'Tail Latency Capacity Planning | Shalini Kumari',
 'System design article on capacity planning and tail latency optimization.'),

-- 19. Distributed Rate Limiting
('distributed-rate-limiting-patterns',
 'Distributed Rate Limiting: Tokens, Leaky Buckets & Redis',
 'Guide to rate limiting at scale with algorithms and distributed enforcement for API gateways.',
 '# Distributed Rate Limiting Patterns

Rate limiting is critical for protecting APIs from spikes and abuse.

## Algorithms
- Token bucket (burst + sustained rate)
- Leaky bucket (smooth output)
- Fixed window vs sliding window

## Distributed enforcement
- Use Redis with `INCR` and TTL
- Use consistent hashing to avoid hot keys
- Use shared counter with local cache + async sync

## Real-world concerns
- Clock skew
- Fault tolerance
- Overhead on high QPS

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'system-design'),
 true, now() - interval '17 hours',
 'Distributed Rate Limiting | Shalini Kumari',
 'Niche system design article on distributed rate limiting strategies.'),

-- 20. DP on Trees
('dynamic-programming-on-trees',
 'Dynamic Programming on Trees: rerooting, subtree, and path DP',
 'Advanced DP patterns over trees, including rerooting and parent-child accumulation methods.',
 '# Dynamic Programming on Trees

Tree DP problems are common in contests and interviews.

## Subtree DP
- Compute dp[u] using children results
- Example: max path sum in tree

## Rerooting DP
- Compute answer for every node as root
- Reuse partial results when moving root

## Path DP
- store longest/second-longest down-child paths
- combine for diameter calculations

## Technique
- DFS + memoization
- careful parent handling to avoid cycles

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'dsa'),
 true, now() - interval '16 hours',
 'Dynamic Programming on Trees | Shalini Kumari',
 'Rerooting and subtree DP techniques for trees and graphs.'),

-- 21. Cache Invalidation
('cache-invalidation-strategies',
 'Cache Invalidation Strategies: Write-Through, Write-Back, TTL',
 'Deep dive into cache invalidation patterns, which is the hardest problem in caching systems.',
 '# Cache Invalidation Strategies

Caching is great until stale data appears. Invalidation is key.

## Patterns
- Write-through: sync updates to cache + store
- Write-back: update cache first, flush later
- Cache-aside: app explicitly handles caching

## TTL and versioning
- Use short TTL for volatile data
- If strong consistency is needed, use versioned keys

## Common pitfalls
- Stale-read windows
- Coherency between multi-tier caches
- Cache stampede

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'system-design'),
 true, now() - interval '15 hours',
 'Cache Invalidation Strategies | Shalini Kumari',
 'System design guide for proper cache invalidation in distributed caches.'),

-- 22. Real-Time Notifications
('designing-real-time-notification-system',
 'Designing a Real-Time Notification System with Pub/Sub',
 'Practical design of a real-time notification service with web sockets, message bus, and delivery guarantees.',
 '# Designing a Real-Time Notification System

Real-time notifications are central to modern user experiences.

## Requirements
- Sub-second delivery
- Support burst messages
- Offline retry behavior

## Architecture
- API Gateway -> Auth service -> Notification service
- Event producer -> Pub/Sub queue (Kafka, Redis Streams)
- Consumer workers -> User channel (WebSocket, push)

## Delivery guarantees
- At-least-once with deduplication
- At-most-once for non-critical alerts

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'system-design'),
 true, now() - interval '14 hours',
 'Real-Time Notification System | Shalini Kumari',
 'Detailed architecture for real-time event notification services.'),

-- 23. Bitwise Tricks
('bitwise-tricks-competitive-programming',
 '10 Bitwise Tricks Every Competitive Programmer Should Know',
 'Compact and high-performance bit operations for constraints, masks, and math speed-ups.',
 '# Bitwise Tricks for Competitive Programming

Bitwise operations can optimize algorithms and open new problem-solving patterns.

## Essentials
- `x & -x` (isolates lowest set bit)
- `x & (x - 1)` (remove lowest set bit)
- `(x ^ y)` for toggling / parity

## Use cases
- subset iteration, bitmask DP, fast modulo by powers of two

## Example: count subsets with XOR
```cpp
int countXOR(vector<int>& a, int k) {
    int n = a.size();
    vector<int> dp(1 << 20);
    dp[0] = 1;
    for (int x : a) {
        for (int m = (1<<20)-1; m>=0; --m) if (dp[m]) dp[m ^ x] += dp[m];
    }
    return dp[k];
}
```

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'dsa'),
 true, now() - interval '13 hours',
 'Bitwise Tricks for Competitive Programming | Shalini Kumari',
 'Advanced bitwise optimization techniques for DSA competitions.'),

-- 24. Topological Sort
('topological-sort-explained',
 'Topological Sort, DAGs, and Dependency-Driven Scheduling',
 'Understanding DAG ordering, cycle checks, and job scheduling with Kahn and DFS methods.',
 '# Topological Sort in DAGs

Topological ordering is critical in build systems, dependency resolution, and task scheduling.

## Kahn’s algorithm
- compute indegree
- process zero indegree nodes queue
- remove and update neighbors

## DFS approach
- visit states: unvisited -> visiting -> visited
- detect cycles with recursion stack

## Application
- course prerequisites, package managers, pipeline orchestration

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'dsa'),
 true, now() - interval '12 hours',
 'Topological Sort in DAGs | Shalini Kumari',
 'DAG ordering and scheduling algorithms for directed acyclic graphs.'),

-- 25. Sliding Window
('sliding-window-techniques',
 'Sliding Window Advanced Patterns: Fixed, Dynamic, and Multi-window',
 'Problem patterns and templates for sum, max/min, and frequency windows with O(n) solutions.',
 '# Sliding Window Patterns

Sliding window is a core technique for subarray and substring problems.

## Fixed-size window
- maintain queue/heap for min/max
- subsets with sum target

## Variable window
- expand/contract with two pointers
- used in `min subarray length` and `longest substring without repeat`

## Multi-window
- simultaneous windows for twin criteria

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'dsa'),
 true, now() - interval '11 hours',
 'Sliding Window Techniques | Shalini Kumari',
 'Pattern library for fixed and dynamic sliding window problems.'),

-- 26. Trie Data Structure
('trie-data-structure-real-world',
 'Trie Data Structure: Autocomplete, Prefix Search, and Spellcheck',
 'Build a Trie with memory trade-offs and use it for fast prefix queries and dictionary operations.',
 '# Trie Data Structure

Tries deliver efficient prefix and dictionary search (O(k) where k = key length).

## Trie node
- children map / array
- end-of-word marker

## Operations
- `insert`, `search`, `startsWith`
- wildcard and prefix count

## Real world
- autocomplete, IP routing, Chinese text segmenting

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'dsa'),
 true, now() - interval '10 hours',
 'Trie Data Structure for Autocomplete | Shalini Kumari',
 'Real-world trie applications and implementation patterns.'),

-- 27. Idempotent API Design
('idempotent-api-design',
 'Idempotent API Design for Resilient Distributed Systems',
 'How to design API endpoints to be safe on retries, with tokens, optimistic locking, and at-least-once semantics.',
 '# Idempotent API Design

Idempotency is essential for safe retry behavior in distributed microservices.

## Strategies
- idempotency keys + dedupe store
- conditional updates with `version` or `etag`

## Example endpoint
- POST /messages -> new message w/ key check
- respond 200 if duplicate request existed

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'system-design'),
 true, now() - interval '9 hours',
 'Idempotent API Design | Shalini Kumari',
 'System design best practices for retry-safe APIs.'),

-- 28. Multi-tenant Architecture
('multi-tenant-architecture',
 'Multi-tenant Architecture: Schema, Isolation, and Performance',
 'Compare single-tenant, shared schema, and hybrid tenant models for SaaS apps with security and scaling guidance.',
 '# Multi-tenant Architecture

SaaS platforms require a tenant model that balances isolation and cost.

## Tenant models
- shared database + shared schema
- shared database + separate schema
- isolated database per tenant

## Considerations
- tenant-aware routing, auth context, metrics, and tenant throttling

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'system-design'),
 true, now() - interval '8 hours',
 'Multi-tenant SaaS Architecture | Shalini Kumari',
 'Design patterns for secure and scalable multi-tenant systems.'),

-- 29. Observability and Monitoring
('observability-monitoring-best-practices',
 'Observability & Monitoring: Telemetry, Traces, Metrics, and Service Health',
 'Design a telemetry strategy with distributed tracing, logs, and DRM for production service reliability.',
 '# Observability and Monitoring

Production systems need strong observability as an operational discipline.

## Three pillars
- metrics (Prometheus)
- logs (ELK/Datadog)
- traces (OpenTelemetry)

## SLOs and alerts
- error budget, burn rate
- proactive alert rules

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'system-design'),
 true, now() - interval '7 hours',
 'Observability & Monitoring | Shalini Kumari',
 'System design plan for reliable operational observability.'),

-- 30. Design Chat Service
('designing-chat-service-architecture',
 'Designing a Scalable Chat Service: WebSockets, PubSub, and Persistence',
 'End-to-end design for chat with presence, channels, message retention, and scaling considerations.',
 '# Designing a Chat Service

Build a real-time chat system with low latency and high concurrency.

## Core components
- API gateway + auth service
- message broker (Redis/NSQ)
- chat services + event workers

## Features
- typing indicators, message ordering, history retrieval
- horizontal scaling via sharding user connections

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'system-design'),
 true, now() - interval '6 hours',
 'Scalable Chat Service Architecture | Shalini Kumari',
 'Realtime chat system architecture with sharding and persistence.'),

-- 31. Node Performance
('nodejs-performance-optimization',
 'Node.js Performance Optimization: Event Loop, Clustering, and Memory',
 'Backend performance best practice for Node.js apps, with profiling, garbage collector tuning, and horizontal clustering.',
 '# Node.js Performance Optimization

High-throughput Node servers require I/O efficiency and event loop awareness.

## Techniques
- async/await vs callback perf costs
- cluster/fork primary-workers
- use `--inspect`/`clinic` profile

## Memory safety
- manage heap growth
- avoid unbounded caches

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'mern-stack'),
 true, now() - interval '5 hours',
 'Node.js Performance Optimization | Shalini Kumari',
 'Backend Node performance tuning with clustering and memory profiling.'),

-- 32. Secure JWT Auth
('secure-jwt-authentication-node',
 'Secure JWT Authentication in Node: Refresh Tokens and Rotation',
 'Implement secure JWT auth flows with refresh token rotation, revocation, and token blacklists.',
 '# Secure JWT Authentication

JWT is ubiquitous for stateless auth but needs best practices for security.

## Flow
- short-lived access token
- refresh token stored securely (httpOnly cookie)
- rotation and revocation list to combat token theft

## Implementation
- verify signature, `iat`, `exp`, `aud`, `iss`
- early rejection on invalid session

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'mern-stack'),
 true, now() - interval '4 hours',
 'Secure JWT Authentication | Shalini Kumari',
 'Backend auth design with JWT rotation and refresh token security.'),

-- 33. Event-Driven Node
('event-driven-architecture-node',
 'Event-Driven Architecture in Node.js: Kafka, RabbitMQ, and Microservices',
 'Patterns for building event-driven distributed backend systems with reliable delivery and eventual consistency.',
 '# Event-Driven Architecture in Node.js

Event-driven microservices reduce coupling and scale fan-out workloads.

## Key patterns
- event sourcing
- consumer groups and partitioning
- dead-letter queue handling

## Delivery semantics
- at-least-once with dedupe ID
- out-of-order processing concerns

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'mern-stack'),
 true, now() - interval '3 hours',
 'Event-Driven Architecture in Node | Shalini Kumari',
 'Backend event-driven service design with message queues and reliability.'),

-- 34. Scalable REST API with Prisma
('scalable-rest-api-prisma',
 'Scalable REST API with Node, Express, and Prisma',
 'Design a robust backend with auto-generated ORM schemas, pagination, validation, and connection pool tuning.',
 '# Scalable REST API with Prisma

Prisma makes database access in Node type-safe and maintainable.

## API design
- endpoint structure, JSON:API semantics
- inbound validation (Zod/Joi)

## Performance
- query batching
- cursor pagination
- connection pooling with PgBouncer

---
*Written by Shalini Kumari | Alard University*',
 'Shalini Kumari', 'Alard University',
 (SELECT id FROM public.blog_categories WHERE slug = 'mern-stack'),
 true, now() - interval '2 hours',
 'Scalable REST API with Prisma | Shalini Kumari',
 'Backend API architecture with Prisma, pagination, and efficient DB access.')

ON CONFLICT (slug) DO NOTHING;
