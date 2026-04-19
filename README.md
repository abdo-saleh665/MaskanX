# MaskanX — Next-Generation Property Platform 🏗️

![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-6-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

> **Advanced Web Programming (AWP) — Course Project**  
> Faculty of Computers and Information, New Mansoura University

---

## 📋 Table of Contents

- [Overview](#-overview)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Installation & Setup](#️-installation--setup)
- [Environment Configuration](#-environment-configuration)
- [Running the Project](#-running-the-project)
- [Security Implementation](#-security-implementation)
- [Team Members](#-team-members)
- [License](#-license)

---

## 🌟 Overview

**MaskanX** is a full-stack real estate platform built as a course project for the Advanced Web Programming (AWP) module. The platform enables users to browse, list, buy, and sell properties through a modern responsive interface backed by a robust RESTful API.

The project demonstrates proficiency in:
- **Frontend**: React 18 + Next.js 14 with TypeScript, responsive design, and state management
- **Backend**: Node.js/Express REST API with Sequelize ORM and PostgreSQL
- **Security**: JWT-based authentication, password hashing with bcrypt, and role-based access
- **Architecture**: Clean MVC separation between frontend and backend layers

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                      │
│              React 18 + Next.js 14 (SSR)                │
│         TypeScript / Redux Toolkit / Axios              │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP/REST (JSON)
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  API SERVER (:5000)                       │
│              Node.js + Express.js                        │
│     ┌────────────┬──────────────┬──────────────┐        │
│     │ Auth       │ Profile      │ Property     │        │
│     │ Controller │ Routes       │ Routes       │        │
│     └─────┬──────┴──────┬───────┴──────┬───────┘        │
│           │  JWT Middleware (verify)    │                │
│     ┌─────▼─────────────▼──────────────▼───────┐        │
│     │           Sequelize ORM (v6)              │        │
│     └─────────────────┬────────────────────────┘        │
└───────────────────────┬─────────────────────────────────┘
                        │ TCP/5432
                        ▼
              ┌──────────────────┐
              │   PostgreSQL DB   │
              │   (users table)   │
              └──────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.x | UI component library |
| Next.js | 14.0.4 | SSR framework & routing |
| TypeScript | 5.x | Type safety |
| Redux Toolkit | 2.x | Global state management |
| Axios | 1.8.x | HTTP client for API calls |
| SCSS / Bootstrap | 5.3.x | Styling & responsive grid |
| Framer Motion | — | Animations |
| React Hook Form + Yup | — | Form validation |

### Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18+ | Runtime environment |
| Express.js | 4.21.x | REST API framework |
| Sequelize | 6.37.x | ORM for PostgreSQL |
| PostgreSQL | 14+ | Relational database |
| JWT | 9.x | Token-based authentication |
| bcryptjs | 3.x | Password hashing (10 salt rounds) |
| dotenv | 16.x | Environment configuration |
| CORS | 2.8.x | Cross-origin resource sharing |

---

## 🎯 Features

### User-Facing
- 🏠 **Property Listings** — Browse, search, and filter properties with multiple view layouts
- 🔍 **Advanced Search** — 35+ filters including price range, location, and property type
- 📊 **User Dashboard** — Manage listings, favourites, saved searches, and account settings
- 📝 **Property CRUD** — Add, update, and delete property listings
- 🔒 **Authentication** — Secure signup/login with JWT tokens
- 👤 **Profile Management** — Edit personal details and change password
- 📱 **Fully Responsive** — Optimized for desktop, tablet, and mobile

### Technical
- 🔐 **JWT Authentication** with environment-configured secrets
- 🛡️ **Password Hashing** using bcryptjs with configurable salt rounds
- 📡 **RESTful API** following standard HTTP methods and status codes
- 🗄️ **Sequelize ORM** with model-based database management
- ⚡ **Server-Side Rendering** via Next.js 14 for SEO optimization

---

## 📂 Project Structure

```
MaskanX/
├── public/                    # Static assets (images, icons, fonts)
├── src/                       # Frontend source code
│   ├── app/                   # Next.js App Router pages
│   │   ├── dashboard/         # User dashboard pages
│   │   ├── listing_*/         # Property listing variants
│   │   ├── listing_details_*/ # Property detail views
│   │   ├── contact/           # Contact page
│   │   └── layout.tsx         # Root layout with meta tags
│   ├── components/            # Reusable React components
│   │   ├── dashboard/         # Dashboard UI components
│   │   ├── homes/             # Homepage sections
│   │   ├── inner-listing/     # Listing page components
│   │   ├── forms/             # Form components
│   │   └── common/            # Shared UI elements
│   ├── data/                  # Static data & constants
│   ├── hooks/                 # Custom React hooks
│   ├── layouts/               # Header & footer layouts
│   ├── modals/                # Modal/overlay components
│   ├── redux/                 # Redux store & slices
│   ├── styles/                # SCSS stylesheets
│   ├── types/                 # TypeScript type definitions
│   ├── ui/                    # Base UI primitives
│   └── utils/                 # Utility functions & API client
│
├── real-estate-backend/       # Backend API server
│   └── src/
│       ├── config/            # Database configuration
│       ├── controllers/       # Request handlers (MVC)
│       ├── middleware/        # Auth middleware (JWT verify)
│       ├── models/            # Sequelize data models
│       ├── routes/            # Express route definitions
│       ├── app.ts             # Express app setup
│       └── server.ts          # Server entry point
│
├── package.json               # Frontend dependencies
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

---

## 🗄️ Database Schema

### Users Table

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| `id` | INTEGER | PK, AUTO_INCREMENT | User identifier |
| `name` | STRING | NOT NULL | Display name |
| `email` | STRING | NOT NULL, UNIQUE | Login email |
| `password` | STRING | NOT NULL | Hashed password (bcrypt) |
| `termsAccepted` | BOOLEAN | NOT NULL | Terms agreement flag |
| `firstName` | STRING | NULLABLE | First name |
| `lastName` | STRING | NULLABLE | Last name |
| `phoneNumber` | STRING | NULLABLE | Contact phone |
| `about` | TEXT | NULLABLE | Bio/description |
| `createdAt` | TIMESTAMP | AUTO | Record creation time |
| `updatedAt` | TIMESTAMP | AUTO | Last update time |

---

## 📡 API Documentation

**Base URL:** `http://localhost:5000/api`

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `POST` | `/auth/signup` | Register new user | ❌ |
| `POST` | `/auth/login` | Authenticate & receive JWT | ❌ |

### Protected Routes (`/api`) — Require `Authorization: Bearer <token>`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/profile` | Fetch authenticated user's profile | ✅ |
| `PUT` | `/profile` | Update profile details | ✅ |

### Request/Response Examples

#### POST `/api/auth/signup`
```json
// Request Body
{
  "name": "Ahmed Mohamed",
  "email": "ahmed@example.com",
  "password": "SecurePass123!",
  "termsAccepted": true
}

// Response (201 Created)
{
  "message": "User created successfully!",
  "user": { "id": 1, "name": "Ahmed Mohamed", "email": "ahmed@example.com" }
}
```

#### POST `/api/auth/login`
```json
// Request Body
{
  "email": "ahmed@example.com",
  "password": "SecurePass123!"
}

// Response (200 OK)
{
  "message": "Login successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### GET `/api/profile`
```
Headers: Authorization: Bearer <JWT_TOKEN>

// Response (200 OK)
{
  "name": "Ahmed Mohamed",
  "email": "ahmed@example.com",
  "firstName": "Ahmed",
  "lastName": "Mohamed",
  "phoneNumber": "+201234567890",
  "about": "Real estate enthusiast."
}
```

---

## ⚙️ Installation & Setup

### Prerequisites

| Requirement | Version |
|------------|---------|
| Node.js | 18.x or later |
| npm | 9.x or later |
| PostgreSQL | 14.x or later |

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd MaskanX
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd real-estate-backend
npm install
cd ..
```

### 3. Setup PostgreSQL Database
```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create the database
CREATE DATABASE maskanx_db;
```

---

## 🔧 Environment Configuration

### Backend (`real-estate-backend/.env`)
```env
PORT=5000
DB_NAME=maskanx_db
DB_USER=postgres
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key_here
```

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🚀 Running the Project

```bash
# Terminal 1 — Start Backend Server
cd real-estate-backend
npm run dev
# Server runs on http://localhost:5000

# Terminal 2 — Start Frontend
npm run dev
# App opens on http://localhost:3000
```

---

## 🔐 Security Implementation

| Feature | Implementation |
|---------|---------------|
| Password Storage | bcryptjs with 10 salt rounds — never stored in plaintext |
| Authentication | JWT tokens with 1-hour expiry, stored client-side |
| Secret Management | All secrets via `.env` files (excluded from version control) |
| Route Protection | Custom `authenticateUser` middleware validates JWT on protected routes |
| Input Validation | Request body validation before database operations |
| CORS | Configured for cross-origin API access |

---

## 👥 Team Members

| Name | Role | Contact |
|------|------|---------|
| **Abdelrahman Yousry Saleh** | Full-Stack Developer | abdo.saleh2399@gmail.com |

> **Course:** Advanced Web Programming (AWP)  
> **University:** New Mansoura University  
> **Faculty:** Faculty of Computers and Information

---

## 📜 License

This project is developed for academic purposes as part of the AWP course at New Mansoura University.

Licensed under the [MIT License](LICENSE).
