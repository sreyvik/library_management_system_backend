# Architecture Guide

## Folder Responsibilities

- `controllers/` translates HTTP input into service calls
- `services/` contains business rules and orchestration
- `models/` maps between JavaScript objects and SQL rows
- `routes/` defines API endpoints
- `middlewares/` adds reusable request handling behavior
- `configs/` stores environment, port, database, and logging setup

## Why This Structure Works

This layout keeps the application modular. Each layer has one job, which makes the code easier to change, test, and debug.

## Professional Principle

Controllers should stay thin. Business logic should live in services. SQL should stay in the data layer.

