# CivicPulse — Server

Express.js REST API for CivicPulse. Handles authentication, complaint management, file uploads, and role-based access for four user types: Citizen, Officer, Admin, and SuperAdmin.

**Deployed on:** Render (Node.js web service + PM2)
**Database:** MongoDB Atlas
**Storage:** Cloudinary

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Authentication](#authentication)
- [File Upload](#file-upload)
- [PM2 Process Management](#pm2-process-management)
- [Docker](#docker)
- [Deployment (Render)](#deployment-render)

---

## Tech Stack

| Package | Version | Purpose |
|---|---|---|
| Node.js | 20.x | Runtime |
| Express | 4.18.2 | Web framework |
| Mongoose | 8.0.4 | MongoDB ODM |
| jsonwebtoken | 9.0.2 | JWT authentication |
| bcryptjs | 2.4.3 | Password hashing |
| Cloudinary | 2.9.0 | Image storage |
| Multer | 2.0.2 | File upload middleware |
| PM2 | 5.4.3 | Production process manager |
| cookie-parser | 1.4.7 | Cookie parsing |
| cors | 2.8.6 | Cross-origin resource sharing |
| csv-stringify | 6.6.0 | CSV report export |
| dotenv | 16.4.5 | Environment variables |

---

## Project Structure

```
server/
├── config/
│   ├── cloudinary.js          # Cloudinary SDK init
│   └── db.js                  # MongoDB connection (pooled)
├── controllers/
│   ├── admin/                 # Admin business logic
│   ├── citizen/               # Citizen business logic
│   ├── general/               # Auth, complaints, categories, settings
│   ├── officer/               # Officer business logic
│   └── superAdmin/            # SuperAdmin business logic
├── middleware/
│   ├── authMiddleware.js      # JWT protect + role authorize
│   ├── errorMiddleware.js     # 404 + global error handler
│   ├── superAdminAccessMiddleware.js  # x-admin-access-code header check
│   └── uploadMiddleware.js    # Multer (memory storage, 10 MB, 5 files)
├── models/
│   ├── admin/Admin.js
│   ├── citizen/Citizen.js
│   ├── general/               # User, Complaint, Department, Category, Counter, Setting
│   ├── officer/Officer.js
│   └── superAdmin/            # SuperAdmin, Zone
├── routes/
│   ├── admin/
│   ├── citizen/
│   ├── general/               # auth, complaints, categories, users, settings
│   ├── officer/
│   └── superAdmin/            # auth, profile, departments, zones
├── scripts/
│   └── migrateTimeline.js     # One-off migration — run manually via npm run migrate:timeline
├── utils/
│   ├── authHelper.js          # authenticateUser(), setCookieToken()
│   ├── cloudinaryHelper.js    # stream upload to Cloudinary
│   ├── generateEmployeeId.js  # atomic sequential IDs (CZ/OF/AD/SA-XXXXXX)
│   ├── generateToken.js       # JWT sign
│   ├── queryHelper.js         # pagination + filter + sort builders
│   ├── userHelper.js          # shared user lookup helpers
│   └── validationHelper.js    # input validation
├── ecosystem.config.js        # PM2 config (autorestart, memory limit, logging)
├── nodemon.json               # Dev hot-reload config
├── Dockerfile                 # Production Docker image
├── .dockerignore
├── .env.example
├── .gitignore
├── package.json
└── server.js                  # Entry point
```

---

## Getting Started

### Prerequisites

- Node.js 20+ (use `nvm use` at the repo root)
- MongoDB Atlas URI **or** run the Docker stack from the repo root (`make docker-up`)
- Cloudinary account

### Install

```bash
npm install
cp .env.example .env
# Fill in .env — see Environment Variables below
```

### Run (development)

```bash
npm run server    # nodemon with hot-reload
```

API available at `http://localhost:8080`

---

## Scripts

| Script | Command | Description |
|---|---|---|
| `start` | `npm start` | Production start via PM2 (`pm2-runtime`) |
| `server` | `npm run server` | Development start via nodemon |
| `migrate:timeline` | `npm run migrate:timeline` | One-off timeline data migration |

> **Note:** `start` uses `pm2-runtime` — do not run this for local development. Use `npm run server` instead.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in all values:

```env
NODE_ENV=development
PORT=8080

# MongoDB
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net
MONGO_DB_NAME=CivicPulse

# Auth
JWT_SECRET=<long-random-string-min-32-chars>

# CORS — must match the exact client origin (no trailing slash)
FRONTEND_URL=http://localhost:3000

# Cloudinary
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>

# SuperAdmin portal access code — must match client REACT_APP_SUPERADMIN_ACCESS_CODE
SUPERADMIN_ACCESS_CODE=<strong-random-code>
```

---

## API Endpoints

### Health

```http
GET  /health        # Returns { status: "ok" } — used by Render and keep-alive cron
```

### Auth — Citizens

```http
POST  /api/citizens/register        # Self-register (returns token)
POST  /api/citizens/login           # Login (returns token)
```

### Auth — Officers / Admins

```http
POST  /api/auth/login               # Login (all roles)
GET   /api/auth/me                  # Get current user (requires token)
POST  /api/auth/logout              # Logout (clears cookie)
```

### Auth — SuperAdmin

```http
POST  /api/superadmin/verify-access # Validate x-admin-access-code header
POST  /api/superadmin/register      # Register (requires access code header)
POST  /api/superadmin/login         # Login
```

### Complaints — Citizen

```http
GET    /api/citizens/complaints          # My complaints (paginated)
POST   /api/citizens/complaints          # Create complaint (multipart/form-data)
GET    /api/citizens/complaints/:id      # Complaint detail
PUT    /api/citizens/complaints/:id      # Edit complaint
DELETE /api/citizens/complaints/:id      # Delete complaint
GET    /api/citizens/nearby              # Nearby complaints (geo query)
POST   /api/citizens/feedback/:id        # Submit resolution feedback
GET    /api/citizens/dashboard           # Dashboard stats
```

### Complaints — Officer

```http
GET   /api/officer/tasks                        # Assigned tasks (paginated)
GET   /api/officer/tasks/:id                    # Task detail
POST  /api/officer/tasks/:id/progress           # Post progress update + images
GET   /api/officer/work-history                 # Completed task history
GET   /api/officer/dashboard                    # Dashboard stats
GET   /api/officer/stats                        # Performance statistics
```

### Complaints — Admin

```http
GET   /api/admin/complaints                     # Department complaints (filtered)
GET   /api/admin/complaints/:id                 # Complaint detail
POST  /api/admin/complaints/:id/assign          # Assign to officer
PUT   /api/admin/complaints/:id/reassign        # Reassign with reason
PUT   /api/admin/complaints/:id/due-date        # Update due date
PUT   /api/admin/complaints/:id/assignment      # Edit assignment
POST  /api/admin/complaints/:id/verify          # Mark as verified
GET   /api/admin/escalations                    # Overdue / escalated list
GET   /api/admin/reports                        # Department report
GET   /api/admin/dashboard                      # Dashboard stats
```

### Complaints — SuperAdmin

```http
GET   /api/superadmin/complaints                # All complaints (filtered)
GET   /api/superadmin/complaints/:id            # Complaint detail
POST  /api/superadmin/complaints/:id/assign     # Assign complaint
PUT   /api/superadmin/complaints/:id/reassign   # Reassign complaint
POST  /api/superadmin/complaints/:id/verify     # Verify resolution
```

### Officers (Admin manages)

```http
GET    /api/admin/officers          # Department officers
POST   /api/admin/officers          # Create officer
PUT    /api/admin/officers/:id      # Update officer
DELETE /api/admin/officers/:id      # Delete officer
```

### User Management (SuperAdmin)

```http
GET    /api/superadmin/users        # All users
POST   /api/superadmin/users        # Create user
PUT    /api/superadmin/users/:id    # Update user
DELETE /api/superadmin/users/:id    # Delete user
```

### Profiles

```http
GET  /api/admin/me            # Admin profile
PUT  /api/admin/profile       # Update admin profile
GET  /api/officer/me          # Officer profile
PUT  /api/officer/profile     # Update officer profile
GET  /api/superadmin/me       # SuperAdmin profile
PUT  /api/superadmin/profile  # Update SuperAdmin profile
```

### Departments

```http
GET    /api/departments         # All departments
POST   /api/departments         # Create
PUT    /api/departments/:id     # Update
DELETE /api/departments/:id     # Delete
```

### Zones

```http
GET    /api/superadmin/zones    # All zones (GeoJSON)
POST   /api/superadmin/zones    # Create zone
PUT    /api/superadmin/zones/:id   # Update zone
DELETE /api/superadmin/zones/:id   # Delete zone
```

### Categories

```http
GET    /api/categories          # All categories
POST   /api/categories          # Create
PUT    /api/categories/:id      # Update
DELETE /api/categories/:id      # Delete
```

### Settings

```http
GET  /api/settings              # All settings
GET  /api/settings/:key         # Single setting
PUT  /api/settings/:key         # Update setting
```

### Reports

```http
GET  /api/superadmin/reports            # Global reports (JSON)
GET  /api/superadmin/reports/export     # CSV export
GET  /api/superadmin/monitoring         # System monitoring stats
GET  /api/admin/profile/stats           # Admin profile statistics
```

---

## Database Models

### Complaint

```js
{
  title, description, category, severity,   // low | medium | high | critical
  status,                                    // pending | assigned | in_progress | resolved | closed
  citizen: ObjectId,
  department: ObjectId,
  assignedTo: ObjectId,
  location: { type: 'Point', coordinates: [lng, lat], address },
  images: [String],                          // Cloudinary URLs
  dueDate, resolutionDate, resolutionDetails,
  feedback: { rating, comment, submittedAt },
  timeline: [{ eventType, status, description, updatedBy, updatedByModel, metadata, date }],
  progressUpdates: [{ status, remarks, images, updatedBy, createdAt }],
  reassignmentHistory: [{ fromOfficer, toOfficer, reason, newDueDate, reassignedBy, reassignedAt }]
}
```

### User roles

Each role has its own model with `employeeId` (`CZ/OF/AD/SA-XXXXXX`), `name`, `email`, `password` (bcrypt), `phone`, and role-specific fields (`department`, `zone`). A shared `User` model stores `{ email, role }` for JWT resolution.

### Counter

```js
{ _id: 'citizen' | 'officer' | 'admin' | 'superAdmin', seq: Number }
```

Used by `generateEmployeeId.js` with `findOneAndUpdate + $inc` for atomic, thread-safe ID increments.

### Zone

```js
{ name, description, location: { type: 'Polygon', coordinates: [[[lng, lat]]] }, isActive }
```

---

## Authentication

Tokens are issued as JWTs (HS256, 30-day expiry). The client stores the token in `localStorage` / `sessionStorage` and sends it as `Authorization: Bearer <token>` on every request.

`authMiddleware.js` checks the Bearer header first, then falls back to the `token` HttpOnly cookie.

The cookie is set with `SameSite: none` + `Secure: true` in production so it works across Vercel ↔ Render domains.

### Role protection

```js
router.get('/resource', protect, authorize(['admin', 'superAdmin']), handler)
```

- `protect` — verifies JWT, attaches full user object to `req.user`
- `authorize(roles)` — checks `req.user.role` against the allowed list

---

## File Upload

- Middleware: `multer` with `memoryStorage` (no temp files on disk)
- Allowed types: JPEG, PNG, WebP
- Max file size: 10 MB per file
- Max files per request: 5
- After Multer, `cloudinaryHelper.js` streams each buffer directly to Cloudinary

---

## PM2 Process Management

Production start (`npm start`) uses `pm2-runtime` with `ecosystem.config.js`:

| Setting | Value | Reason |
|---|---|---|
| `exec_mode` | `fork` | Single instance, fits Render free tier (512 MB) |
| `autorestart` | `true` | Restarts immediately on crash |
| `max_memory_restart` | `450 MB` | Restarts before hitting Render's 512 MB OOM limit |
| `exp_backoff_restart_delay` | `100 ms` | Exponential back-off prevents rapid restart loops |
| `max_restarts` | `10` | Caps restarts to avoid infinite loops |
| Logs | `/dev/stdout` + `/dev/stderr` | Render's log viewer captures them |

Local dev uses `nodemon` via `npm run server` — PM2 is not involved.

---

## Docker

### Build and run manually

```bash
# From the server/ directory:
docker build -t civicpulse-api .
docker run -p 8080:8080 --env-file .env civicpulse-api
```

### Local dev stack (recommended)

Use the `docker-compose.yml` at the repo root — it starts MongoDB + the API with hot-reload:

```bash
# From repo root:
make docker-up    # MongoDB (:27017) + API (:8080)
make docker-down  # stop
make docker-logs  # tail
```

The compose file mounts `./server` as a volume so code changes are reflected immediately.

---

## Deployment (Render)

### Manual setup

1. Create a **Web Service** → connect repo → set root dir to `server`
2. **Build command:** `npm install`
3. **Start command:** `npm start`
4. **Health check path:** `/health`
5. Add all environment variables from `.env.example` in the Render dashboard

### Via Blueprint (`render.yaml`)

The `render.yaml` at the repo root defines the service. Connecting the repo to Render and choosing **Blueprint** will pre-fill build/start commands and list required env vars.

### Data migration (one-time)

After the first deploy, run the timeline migration from your local machine:

```bash
cd server && npm run migrate:timeline
```

This only needs to run once to fix any pre-existing records with invalid timeline entries.
