# Event Registration & Attendance Management System

![Oracle](https://img.shields.io/badge/Database-Oracle%2021c-red)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![React](https://img.shields.io/badge/Frontend-React-blue)

A full-stack web application for managing university events, built as a Database Systems mini project. It supports event discovery, ticket-based registration, payment processing, attendance tracking, and feedback collection — with a role-based admin portal for oversight.

---

# Quick Start

```bash
# Terminal 1 — Backend
cd IMPLEMENTATION/backend
npm install
node server.js

# Terminal 2 — Frontend
cd IMPLEMENTATION/event-frontend
npm install
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:5000

**Database prerequisite:** Oracle Database XE 21c running on:

```text
localhost:1521/XEPDB1
```

---

## Architecture Overview

```text
React Frontend
     ↓ REST API
Node.js + Express Backend
     ↓ SQL Queries
Oracle Database (21c XE)
```

---

# Project Structure

```text
dbs-mini-proj-main/
├── DATABASE_DESIGN/
│   ├── 01_schema_and_data.sql      # Full Oracle DB schema + seed data
│   ├── erdiagram.png               # Entity-Relationship diagram
│   ├── structure of table.png      # Table structure reference
│   └── DBSL_MiniProj.pdf           # Project report/documentation
└── IMPLEMENTATION/
    ├── backend/                    # Node.js + Express REST API
    │   ├── server.js               # Main server file (all API routes)
    │   └── package.json
    └── event-frontend/             # React + Vite frontend
        ├── src/
        │   ├── pages/              # Page-level components
        │   ├── components/         # Reusable UI components
        │   ├── context/            # Auth context
        │   ├── services/api.js     # Axios API client
        │   └── mock/dummyData.js   # Fallback mock data
        └── package.json
```

---

# Tech Stack

| Layer | Technology |
|------|------------|
| Database | Oracle Database XE 21c, SQL |
| Backend | Node.js, Express.js, oracledb |
| Frontend | React, Vite, Tailwind CSS, Axios |
| Routing | React Router DOM |

---

# Database Schema

The Oracle database includes the following relational tables:

- **Role** — Five roles: Admin, Organizer, Student, Volunteer, Faculty
- **Users** — All system users linked to a role
- **Venue** — Event venues with building name and capacity
- **Event_Category** — Categories for event classification
- **Event** — Core event records
- **Ticket_Type** — Tiered ticket options per event
- **Event_Session** — Sessions within events
- **Registration** — User registrations with status tracking
- **Attendance** — Per-session attendance records
- **Payment** — Payment records linked to registrations
- **Feedback** — Ratings and comments from attendees

---

# Features

## User Portal

- Browse all upcoming events
- View event details including ticket options
- Register for events
- Process payments
- View personal dashboard (registrations + attendance)
- Submit event feedback and ratings

## Admin Portal *(Role ID = 1)*

- Dashboard with aggregate statistics
- Create and manage events
- Manage user accounts
- Monitor registrations, payments, attendance and feedback

---

# Getting Started

## Prerequisites

Install:

- Node.js (v18+)
- Oracle Database XE (21c)
- Oracle service name configured as:

```text
XEPDB1
```

---

## 1. Set Up Database

Connect to Oracle:

```bash
sqlplus system/your_password@localhost:1521/XEPDB1
```

Run the schema file:

```sql
@DATABASE_DESIGN/01_schema_and_data.sql
```

### Windows Example

```bash
sqlplus system/your_password@localhost:1521/XEPDB1
@C:\path\to\DATABASE_DESIGN\01_schema_and_data.sql
```

This creates all tables and inserts sample data.

---

## 2. Start Backend

```bash
cd IMPLEMENTATION/backend
npm install
node server.js
```

Backend runs at:

```text
http://localhost:5000
```

### Database Configuration

Database credentials are currently defined in `server.js`:

```js
const dbConfig = {
  user: "system",
  password: "your_password",
  connectString: "localhost:1521/XEPDB1"
};
```

Update if your Oracle configuration differs.

---

## 3. Start Frontend

```bash
cd IMPLEMENTATION/event-frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# API Endpoints

## Public APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/login` | Authenticate user |
| POST | `/register` | Register new user |
| GET | `/events` | List all events |
| GET | `/events/:eventId` | Event details |
| POST | `/events/:eventId/register` | Register for event |
| POST | `/payment` | Process payment |
| POST | `/feedback` | Submit feedback |
| GET | `/users/:userId/registrations` | User registrations |
| GET | `/users/:userId/attendance` | Attendance records |

---

## Admin APIs *(requires `?userId=<adminId>`)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/events` | View all events |
| POST | `/admin/events` | Create event |
| GET | `/admin/registrations` | View registrations |
| GET | `/admin/payments` | View payments |
| GET | `/admin/feedback` | View feedback |
| GET | `/admin/attendance` | View attendance |
| GET | `/admin/stats` | Dashboard stats |
| GET | `/users` | List users |
| POST | `/users` | Add user |

---

# Default Login Credentials

Seeded sample accounts:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@university.edu | admin@123 |
| Organizer | ramesh.kumar@university.edu | org@123 |
| Student | rohan.singh@student.edu | pass@123 |
| Volunteer | sanjay.rao@student.edu | vol@123 |

---

# Known Issues & Notes

- For demonstration purposes, passwords are stored **unhashed** (production systems should use bcrypt or similar).
- No JWT/session tokens are implemented; admin authorization is validated via role checks in database queries.
- `mock/dummyData.js` serves as fallback data when backend is unavailable.
- `oracledb` appears as a frontend dependency but is unused client-side and can be removed.
- Backend `package.json` includes conflicting `type` values; working configuration is `commonjs`.

---

# Future Improvements

Possible enhancements:

- JWT authentication and role-based authorization
- Password hashing with bcrypt
- QR-code based attendance check-in
- Email notifications for event reminders
- Payment gateway integration
- Dockerized deployment
- Analytics dashboards and reporting

---

# ER Diagram

Available at:

```text
DATABASE_DESIGN/erdiagram.png
```

---

# Notes for Evaluators

This project was developed as part of a **Database Systems Lab mini project**, with emphasis on:

- Relational schema design
- SQL query implementation
- Full-stack database integration
- Transaction-oriented event management workflows

---

Built as part of a Database Systems Laboratory Mini Project.

