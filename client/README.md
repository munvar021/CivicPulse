# CivicPulse Frontend 🎨

Modern React-based frontend for the CivicPulse civic complaint management system, featuring a stunning liquid glass UI design with smooth animations and responsive layouts.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Features](#features)
- [Components](#components)
- [State Management](#state-management)
- [Routing](#routing)
- [Styling](#styling)
- [Environment Variables](#environment-variables)

---

## 🌟 Overview

The CivicPulse frontend is a single-page application (SPA) built with React 18, featuring:
- **Liquid Glass UI**: Modern glassmorphism design with backdrop blur effects
- **Responsive Design**: Mobile-first approach with media queries
- **Smooth Animations**: Framer Motion and custom keyframe animations
- **State Management**: Redux Toolkit with optimized caching
- **Form Validation**: React Hook Form with comprehensive validation rules
- **Image Management**: Full-screen image modal with navigation
- **Interactive Maps**: Leaflet.js for location-based features

---

## 💻 Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| React | 18.2.0 | UI Framework |
| React Router DOM | 6.8.0 | Client-side routing |
| Redux Toolkit | 2.11.2 | State management |
| React Redux | 9.2.0 | Redux React bindings |
| React Hook Form | 7.71.1 | Form management & validation |
| Styled Components | 6.3.8 | CSS-in-JS styling |
| Axios | 1.3.0 | HTTP client |
| Leaflet | 1.9.3 | Interactive maps |
| React Leaflet | 4.2.0 | React bindings for Leaflet |
| Framer Motion | 12.34.0 | Animation library |
| React Toastify | 11.0.5 | Toast notifications |
| React Select | 5.10.2 | Enhanced select dropdowns |
| Font Awesome | 7.1.0 | Icon library |

---

## 📁 Project Structure

```
client/src/
├── components/          # Reusable UI components
│   ├── AccessGate/     # SuperAdmin access code validation
│   ├── Button/         # Custom button component
│   ├── Card/           # Card component
│   ├── ConfirmationModal/ # Delete confirmation modal
│   ├── EditAssignmentModal/ # Assignment editing
│   ├── EditProfileModal/ # Profile editing modal
│   ├── EmptyState/     # Empty state UI
│   ├── Filter/         # Filtering component
│   ├── Forms/          # Form components (Department, Zone)
│   ├── Headers/        # Header & navigation
│   ├── ImageModal/     # Full-screen image viewer
│   ├── Layouts/        # Page layout components
│   ├── Loaders/        # Loading indicators & skeletons
│   ├── Map/            # Leaflet map component
│   ├── Modal/          # Generic modal component
│   ├── Pagination/     # Table pagination
│   ├── PriorityBadge/  # Priority level indicators
│   ├── ProgressTimeline/ # Complaint progress timeline
│   ├── ReassignModal/  # Task reassignment modal
│   ├── ScrollToTop/    # Scroll to top button
│   ├── StatCard/       # Statistics display cards
│   ├── StatusBadge/    # Status indicators
│   ├── Table/          # Data table component
│   ├── Toast/          # Toast notification wrapper
│   └── UserForm/       # User creation forms
├── Pages/              # Application pages
│   ├── AboutUs/        # About page
│   ├── Admin/          # Admin portal pages
│   │   ├── AssignOfficer/
│   │   ├── ComplaintManagement/
│   │   ├── Dashboard/
│   │   ├── Escalations/
│   │   ├── OfficerManagement/
│   │   ├── Profile/
│   │   └── Reports/
│   ├── Auth/           # Authentication pages
│   │   ├── Login/      # Role-specific login pages
│   │   ├── Register/   # Registration pages
│   │   └── roleSelection.jsx
│   ├── Citizen/        # Citizen portal pages
│   │   ├── Dashboard/
│   │   ├── EditComplaint/
│   │   ├── MyComplaints/
│   │   ├── NearbyComplaintDetails/
│   │   ├── NearbyIssues/
│   │   ├── Profile/
│   │   ├── ReportIssue/
│   │   └── ResolutionFeedback/
│   ├── Contact/        # Contact page
│   ├── Home/           # Landing page
│   ├── NotFound/       # 404 page
│   ├── Officer/        # Officer portal pages
│   │   ├── AssignedTasks/
│   │   ├── CompleteTask/
│   │   ├── Dashboard/
│   │   ├── Profile/
│   │   ├── UpdateStatus/
│   │   └── WorkHistory/
│   ├── SuperAdmin/     # SuperAdmin portal pages
│   │   ├── ComplaintManagement/
│   │   ├── Dashboard/
│   │   ├── DepartmentManagement/
│   │   ├── GlobalReports/
│   │   ├── Profile/
│   │   ├── Settings/
│   │   ├── SystemMonitoring/
│   │   ├── UserManagement/
│   │   └── ZoneManagement/
│   └── Unauthorized/   # 401 page
├── services/           # API service layer
│   ├── adminService.js
│   ├── api.js          # Axios instance with interceptors
│   ├── citizenService.js
│   ├── officerService.js
│   └── superAdminService.js
├── store/              # Redux store
│   ├── slices/         # Redux slices
│   │   ├── authSlice.js
│   │   ├── complaintsSlice.js
│   │   ├── dashboardSlice.js
│   │   ├── departmentsSlice.js
│   │   ├── usersSlice.js
│   │   └── zonesSlice.js
│   ├── hooks.js        # Typed Redux hooks
│   └── store.js        # Store configuration
├── styles/             # Styling system
│   ├── animations.js   # Keyframe animations
│   ├── glassUtilities.js # Glass morphism utilities
│   ├── GlobalStyles.js # Global CSS styles
│   ├── liquidGlass.js  # Liquid glass effects
│   ├── reactSelectStyles.js # React Select custom styles
│   └── theme.js        # Theme configuration
├── utils/              # Utility functions
│   ├── authStorage.js  # LocalStorage auth utilities
│   ├── colorMapper.js  # Color mapping utilities
│   ├── dateFormatter.js # Date formatting
│   ├── scrollReactiveLighting.js # Scroll effects
│   └── toast.js        # Toast notification utilities
├── context/            # React contexts
│   └── authContext.js  # Authentication context
├── hooks/              # Custom React hooks
│   ├── useImageModal.js # Image modal state management
│   └── useScrollAnimation.js # Scroll-based animations
├── routes/             # Routing configuration
│   ├── protectedRoute.jsx # Route guard component
│   └── protectedRoutes.js # Route definitions by role
├── Data/               # Static data
│   ├── aboutUsData.js
│   ├── contactData.js
│   └── homeData.js
├── App.jsx             # Main app component
└── index.js            # Entry point
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update environment variables
# Edit .env with your configuration
```

### Environment Variables

Create a `.env` file in the client directory:

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_SUPERADMIN_ACCESS_CODE=<your_secure_access_code>
```

### Development

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

The app will be available at `http://localhost:3000`

---

## ✨ Features

### 🎨 UI/UX Features

- **Liquid Glass Design**: Modern glassmorphism with backdrop blur
- **Responsive Layout**: Mobile, tablet, and desktop optimized
- **Smooth Animations**: Fade, slide, scale animations
- **Scroll Effects**: Reactive lighting and scroll-based animations
- **Dark Theme**: Consistent dark theme throughout
- **Toast Notifications**: Non-intrusive user feedback
- **Loading States**: Skeleton loaders and spinners
- **Empty States**: Friendly empty state messages

### 🔐 Authentication

- **Role-Based Access**: Citizen, Officer, Admin, SuperAdmin
- **JWT Authentication**: Secure token-based auth
- **Protected Routes**: Route guards for authorized access
- **Persistent Sessions**: LocalStorage token management
- **Auto Logout**: Token expiration handling

### 📝 Form Management

- **React Hook Form**: Efficient form state management
- **Validation Rules**: Comprehensive field validation
- **Error Messages**: Field-level error display
- **File Upload**: Multi-file upload with preview
- **Image Modal**: Click to view images in full screen

### 🗺️ Map Features

- **Interactive Maps**: Leaflet.js integration
- **Location Picker**: Click to select location
- **GPS Integration**: Auto-detect user location
- **Markers**: Display complaint locations
- **Popups**: Show complaint details on map

### 📊 Data Management

- **Redux State**: Centralized state management
- **Optimized Caching**: 60-70% fewer API calls
- **Pagination**: Server-side pagination
- **Filtering**: Multi-criteria filtering
- **Sorting**: Column-based sorting
- **Search**: Keyword-based search

---

## 🧩 Components

### Core Components

#### ImageModal
Full-screen image viewer with navigation:
- Click any image to open
- Navigate between multiple images
- Keyboard support (Escape, Arrow keys)
- Click outside to close
- Image counter display
- React Portal for proper positioning

#### ProgressTimeline
Visual timeline of complaint progress:
- Chronological event display
- Status updates with icons
- Image attachments
- Metadata display (reassignments, due dates)
- Scroll-based animations

#### Map
Interactive Leaflet map component:
- Location selection
- GPS integration
- Marker display
- Popup information
- Responsive design

#### Table
Data table with advanced features:
- Pagination
- Sorting
- Filtering
- Search
- Empty states
- Loading states

### Layout Components

- **FormPageLayout**: Form pages with back button
- **DashboardLayout**: Dashboard pages with stats
- **TablePageLayout**: Table pages with filters
- **ComplaintDetailsLayout**: Complaint detail view
- **ProfileLayout**: User profile pages

### UI Components

- **Button**: Customizable button with variants
- **Card**: Container with glass effect
- **Modal**: Generic modal component
- **Badge**: Status and priority indicators
- **Loader**: Loading spinners and skeletons
- **EmptyState**: Empty state messages
- **Toast**: Notification system

---

## 🔄 State Management

### Redux Slices

#### authSlice
- User authentication state
- Login/logout actions
- Token management
- User profile data

#### complaintsSlice
- Complaint list
- Filters and pagination
- CRUD operations
- Caching logic

#### dashboardSlice
- Dashboard statistics
- Recent complaints
- Performance metrics

#### departmentsSlice
- Department list
- Department CRUD

#### usersSlice
- User management
- Officer list
- User CRUD

#### zonesSlice
- Zone management
- Geographic data

---

## 🛣️ Routing

### Public Routes
- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- `/login` - Role selection
- `/citizen/login` - Citizen login
- `/citizen/register` - Citizen registration
- `/officer/login` - Officer login
- `/admin/login` - Admin login
- `/sys-admin-portal-x7k9m` - SuperAdmin login (hidden)
- `/sys-admin-register-x7k9m` - SuperAdmin register (hidden)

### Protected Routes

#### Citizen Routes
- `/dashboard` - Citizen dashboard
- `/report-issue` - Report new complaint
- `/my-complaints` - View complaints
- `/complaint/:id` - Complaint details
- `/edit-complaint/:id` - Edit complaint
- `/nearby-issues` - Nearby complaints
- `/nearby-complaint/:id` - Nearby complaint details
- `/feedback/:id` - Provide feedback
- `/profile` - User profile

#### Officer Routes
- `/officer/dashboard` - Officer dashboard
- `/officer/assigned-tasks` - Task list
- `/officer/task/:id` - Task details
- `/officer/update-status/:id` - Update task status
- `/officer/complete-task/:id` - Complete task
- `/officer/work-history` - Work history
- `/officer/profile` - Officer profile

#### Admin Routes
- `/admin/dashboard` - Admin dashboard
- `/admin/complaints` - Complaint management
- `/admin/complaint/:id` - Complaint details
- `/admin/assign-officer/:id` - Assign officer
- `/admin/officers` - Officer management
- `/admin/escalations` - Escalated complaints
- `/admin/reports` - Reports
- `/admin/profile` - Admin profile

#### SuperAdmin Routes
- `/superadmin/dashboard` - SuperAdmin dashboard
- `/superadmin/users` - User management
- `/superadmin/departments` - Department management
- `/superadmin/zones` - Zone management
- `/superadmin/complaints` - All complaints
- `/superadmin/complaint/:id` - Complaint details
- `/superadmin/reports` - Global reports
- `/superadmin/monitoring` - System monitoring
- `/superadmin/settings` - System settings
- `/superadmin/profile` - SuperAdmin profile

---

## 🎨 Styling

### Theme System

The app uses a centralized theme configuration:

```javascript
// theme.js
export const theme = {
  colors: {
    background: {
      base: '#0B0F14',
      ambient: '#141A22',
      lifted: '#111827',
    },
    glass: {
      base: 'rgba(255, 255, 255, 0.07)',
      border: 'rgba(255, 255, 255, 0.16)',
      muted: 'rgba(255, 255, 255, 0.04)',
    },
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    status: {
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.72)',
      disabled: 'rgba(255, 255, 255, 0.38)',
    },
  },
  liquidGlass: {
    background: 'rgba(255, 255, 255, 0.07)',
    backdropFilter: 'blur(40px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.16)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
};
```

### Styled Components

All components use styled-components for styling:
- Scoped styles
- Theme integration
- Dynamic styling
- Media queries
- Animations

### Animations

Custom keyframe animations:
- `fadeIn` - Fade in effect
- `fadeInUp` - Fade in from bottom
- `fadeInDown` - Fade in from top
- `fadeInLeft` - Fade in from left
- `fadeInRight` - Fade in from right
- `scaleIn` - Scale in effect
- `slideInUp` - Slide in from bottom
- `float` - Floating animation
- `pulse` - Pulse effect
- `glow` - Glow effect
- `shimmer` - Shimmer effect
- `rotate` - Rotation animation
- `bounce` - Bounce effect

---

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_BASE_URL` | Backend API URL | `http://localhost:8080/api` |
| `REACT_APP_SUPERADMIN_ACCESS_CODE` | SuperAdmin access code | `<your_secure_code>` |

---

## 📦 Build & Deployment

### Production Build

```bash
npm run build
```

Creates optimized production build in `build/` directory.

### Deployment Options

#### Vercel
```bash
vercel --prod
```

#### Netlify
```bash
netlify deploy --prod
```

#### AWS S3 + CloudFront
```bash
aws s3 sync build/ s3://your-bucket-name
```

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

---

## 📝 Code Style

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Naming Conventions**:
  - Components: PascalCase
  - Files: camelCase
  - Constants: UPPER_SNAKE_CASE
  - Functions: camelCase

---

## 🤝 Contributing

1. Follow the existing code structure
2. Use styled-components for styling
3. Add PropTypes for components
4. Write meaningful commit messages
5. Test before submitting PR

---

## 📄 License

Private License - All rights reserved

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Styled Components for CSS-in-JS
- Redux Toolkit for state management
- Leaflet for mapping capabilities
- Font Awesome for icons

---

**Built with ❤️ for better communities**
