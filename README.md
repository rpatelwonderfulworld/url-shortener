# 🔗 URL Shortener App

A full-stack URL Shortener built with **NestJS + PostgreSQL + React (Vite)**.  
Includes authentication, analytics dashboard, and Docker-based deployment.

---

## 🚀 Features

- ✨ Shorten URLs with unique slugs  
- 🔐 JWT authentication (Login/Register)  
- 🧮 Click tracking + analytics dashboard  
- 📋 Copy-to-clipboard  
- 🧱 PostgreSQL database  
- 🐳 Dockerized setup for frontend & backend  

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React + Vite + TypeScript |
| Backend | NestJS + TypeORM + Node.js |
| Database | PostgreSQL |
| Auth | JWT |
| Charts | Recharts |
| Infra | Docker & Docker Compose |

---

## ⚙️ Local Development

### 1️⃣ Run backend manually
```bash
cd backend
npm install
npm run start:dev
Backend runs on → http://localhost:5000

2️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on → http://localhost:5173

🐳 Docker Setup (Recommended)

Run everything (frontend + backend + database) with a single command:

docker-compose up --build


Then open:
🌐 Frontend: http://localhost:3000

⚙️ Backend: http://localhost:5000

To stop containers:

docker-compose down

📊 Dashboard Preview

View total URLs, total clicks, top performing links, and trends — all in one place.

🧠 API Endpoints Overview
Method	Endpoint	Description
POST	/auth/register	Register a user
POST	/auth/login	Login and receive JWT token
POST	/url/shorten	Shorten a long URL
GET	/url	List URLs created by the user
GET	/:slug	Redirect to the original long URL
📁 Folder Structure
url-shortener/
 ├── backend/             # NestJS API
 │    ├── src/
 │    ├── Dockerfile
 │    └── ...
 ├── frontend/            # React (Vite) app
 │    ├── src/
 │    ├── Dockerfile
 │    └── ...
 ├── docker-compose.yml   # Multi-container setup
 └── README.md

⚙️ Environment Variables
Backend (backend/.env)
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=urlshortener
JWT_SECRET=supersecretkey

Frontend (frontend/.env)
VITE_API_URL=http://localhost:5000

🧑‍💻 Author

Roshni Patel
🌐 LinkedIn

💻 GitHub