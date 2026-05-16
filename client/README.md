# CivicPulse — Client

React 18 SPA for CivicPulse. Features a liquid glass UI (glassmorphism), Redux Toolkit state management, Leaflet maps, and role-based routing for four user types.

**Deployed on:** Vercel
**API:** CivicPulse server on Render

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Routes](#routes)
- [State Management](#state-management)
- [Styling System](#styling-system)
- [API Layer](#api-layer)
- [Deployment (Vercel)](#deployment-vercel)

---

## Tech Stack

| Package | Version | Purpose |
|---|---|---|
| React | 18.2.0 | UI framework |
| React Router DOM | 6.8.0 | Client-side routing |
| Redux Toolkit | 2.11.2 | State management |
| React Redux | 9.2.0 | Redux bindings |
| React Hook Form | 7.71.1 | Form state + validation |
| Styled Components | 6.3.8 | CSS-in-JS |
| Axios | 1.3.0 | HTTP client with interceptors |
| Leaflet | 1.9.3 | Interactive maps |
| React Leaflet | 4.2.0 | Leaflet React bindings |
| Framer Motion | 12.34.0 | Animations |
| React Toastify | 11.0.5 | Toast notifications |
| React Select | 5.10.2 | Enhanced dropdowns |
| Font Awesome | 7.1.0 | Icons |

---

## Project Structure

```
client/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.jsx                        # Root component — router + global styles
│   ├── index.js                       # React entry point
│   │
│   ├── Pages/                         # Route-level page components
│   │   ├── Home/                      # Public landing page
│   │   ├── AboutUs/
│   │   ├── Contact/
│   │   ├── Auth/
│   │   │   ├── Login/                 # citizenLogin, officerLogin, adminLogin, superAdminLogin
│   │   │   ├── Register/              # citizenRegister, superAdminRegister
│   │   │   └── roleSelection.jsx      # /login — role picker
│   │   ├── Citizen/
│   │   │   ├── Dashboard/
│   │   │   ├── ReportIssue/
│   │   │   ├── MyComplaints/
│   │   │   ├── EditComplaint/
│   │   │   ├── NearbyIssues/
│   │   │   ├── NearbyComplaintDetails/
│   │   │   ├── ResolutionFeedback/
│   │   │   └── Profile/
│   │   ├── Officer/
│   │   │   ├── Dashboard/
│   │   │   ├── AssignedTasks/
│   │   │   ├── UpdateStatus/
│   │   │   ├── CompleteTask/
│   │   │   ├── WorkHistory/
│   │   │   └── Profile/
│   │   ├── Admin/
│   │   │   ├── Dashboard/
│   │   │   ├── ComplaintManagement/
│   │   │   ├── AssignOfficer/
│   │   │   ├── OfficerManagement/
│   │   │   ├── Escalations/
│   │   │   ├── Reports/
│   │   │   └── Profile/
│   │   ├── SuperAdmin/
│   │   │   ├── Dashboard/
│   │   │   ├── ComplaintManagement/
│   │   │   ├── UserManagement/
│   │   │   ├── DepartmentManagement/
│   │   │   ├── ZoneManagement/
│   │   │   ├── GlobalReports/
│   │   │   ├── SystemMonitoring/
│   │   │   ├── Settings/
│   │   │   └── Profile/
│   │   ├── NotFound/                  # 404
│   │   └── Unauthorized/              # 403
│   │
│   ├── components/                    # Reusable UI components
│   │   ├── AccessGate/                # SuperAdmin access-code gate
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── ConfirmationModal/
│   │   ├── EditAssignmentModal/
│   │   ├── EditProfileModal/
│   │   ├── EmptyState/
│   │   ├── Filter/
│   │   ├── Forms/                     # Department + Zone forms
│   │   ├── Headers/                   # Navigation headers
│   │   ├── ImageModal/                # Full-screen image viewer
│   │   ├── Layouts/                   # Dashboard, Form, Table, Profile, etc.
│   │   ├── Loaders/                   # Spinner + skeleton loaders
│   │   ├── Map/                       # Leaflet map wrapper
│   │   ├── Modal/
│   │   ├── Pagination/
│   │   ├── PriorityBadge/
│   │   ├── ProgressTimeline/
│   │   ├── ReassignModal/
│   │   ├── ScrollToTop/
│   │   ├── StatCard/
│   │   ├── StatusBadge/
│   │   ├── Table/
│   │   ├── Toast/
│   │   └── UserForm/
│   │
│   ├── services/                      # Axios API calls
│   │   ├── api.js                     # Axios instance + interceptors
│   │   ├── citizenService.js
│   │   ├── officerService.js
│   │   ├── adminService.js
│   │   └── superAdminService.js
│   │
│   ├── store/                         # Redux store
│   │   ├── store.js
│   │   ├── hooks.js                   # useAppDispatch / useAppSelector
│   │   └── slices/
│   │       ├── authSlice.js
│   │       ├── complaintsSlice.js
│   │       ├── dashboardSlice.js
│   │       ├── departmentsSlice.js
│   │       ├── usersSlice.js
│   │       └── zonesSlice.js
│   │
│   ├── styles/
│   │   ├── theme.js                   # Colours, glass tokens
│   │   ├── GlobalStyles.js            # Body reset + CSS variables
│   │   ├── liquidGlass.js             # Glassmorphism mixins
│   │   ├── glassUtilities.js          # Shared glass helpers
│   │   ├── animations.js              # Keyframe definitions
│   │   └── reactSelectStyles.js       # Custom React Select theme
│   │
│   ├── utils/
│   │   ├── authStorage.js             # localStorage / sessionStorage token helpers
│   │   ├── colorMapper.js
│   │   ├── dateFormatter.js
│   │   ├── scrollReactiveLighting.js  # Scroll-driven ambient lighting effect
│   │   └── toast.js
│   │
│   ├── hooks/
│   │   ├── useImageModal.js
│   │   └── useScrollAnimation.js
│   │
│   ├── routes/
│   │   ├── protectedRoute.jsx         # HOC — redirects if role doesn't match
│   │   └── protectedRoutes.js         # All role → path → component mappings
│   │
│   ├── context/
│   │   └── authContext.js
│   │
│   └── Data/                          # Static content for public pages
│       ├── homeData.js
│       ├── aboutUsData.js
│       └── contactData.js
│
├── .env.example
├── .gitignore
├── vercel.json                        # SPA rewrite rules for Vercel
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 20+ (`nvm use` at repo root picks up `.nvmrc`)
- Server running at `http://localhost:8080` (or use `make docker-up` from repo root)

### Install

```bash
npm install
cp .env.example .env
# Set REACT_APP_API_BASE_URL and REACT_APP_SUPERADMIN_ACCESS_CODE
```

### Run

```bash
npm start       # dev server → http://localhost:3000
```

---

## Scripts

| Script | Description |
|---|---|
| `npm start` | Start development server on :3000 with hot-reload |
| `npm run build` | Production build → `build/` |
| `npm test` | Run Jest tests |

---

## Environment Variables

```env
# URL of the Express API — include /api suffix
REACT_APP_API_BASE_URL=http://localhost:8080/api

# Must match server SUPERADMIN_ACCESS_CODE exactly
REACT_APP_SUPERADMIN_ACCESS_CODE=your_secure_code
```

> All `REACT_APP_*` variables are baked into the bundle at build time. Set them in the Vercel dashboard for production builds — never commit real values to git.

---

## Routes

### Public

| Path | Component |
|---|---|
| `/` | Home |
| `/about` | About Us |
| `/contact` | Contact |
| `/login` | Role Selection |
| `/citizen/login` | Citizen Login |
| `/citizen/register` | Citizen Register |
| `/officer/login` | Officer Login |
| `/admin/login` | Admin Login |
| `/sys-admin-portal-x7k9m` | SuperAdmin Login (hidden) |
| `/sys-admin-register-x7k9m` | SuperAdmin Register (hidden) |

### Protected — Citizen

| Path | Page |
|---|---|
| `/dashboard` | Dashboard |
| `/report-issue` | Report new complaint |
| `/my-complaints` | Complaint list |
| `/complaint/:id` | Complaint details |
| `/edit-complaint/:id` | Edit complaint |
| `/nearby-issues` | Map of nearby issues |
| `/nearby-complaint/:id` | Nearby complaint detail |
| `/feedback/:id` | Resolution feedback |
| `/profile` | Profile |

### Protected — Officer

| Path | Page |
|---|---|
| `/officer/dashboard` | Dashboard |
| `/officer/assigned-tasks` | Task list |
| `/officer/task/:id` | Task details |
| `/officer/update-status/:id` | Post progress update |
| `/officer/complete-task/:id` | Mark task complete |
| `/officer/work-history` | Work history |
| `/officer/profile` | Profile |

### Protected — Admin

| Path | Page |
|---|---|
| `/admin/dashboard` | Dashboard |
| `/admin/complaints` | Complaint management |
| `/admin/complaint/:id` | Complaint details |
| `/admin/assign/:id` | Assign officer |
| `/admin/officers` | Officer management |
| `/admin/escalations` | Escalated complaints |
| `/admin/reports` | Department reports |
| `/admin/profile` | Profile |

### Protected — SuperAdmin

| Path | Page |
|---|---|
| `/superadmin/dashboard` | Dashboard |
| `/superadmin/complaints` | All complaints |
| `/superadmin/complaint/:id` | Complaint details |
| `/superadmin/users` | User management |
| `/superadmin/departments` | Department management |
| `/superadmin/zones` | Zone management |
| `/superadmin/reports` | Global reports (CSV export) |
| `/superadmin/monitoring` | System monitoring |
| `/superadmin/settings` | System settings |
| `/superadmin/profile` | Profile |

Route guards live in `protectedRoute.jsx` — it reads the role from the Redux auth slice and redirects to `/unauthorized` if the role doesn't match.

---

## State Management

All async data lives in Redux. Slices use `createAsyncThunk` for API calls and keep a `lastFetched` timestamp to avoid redundant requests (cache window: ~60 seconds — responsible for the ~60–70 % API call reduction vs. naïve fetching).

| Slice | State |
|---|---|
| `authSlice` | Current user, token, `checkingAuth` flag |
| `complaintsSlice` | Complaint list, detail, filters, pagination |
| `dashboardSlice` | Role-specific dashboard stats |
| `departmentsSlice` | Department list |
| `usersSlice` | User / officer list |
| `zonesSlice` | Zone list |

---

## Styling System

All components are styled with `styled-components`. The theme is defined in `styles/theme.js` and provides:

- **Background tokens:** `background.base` (#0B0F14), `background.ambient`, `background.lifted`
- **Glass tokens:** `glass.base` (rgba white 7%), `glass.border` (rgba white 16%)
- **Primary:** `#3b82f6` (blue)
- **Status:** `success` (#10b981), `warning` (#f59e0b), `danger` (#ef4444)

The `liquidGlass.js` mixin gives any component the glass card appearance:

```js
background: rgba(255,255,255,0.07);
backdrop-filter: blur(40px) saturate(180%);
border: 1px solid rgba(255,255,255,0.16);
box-shadow: 0 8px 32px rgba(0,0,0,0.3);
```

`GlobalStyles.js` applies a dark background, font defaults, and scrollbar styling globally.

---

## API Layer

`services/api.js` exports a configured Axios instance:

- `baseURL` → `REACT_APP_API_BASE_URL`
- `withCredentials: true` (sends cookies cross-domain)
- `timeout: 10000 ms`

**Request interceptor:**
1. Reads JWT from `localStorage` / `sessionStorage` (via `authStorage.js`) and adds `Authorization: Bearer <token>`
2. For any `/superadmin` route (except `/verify-access`), adds `x-admin-access-code` header from env

**Response interceptor:**
- `401` → clears stored token, redirects to `/login`
- `403` → shows "Access denied" toast
- `5xx` → shows "Server error" toast
- Timeout → shows "Request timeout" toast

---

## Deployment (Vercel)

### Setup

1. Import repo into Vercel → set **Root Directory** to `client`
2. Framework preset: **Create React App** (auto-detected)
3. Add environment variables in the Vercel dashboard:
   ```
   REACT_APP_API_BASE_URL=https://your-api.onrender.com/api
   REACT_APP_SUPERADMIN_ACCESS_CODE=your_secure_code
   ```
4. Deploy

### SPA routing

`vercel.json` rewrites all paths to `index.html` so React Router handles routing client-side:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Without this, refreshing any deep URL (e.g. `/dashboard`) would return a 404 from Vercel.

### Production build locally

```bash
npm run build
# Output: client/build/
# Or from repo root: make build
```
