# 🏆 World Cup Voting Platform

A production-ready World Cup voting application built to demonstrate core Cloud/DevOps engineering skills including containerization, reverse proxy configuration, role-based access control, and cloud deployment on AWS EC2.

---

## 🌐 Live Demo
> Deployed on AWS EC2 — `http://<ec2-public-ip>`

---

## 🏗️ Architecture

```
Internet
    ↓
Nginx Container (port 80)
    ├── Rate limiting (10 req/s)
    ├── Admin IP restriction
    └── Reverse proxy
            ↓
    Node.js Container (port 4000, internal)
            ↓
    MongoDB Atlas (cloud-managed database)
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla React (CDN), HTML5 |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| Auth | JWT + bcrypt |
| Containerization | Docker + Docker Compose |
| Reverse Proxy | Nginx |
| Process Manager | PM2 |
| Cloud | AWS EC2 (Ubuntu 22.04) |

---

## 🔐 Security Features

- **JWT Authentication** — stateless token-based auth with 1 day expiry
- **bcrypt Password Hashing** — salted hashing for stored passwords
- **Role-Based Access Control (RBAC)** — admin vs user role separation
- **Data Over-Exposure Prevention** — users cannot see each other's votes (OWASP API3)
- **Admin Route Protection** — middleware blocks non-admin JWT tokens
- **Nginx IP Restriction** — `/admin.html` restricted to authorised IPs only
- **Rate Limiting** — login endpoint limited to 10 attempts per 15 minutes
- **Environment Variables** — secrets never hardcoded or committed to Git

---

## 🐳 DevOps Concepts Demonstrated

- Multi-container orchestration with Docker Compose
- Nginx reverse proxy with rate limiting and IP restriction
- Container networking — internal DNS (`web-node:4000`)
- Volume mounting for externalised configuration
- Health checks and container dependency management
- Environment variable injection at runtime (12-Factor App)
- `.dockerignore` for lean, secure images
- Git-based deployment workflow (GitOps)
- AWS EC2 provisioning and Security Group configuration

---

## 📁 Project Structure

```
world-cup-voting/
├── docker-compose.yml        # Orchestrates all containers
├── nginx/
│   └── nginx.conf            # Reverse proxy + rate limiting + IP restriction
├── .gitignore
├── README.md
└── server_folder/
    ├── Dockerfile            # Node.js app image
    ├── .dockerignore
    ├── server.js             # Express app entry point
    ├── seed.js               # Database seeding script
    ├── package.json
    ├── models/
    │   ├── User.js           # User schema (username, password, role, votes)
    │   └── Country.js        # Country schema (name, votes)
    ├── routes/
    │   ├── auth.js           # Register + Login routes
    │   └── vote.js           # Countries, voting, leaderboard, admin routes
    ├── middleware/
    │   ├── auth.js           # JWT verification middleware
    │   └── admin.js          # Admin role verification middleware
    └── public/
        ├── index.html        # User voting app (React)
        └── admin.html        # Admin dashboard (React)
```

---

## 🚀 Local Development

### Prerequisites
- Docker + Docker Compose
- MongoDB Atlas account (free M0 tier)
- Node.js 18+ (for running outside Docker)

### Setup

**1. Clone the repo:**
```bash
git clone https://github.com/your-username/world-cup-voting.git
cd world-cup-voting
```

**2. Create `.env` in `server_folder/`:**
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/worldcup_voting
PORT=4000
JWT_SECRET=your_secret_key_here
```

**3. Build and start containers:**
```bash
docker compose up -d
```

**4. Seed the database:**
```bash
docker compose exec web-node node seed.js
```

**5. Access the app:**
```
http://localhost        → User voting app
http://localhost/admin.html  → Admin dashboard (restricted)
```

---

## 👑 Setting Up Admin Account

**1. Register an account on the app:**
```
http://localhost → Sign Up
```

**2. Elevate to admin in MongoDB:**
```bash
mongosh "your-atlas-connection-string"
use worldcup_voting
db.users.updateOne({ username: "your-username" }, { $set: { role: "admin" } })
```

**3. Login at `/admin.html` with your credentials.**

---

## ☁️ AWS EC2 Deployment

**1. Launch EC2 instance:**
```
AMI: Ubuntu 22.04 LTS
Instance type: t2.micro (free tier)
Security Group inbound rules:
  port 22  → your IP only (SSH)
  port 80  → anywhere (HTTP)
  port 443 → anywhere (HTTPS)
```

**2. SSH into EC2 and install Docker:**
```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin
sudo systemctl enable docker
sudo usermod -aG docker ubuntu
newgrp docker
```

**3. Clone repo and configure:**
```bash
git clone https://github.com/your-username/world-cup-voting.git
cd world-cup-voting
# Create server_folder/.env with production values
```

**4. Deploy:**
```bash
docker compose up -d
docker compose exec web-node node seed.js
```

**5. App is live at:**
```
http://<ec2-public-ip>
```

---

## 📊 API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | None | Register new user |
| POST | `/api/auth/login` | None | Login + receive JWT |
| GET | `/api/countries` | User | Get all countries (no vote counts) |
| GET | `/api/my-votes` | User | Get current user's votes |
| POST | `/api/vote/:countryId` | User | Vote for a country (max 3) |
| GET | `/api/leaderboard` | User | Top 3 countries |
| GET | `/api/admin/results` | Admin | Full vote results |
| GET | `/api/admin/users` | Admin | All users and their votes |
| POST | `/api/admin/reset` | Admin | Reset all votes |

---

## 🗺️ DevOps Learning Roadmap

This project is part of a broader Cloud/DevOps learning path:

```
✅ Phase 1 — Full-stack REST API (Node.js + Express + MongoDB Atlas)
✅ Phase 2 — JWT authentication + bcrypt password hashing
✅ Phase 3 — Role-Based Access Control (RBAC)
✅ Phase 4 — Admin dashboard with live vote results
✅ Phase 5 — Docker containerization
✅ Phase 6 — Nginx reverse proxy + rate limiting + IP restriction
✅ Phase 7 — Docker Compose multi-container orchestration
✅ Phase 8 — Git version control + GitHub repo
✅ Phase 9 — AWS EC2 deployment
```

---
