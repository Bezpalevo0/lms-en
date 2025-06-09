# LMS Platform

---

## 🌟 Project Description

Strapi + Astro LMS is a scalable and reliable online platform for delivering educational courses, allowing user progress
tracking and convenient content management via an admin panel.

---

## 📊 Tech Stack

### Frontend

- **Astro JS** — static generation, high performance, SEO-friendly
- **Vue.js** — interactive components within Astro
- **Tailwind CSS** — fast styling without custom CSS
- **Nanostores** — minimalist, reactive state management

### Backend

- **Strapi CMS** — headless CMS with REST and GraphQL support
- **PostgreSQL** — reliable and high-performance database
- **S3 Storage** — media content storage

### DevOps

- **Docker** — environment isolation, simplified deployment and CI/CD
- **nginx** — handles HTTP requests and forwards them to Astro/Strapi

---

## 🛋️ System Architecture

- Frontend (Astro + Vue) ↔ Backend (Strapi CMS)
- All components containerized with Docker
- Static and media content stored in S3

---

## 👨‍👩‍👦 Main User Roles

- **User** — registration, course participation, progress tracking
- **Content Manager** — manages courses and lessons
- **Administrator** — manages users and platform settings

---

## 🔧 Core Functionality

### User Interface

- Registration and authentication
- Viewing and completing courses (video, text, interactive)
- Personal dashboard with progress history
- Progress display (e.g., "Completed 2 out of 5 lessons")

### Admin Panel (Strapi)

- CRUD operations for courses and lessons
- User management
- Course categorization
- Statistics: user count, site visits

---

## 🛡️ Security

- JWT authentication
- Role-based access control
- Password hashing (bcrypt)
- CORS configuration
- Database backups

---

## 📂 Local Setup

### Requirements

- Node.js >= 18
- Docker

### Running Containers

```bash
docker-compose up
```

### Links

- Frontend: [http://localhost:80](http://localhost:80)
- Strapi Admin: [http://localhost:80/admin](http://localhost:80/admin)

---

## Production

```
docker-compose -f docker-compose.yml --env-file .env.production up --build
```

```
# .env.production

# ---------------------------------- Postgres -----------------------------------
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_DB=lms
POSTGRES_USER=admin
POSTGRES_PASSWORD=1234
POSTGRES_SSL=false

# ---------------------------------- Storage -----------------------------------
# AWS S3
AWS_URL=https://your-bucket-name.s3.your-aws-region.amazonaws.com
AWS_ACCESS_KEY_ID=your-IAM-user-access-id
AWS_SECRET_ACCESS_KEY=your-IAM-user-access-secret
AWS_BUCKET_NAME=your-bucket-name
AWS_REGION=your-aws-region

# ----------------------------------- Strapi -----------------------------------
# astro url inside docker
FRONTEND_URL=http://astro:4321

# Server
HOST=0.0.0.0
PORT=1337

# Secrets
APP_KEYS=tobemodified,tobemodified,tobemodified,tobemodified
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
ENCRYPTION_KEY=tobemodified
# also use for astro
JWT_SECRET=tobemodified

# ------------------------------------ Astro -----------------------------------
ASTRO_HOST_URL=https://docker-lms-as.com
# strapi url inside docker
STRAPI_API_URL=http://strapi:1337

```
