# Task Manager API

A production-ready REST API for task management built with Node.js, Express, and
PostgreSQL (Neon). This project demonstrates clean architecture principles,
comprehensive testing, and scalable backend development practices.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Database Integration](#database-integration)
- [API Endpoints](#api-endpoints)
- [Middleware](#middleware)
- [Logging](#logging)
- [Testing](#testing)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Running the Project](#running-the-project)
- [Testing](#testing-1)

## Architecture Overview

The application follows a layered architecture pattern that separates concerns
and promotes maintainability:

### Layered Architecture

```
┌─────────────────┐
│   Routes        │ ← API endpoints, route handlers
├─────────────────┤
│   Controllers   │ ← Request/response logic, error handling
├─────────────────┤
│   Services      │ ← Business logic, database operations
├─────────────────┤
│   Database      │ ← Connection pool, queries
├─────────────────┤
│   Middleware    │ ← Validation, logging, error handling
└─────────────────┘
```

### Key Design Principles

- **Separation of Concerns**: Each layer has a single responsibility
- **Dependency Injection**: Services are injected into controllers
- **Error Handling**: Centralized error handling with custom error classes
- **Validation**: Input validation at multiple layers
- **Testing**: Comprehensive unit and integration tests

## Project Structure

```
task-manager/
├── backend/
│   ├── app.js                 # Express application setup
│   ├── server.js              # Server entry point
│   ├── package.json           # Dependencies and scripts
│   ├── jest.config.js         # Jest testing configuration
│   ├── migrations/
│   │   └── 001_create_tasks.sql  # Database schema
│   ├── src/
│   │   ├── controllers/
│   │   │   └── tasks.js       # Route handlers
│   │   ├── database/
│   │   │   ├── init.js        # Database initialization
│   │   │   └── pool.js        # PostgreSQL connection pool
│   │   ├── middleware/
│   │   │   ├── bodyValidate.js    # Request body validation
│   │   │   ├── errorHandler.js    # Global error handling
│   │   │   └── paramValidate.js   # URL parameter validation
│   │   ├── routes/
│   │   │   └── tasks.js       # Task routes
│   │   ├── services/
│   │   │   └── taskService.js # Business logic and DB operations
│   │   └── utils/
│   │       ├── AppError.js        # Custom error class
│   │       ├── bodySchema.js      # Joi validation schemas
│   │       ├── NotFoundError.js   # Not found error class
│   │       └── paramSchema.js     # Parameter validation schemas
│   └── tests/
│       ├── setup/
│       │   ├── globalSetup.js     # Test database setup
│       │   ├── globalTearDown.js  # Test cleanup
│       │   ├── setupEach.js       # Per-test setup
│       │   ├── testDb.js          # Test database utilities
│       │   └── testEnv.js         # Test environment configuration
│       └── unit/
│           ├── createTaskService.test.js
│           ├── deleteTaskService.test.js
│           ├── getTaskService.test.js
│           └── updateTaskService.test.js
```

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon serverless)
- **Database Client**: pg (node-postgres)
- **Validation**: Joi
- **Logging**: Morgan
- **Testing**: Jest + Supertest
- **Environment**: dotenv
- **Development**: nodemon

## Database Integration

### Neon PostgreSQL Setup

The application uses Neon (neon.tech) for serverless PostgreSQL hosting.
Connection is established through:

- **Connection Pooling**: Uses `pg.Pool` for efficient connection management
- **SSL Required**: Neon requires SSL connections
- **Environment Variables**: Database URL stored in `.env`

### Database Configuration

```javascript
// src/database/pool.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
  },
});
```

### Schema Management

Database schema is managed through migrations and initialization scripts:

- **Migration Files**: SQL scripts in `migrations/` directory
- **Auto-initialization**: Database tables created on server startup
- **Schema Versioning**: Numbered migration files for version control

### Task Schema

```sql
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL,
    description TEXT
);
```

## API Endpoints

The API provides complete CRUD operations for task management:

### Base URL

```
http://localhost:3003/api/v1
```

### Endpoints Overview

| Method | Endpoint     | Description              |
| ------ | ------------ | ------------------------ |
| GET    | `/tasks`     | Retrieve all tasks       |
| POST   | `/tasks`     | Create a new task        |
| GET    | `/tasks/:id` | Retrieve a specific task |
| PATCH  | `/tasks/:id` | Update a specific task   |
| DELETE | `/tasks/:id` | Delete a specific task   |

### Request/Response Examples

#### Create Task

```bash
POST /api/v1/tasks
Content-Type: application/json

{
  "title": "Learn Node.js",
  "active": true,
  "description": "Complete Node.js tutorial series"
}
```

**Response (201 Created):**

```json
{
  "id": 1,
  "title": "Learn Node.js",
  "active": true,
  "description": "Complete Node.js tutorial series"
}
```

#### Get All Tasks

```bash
GET /api/v1/tasks
```

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "Learn Node.js",
    "active": true,
    "description": "Complete Node.js tutorial series"
  }
]
```

#### Update Task

```bash
PATCH /api/v1/tasks/1
Content-Type: application/json

{
  "title": "Learn Node.js Advanced",
  "active": false,
  "description": "Complete advanced Node.js patterns"
}
```

**Response (200 OK):**

```json
{
  "status": "Successfully updated"
}
```

## Middleware

The application uses several middleware layers for request processing:

### Global Middleware (app.js)

```javascript
app.use(express.json()); // JSON body parsing
app.use(morgan('dev')); // HTTP request logging
app.use(errorHandler); // Global error handling
```

### Route-specific Middleware

- **Validation Middleware**: `bodyValidate.js`, `paramValidate.js`
- **Error Handling**: `errorHandler.js`

### Validation

Request validation is implemented using Joi schemas:

- **Body Validation**: Validates POST/PATCH request bodies
- **Parameter Validation**: Validates URL parameters (e.g., task IDs)

```javascript
// Body schema validation
const bodySchema = Joi.object({
  title: Joi.string().min(1).required(),
  active: Joi.boolean().required(),
  description: Joi.string().allow(null, '').optional(),
});

// Parameter schema validation
const paramSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});
```

## Logging

HTTP request logging is handled by Morgan middleware:

- **Format**: `dev` format (concise, colored output)
- **Coverage**: All incoming requests
- **Output**: Console logs with method, URL, status, response time

Example log output:

```
GET /api/v1/tasks 200 12.345 ms - 234
POST /api/v1/tasks 201 45.678 ms - 123
```

## Testing

Comprehensive testing suite using Jest and Supertest:

### Test Structure

- **Unit Tests**: Service layer testing with mocked database
- **Integration Tests**: Full request/response cycle testing
- **Test Database**: Isolated PostgreSQL database for testing

### Test Configuration

```javascript
// jest.config.js
module.exports = {
  setupFiles: ['<rootDir>/tests/setup/testEnv.js'],
  globalSetup: '<rootDir>/tests/setup/globalSetup.js',
  globalTeardown: '<rootDir>/tests/setup/globalTeardown.js',
  setupFilesAfterEnv: ['<rootDir>/tests/setup/setupEach.js'],
};
```

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run coverage

# Run in CI mode
npm run test:ci
```

### Test Coverage

- Service methods (CRUD operations)
- Controller error handling
- Validation middleware
- Database operations
- Custom error classes

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database (Neon account recommended)

### Environment Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd node-project/task-manager/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   Create a `.env` file in the `backend/` directory:

   ```env
   PORT=3003
   DATABASE_URL=postgresql://username:password@hostname/database?sslmode=require
   ```

   For Neon PostgreSQL:
   - Get your connection string from Neon dashboard
   - Ensure SSL mode is set to `require`

4. **Database Setup**

   The application automatically creates the required tables on startup. The
   migration file `001_create_tasks.sql` defines the schema.

## Running the Project

### Development Mode

```bash
npm start
```

This starts the server with nodemon for automatic restarts on file changes.

### Production Mode

```bash
node server.js
```

### Server Output

```
POOL CONNECTED TO: postgresql://...
Create new table for managing tasks
Server is listening on port 3003...
```

## Testing

### Run Test Suite

```bash
npm test
```

### Run with Coverage

```bash
npm run coverage
```

### Test Results

The test suite includes:

- Unit tests for all service methods
- Error handling validation
- Database operation mocking
- Integration tests for API endpoints

## API Usage Examples

### Using curl

```bash
# Create a task
curl -X POST http://localhost:3003/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","active":true,"description":"Task description"}'

# Get all tasks
curl http://localhost:3003/api/v1/tasks

# Get specific task
curl http://localhost:3003/api/v1/tasks/1

# Update task
curl -X PATCH http://localhost:3003/api/v1/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Task","active":false}'

# Delete task
curl -X DELETE http://localhost:3003/api/v1/tasks/1
```

## Error Handling

The API uses consistent error response formats:

### Validation Error (400)

```json
{
  "success": false,
  "errors": ["\"title\" is required", "\"active\" must be a boolean"]
}
```

### Not Found Error (404)

```json
{
  "success": false,
  "message": "Task with id 999 not found"
}
```

### Server Error (500)

```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

## Contributing

1. Follow the established architecture patterns
2. Add tests for new features
3. Update documentation as needed
4. Ensure all tests pass before submitting

## License

ISC License - Kevin Ngo
