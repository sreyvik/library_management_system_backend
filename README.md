# Library Management System Backend

Node.js + TypeScript backend for a library management system, structured around MVC, service-repository layering, and production-style API conventions.

## What This Project Is

This project is more than CRUD endpoints. It is a backend architecture exercise that focuses on:

- scalable Node.js API design
- object-oriented thinking
- clean separation of concerns
- professional database access patterns
- JWT-based security readiness
- team-friendly Git workflow

## Why This Project Matters

- Node.js is non-blocking and handles many concurrent requests efficiently
- modular architecture keeps the codebase maintainable as it grows
- OOP helps turn business rules into reusable objects and services
- the same style of architecture is used in real production systems

## Real-World Use Cases

- FinTech APIs for secure transactions
- E-commerce platforms with complex relationships
- streaming platforms with high-throughput data access

## Project Objectives

- master Node.js and Express
- apply OOP concepts in backend design
- build scalable REST APIs
- interact cleanly with MySQL
- prepare the app for authentication and authorization
- practice Git and team workflow discipline

## Tech Stack

- Node.js
- Express
- TypeScript
- MySQL
- JWT
- Nodemon

## Core OOP Concepts

### Classes and Constructors

A class is a blueprint. A constructor initializes object state when an instance is created.

### Encapsulation

Encapsulation keeps data private and exposes behavior through methods. This protects object state from random external changes.

### Inheritance

Inheritance lets one class reuse or extend another class, such as `Admin extends User`.

### Polymorphism

Polymorphism lets different objects respond to the same method in different ways.

## Architecture

The codebase follows a service-repository approach inside an MVC-style structure:

- `controllers/` handles HTTP requests and responses
- `services/` contains business rules
- `repositories/` or data-access modules handle database queries
- `models/` represent data structures and mapping logic
- `middlewares/` handle auth, validation, logging, and errors

## Request Flow

1. Client sends an HTTP request
2. Router sends it to a controller
3. Controller calls the service
4. Service calls the database layer
5. Response goes back to the client

## Authentication Flow

- login validates credentials
- server issues a JWT
- client sends the token in the `Authorization` header
- server verifies the token statelessly

## Database Relationships

- one-to-many: one user can have many records
- many-to-many: requires a pivot or junction table

## API Development Workflow

1. define the route
2. validate or protect with middleware
3. process business logic in the service
4. execute CRUD in the database layer
5. verify with Postman or another API client

## Common Mistakes To Avoid

- mixing business logic into controllers
- using weak names like `data1` or `temp`
- hardcoding database secrets
- skipping validation
- returning vague errors
- forgetting `.gitignore`

## Current Backend Structure

- `src/app.ts` wires middleware and routes
- `src/server.ts` starts the server and verifies the database connection
- `src/routes/` groups API routes
- `src/controllers/` handles request/response logic
- `src/services/` contains business rules
- `src/models/` performs MySQL queries
- `src/middlewares/` handles errors and 404s

## Available Book API

- `GET /api/books`
- `GET /api/books/:id`
- `POST /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`

## Book Table Mapping

The `books` table currently uses:

- `id`
- `category_id`
- `title`
- `author`
- `isbn`
- `quantity`
- `available_quantity`
- `published_year`
- `created_at`

## Three-Week Roadmap

### Week 1: Blueprint

- finalize requirements
- model the database
- define project structure
- set up the Express boilerplate

### Week 2: Core Engineering

- build REST endpoints
- integrate the database layer
- add validation and auth-ready middleware

### Week 3: Quality and Launch

- add tests
- refactor for cleaner OOP compliance
- document the API
- prepare for deployment

## Deployment Checklist

- keep `.env` private
- store secrets in provider settings
- host on a platform like Render, Fly.io, or AWS
- automate checks with CI/CD
- include setup steps, schema details, and API docs

## Final Deliverables

- working API
- meaningful Git history
- normalized database
- documented endpoints
- secure authentication plan
- maintainable folder structure

## Setup

```bash
npm install
npx tsc --noEmit
npm run dev
```

## Note

The best backend code is not just code that works. It is code that is easy to understand, safe to extend, and simple to test.
