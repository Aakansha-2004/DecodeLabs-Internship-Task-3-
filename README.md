# User Management System
### Full Stack Development | DecodeLabs Industrial Training Kit | Batch 2026

> **Persistence Phase: Database Integration**  
> Connect the backend with MySQL to store and retrieve user data with full CRUD support.

---

## Project Structure

```
user-management-system/
├── sql/
│   └── schema.sql              # Database schema + sample data
├── src/
│   ├── config/
│   │   └── db.js               # MySQL connection pool
│   ├── controllers/
│   │   └── userController.js   # All CRUD logic
│   ├── middleware/
│   │   └── validate.js         # Input validation + security
│   ├── routes/
│   │   └── userRoutes.js       # RESTful route mapping
│   └── index.js                # Express app entry point
├── .env.example                # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

---

##  Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/YOUR_USERNAME/user-management-system.git
cd user-management-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env
```
Edit `.env` and fill in your MySQL credentials:
```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=user_management_db
```

### 4. Setup the Database
Open MySQL and run:
```bash
mysql -u root -p < sql/schema.sql
```
Or paste the contents of `sql/schema.sql` in MySQL Workbench / phpMyAdmin.

### 5. Run the Server
```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

---

##  API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check + route list |
| POST | `/api/users` | Create a new user |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

---

##  API Examples (use Postman or Thunder Client)

###  Create User — POST /api/users
```json
{
  "name":  "Aarav Sharma",
  "email": "aarav@example.com",
  "age":   22,
  "role":  "user"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": { "id": 1, "name": "Aarav Sharma", "email": "aarav@example.com", "age": 22, "role": "user" }
}
```

---

###  Get All Users — GET /api/users
```
GET /api/users
GET /api/users?role=admin
GET /api/users?search=aarav
```

---

###  Get User by ID — GET /api/users/1
```
GET /api/users/1
```

---

###  Update User — PUT /api/users/1
```json
{
  "name": "Aarav Kumar",
  "age":  23
}
```

---

###  Delete User — DELETE /api/users/1
```
DELETE /api/users/1
```

---

##  Security Features (Pillar 4 — The Shield)

| Feature | Implementation |
|---------|---------------|
| SQL Injection Prevention | Parameterized queries (`?` placeholders) |
| Input Validation | `express-validator` on all routes |
| UNIQUE constraint | Duplicate email rejection (409) |
| NOT NULL constraint | Required fields enforced |
| CHECK constraint | Age >= 18 enforced at DB level |

---

##  The 4 Pillars (from DecodeLabs slides)

| Pillar | What | Where in Code |
|--------|------|---------------|
| 1 — Blueprint | Schema & Design | `sql/schema.sql` |
| 2 — Bridge | Integration & Connection | `src/config/db.js` |
| 3 — Action | CRUD & RESTful HTTP | `src/controllers/` + `src/routes/` |
| 4 — Shield | Integrity & Security | `src/middleware/validate.js` |

---

##  CRUD ↔ HTTP ↔ SQL Mapping

| CRUD | HTTP Method | SQL Command |
|------|-------------|-------------|
| Create | POST | INSERT |
| Read | GET | SELECT |
| Update | PUT | UPDATE |
| Delete | DELETE | DELETE |

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **Driver:** mysql2 (Native Driver — no ORM)


---
# Author
Aakansha


*Built with ❤️ for DecodeLabs Industrial Training Kit — Batch 2026*
