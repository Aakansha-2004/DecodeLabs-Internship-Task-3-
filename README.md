# User Management System

### Full Stack Development | DecodeLabs Industrial Training Kit | Batch 2026

> **Database Integration Phase**  
> Connecting the backend application with MySQL to store, manage, and retrieve user data with complete CRUD functionality.

---

# Project Overview

The User Management System is a backend-based application developed using Node.js, Express.js, and MySQL.

The purpose of this project is to create a RESTful API that allows users to be created, accessed, updated, and deleted while maintaining proper database connectivity, validation, and security.

This project demonstrates complete CRUD operations with MySQL database integration.

---

# Project Directory Structure

```
user-management-system/

├── sql/
│   └── schema.sql
│       # Database schema creation and sample user data

├── src/
│   ├── config/
│   │   └── db.js
│   │       # MySQL database connection configuration

│   ├── controllers/
│   │   └── userController.js
│   │       # Handles all user CRUD operations

│   ├── middleware/
│   │   └── validate.js
│   │       # Input validation and security checks

│   ├── routes/
│   │   └── userRoutes.js
│   │       # REST API route definitions

│   └── index.js
│       # Express application entry point

├── .env.example
│   # Environment variable template

├── .gitignore

├── package.json

└── README.md
    # Project documentation
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/user-management-system.git

cd user-management-system
```

---

## 2. Install Dependencies

Run the following command:

```bash
npm install
```

This will install all required Node.js packages.

---

## 3. Configure Environment Variables

Create the environment file:

```bash
cp .env.example .env
```

Update `.env` with your MySQL credentials:

```
PORT=3000

DB_HOST=localhost

DB_PORT=3306

DB_USER=root

DB_PASSWORD=your_mysql_password

DB_NAME=user_management_db
```

---

## 4. Database Setup

Open MySQL and execute:

```bash
mysql -u root -p < sql/schema.sql
```

You can also copy and run the SQL file using MySQL Workbench or phpMyAdmin.

---

## 5. Start Server

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

---

# API Endpoints

Base URL:

```
http://localhost:3000
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check and route information |
| POST | `/api/users` | Create a new user |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update user details |
| DELETE | `/api/users/:id` | Delete user |

---

# API Examples

## Create User

### Request

```
POST /api/users
```

Body:

```json
{
  "name": "Aarav Sharma",
  "email": "aarav@example.com",
  "age": 22,
  "role": "user"
}
```

Response:

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "Aarav Sharma",
    "email": "aarav@example.com",
    "age": 22,
    "role": "user"
  }
}
```

---

## Get All Users

Request:

```
GET /api/users
```

Filter by role:

```
GET /api/users?role=admin
```

Search user:

```
GET /api/users?search=aarav
```

---

## Get User By ID

Example:

```
GET /api/users/1
```

Returns information of a specific user.

---

## Update User

Example:

```
PUT /api/users/1
```

Body:

```json
{
  "name": "Aarav Kumar",
  "age": 23
}
```

---

## Delete User

Example:

```
DELETE /api/users/1
```

Deletes the selected user record.

---

# Security Features (Pillar 4 — The Shield)

| Feature | Implementation |
|---------|---------------|
| SQL Injection Prevention | Parameterized queries using placeholders |
| Input Validation | express-validator middleware |
| Duplicate Email Protection | UNIQUE constraint |
| Required Field Validation | NOT NULL constraint |
| Age Validation | CHECK constraint (Age >= 18) |

---

# DecodeLabs 4 Pillars

| Pillar | Purpose | Code Location |
|--------|---------|--------------|
| Pillar 1 — Blueprint | Database structure and planning | `sql/schema.sql` |
| Pillar 2 — Bridge | Database connection and integration | `src/config/db.js` |
| Pillar 3 — Action | CRUD operations and REST APIs | `src/controllers/` + `src/routes/` |
| Pillar 4 — Shield | Security and validation | `src/middleware/validate.js` |

---

# CRUD Mapping

| CRUD | HTTP Method | SQL Command |
|------|-------------|-------------|
| Create | POST | INSERT |
| Read | GET | SELECT |
| Update | PUT | UPDATE |
| Delete | DELETE | DELETE |

---

# Technology Stack

- **Runtime:** Node.js

- **Framework:** Express.js

- **Database:** MySQL

- **Driver:** mysql2  
  (Native MySQL driver without ORM)

---

# Author

Aakansha

---

Built for DecodeLabs Industrial Training Kit — Batch 2026
