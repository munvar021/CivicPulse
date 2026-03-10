# CivicPulse Backend 🚀

Node.js/Express backend API for the CivicPulse civic complaint management system with MongoDB database, JWT authentication, and Cloudinary image storage.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Authentication](#authentication)
- [File Upload](#file-upload)
- [Environment Variables](#environment-variables)

---

## 🌟 Overview

The CivicPulse backend is a RESTful API built with Node.js and Express, featuring:
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Citizen, Officer, Admin, SuperAdmin
- **MongoDB Database**: NoSQL database with Mongoose ODM
- **Image Upload**: Cloudinary integration for image storage
- **Sequential IDs**: Auto-generated employee IDs (CZ-XXXXXX, OF-XXXXXX, etc.)
- **Timeline Tracking**: Comprehensive complaint progress tracking
- **CSV Export**: Report generation and export
- **GeoJSON Support**: Geographic zone management

---

## 💻 Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| Node.js | 18.x | Runtime environment |
| Express | 4.18.2 | Web framework |
| Mongoose | 8.0.4 | MongoDB ODM |
| JWT | 9.0.2 | Authentication tokens |
| Bcrypt.js | 2.4.3 | Password hashing |
| Cloudinary | 2.9.0 | Image storage |
| Multer | 2.0.2 | File upload middleware |
| Cookie Parser | 1.4.7 | Cookie parsing |
| CORS | 2.8.6 | Cross-origin resource sharing |
| CSV Stringify | 6.6.0 | CSV export |
| Dotenv | 16.4.5 | Environment variables |

---

## 📁 Project Structure

```
server/
├── config/
│   ├── cloudinary.js       # Cloudinary configuration
│   └── db.js               # MongoDB connection
├── controllers/
│   ├── admin/
│   │   └── adminController.js
│   ├── citizen/
│   │   └── citizenController.js
│   ├── general/
│   │   ├── categoryController.js
│   │   ├── complaintController.js
│   │   ├── settingController.js
│   │   └── userController.js
│   ├── officer/
│   │   └── officerController.js
│   └── superAdmin/
│       ├── departmentController.js
│       ├── superAdminController.js
│       └── zoneController.js
├── middleware/
│   ├── authMiddleware.js   # JWT authentication
│   ├── errorMiddleware.js  # Error handling
│   ├── superAdminAccessMiddleware.js # Access code validation
│   └── uploadMiddleware.js # File upload handling
├── models/
│   ├── admin/
│   │   └── Admin.js
│   ├── citizen/
│   │   └── Citizen.js
│   ├── general/
│   │   ├── Category.js
│   │   ├── Complaint.js
│   │   ├── Counter.js      # Sequential ID generation
│   │   ├── Department.js
│   │   ├── Setting.js
│   │   └── User.js
│   ├── officer/
│   │   └── Officer.js
│   └── superAdmin/
│       ├── SuperAdmin.js
│       └── Zone.js
├── routes/
│   ├── admin/
│   │   └── adminRoutes.js
│   ├── citizen/
│   │   └── citizenRoutes.js
│   ├── general/
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── complaintRoutes.js
│   │   ├── settingRoutes.js
│   │   └── userRoutes.js
│   ├── officer/
│   │   └── officerRoutes.js
│   └── superAdmin/
│       ├── departmentRoutes.js
│       ├── superAdminAuthRoutes.js
│       ├── superAdminRoutes.js
│       └── zoneRoutes.js
├── scripts/
│   └── migrateTimeline.js  # Data migration script
├── utils/
│   ├── authHelper.js       # Authentication utilities
│   ├── cloudinaryHelper.js # Image upload utilities
│   ├── generateEmployeeId.js # ID generation
│   ├── generateToken.js    # JWT generation
│   ├── queryHelper.js      # Query builders
│   ├── userHelper.js       # User utilities
│   └── validationHelper.js # Validation utilities
├── server.js               # Entry point
├── .env                    # Environment variables
└── package.json            # Dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- MongoDB 6.x or higher
- Cloudinary account

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

Create a `.env` file in the server directory:

```env
# Server Configuration
NODE_ENV=development
PORT=8080

# Database
MONGO_URI=<your_mongodb_connection_string>

# JWT
JWT_SECRET=<your_jwt_secret_key>
JWT_EXPIRE=30d

# Cloudinary
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>

# SuperAdmin Access
SUPERADMIN_ACCESS_CODE=<your_secure_access_code>
```

### Development

```bash
# Start development server with nodemon
npm run server

# Start production server
npm start

# Run migration script
npm run migrate:timeline
```

The API will be available at `http://localhost:8080`

---

## 📡 API Endpoints

### Authentication

#### General Auth
```http
POST   /api/auth/login              # Login (all roles)
GET    /api/auth/me                 # Get current user
POST   /api/auth/logout             # Logout
```

#### Citizen Auth
```http
POST   /api/citizens/register       # Citizen self-registration
POST   /api/citizens/login          # Citizen login
```

#### SuperAdmin Auth
```http
POST   /api/superadmin/verify-access # Verify access code
POST   /api/superadmin/register     # Register (requires access code)
POST   /api/superadmin/login        # Login
```

### Complaints

#### Citizen Endpoints
```http
GET    /api/citizens/complaints     # Get my complaints
POST   /api/citizens/complaints     # Create complaint
GET    /api/citizens/complaints/:id # Get complaint details
PUT    /api/citizens/complaints/:id # Update complaint
DELETE /api/citizens/complaints/:id # Delete complaint
GET    /api/citizens/nearby         # Get nearby complaints
POST   /api/citizens/feedback/:id   # Provide feedback
```

#### Officer Endpoints
```http
GET    /api/officers/tasks          # Get assigned tasks
GET    /api/officers/tasks/:id      # Get task details
POST   /api/officers/tasks/:id/progress # Update task progress
GET    /api/officers/work-history   # Get work history
```

#### Admin Endpoints
```http
GET    /api/admin/complaints        # Get department complaints
GET    /api/admin/complaints/:id    # Get complaint details
POST   /api/admin/complaints/:id/assign # Assign to officer
PUT    /api/admin/complaints/:id/reassign # Reassign complaint
PUT    /api/admin/complaints/:id/due-date # Update due date
PUT    /api/admin/complaints/:id/assignment # Update assignment
POST   /api/admin/complaints/:id/verify # Verify complaint
GET    /api/admin/escalations       # Get escalated complaints
```

#### SuperAdmin Endpoints
```http
GET    /api/superadmin/complaints   # Get all complaints
GET    /api/superadmin/complaints/:id # Get complaint details
POST   /api/superadmin/complaints/:id/assign # Assign complaint
PUT    /api/superadmin/complaints/:id/reassign # Reassign complaint
POST   /api/superadmin/complaints/:id/verify # Verify complaint
```

### User Management

#### Admin Endpoints
```http
GET    /api/admin/officers          # Get department officers
POST   /api/admin/officers          # Create officer
PUT    /api/admin/officers/:id      # Update officer
DELETE /api/admin/officers/:id      # Delete officer
GET    /api/admin/me                # Get admin profile
PUT    /api/admin/profile           # Update admin profile
```

#### SuperAdmin Endpoints
```http
GET    /api/superadmin/users        # Get all users
POST   /api/superadmin/users        # Create user
PUT    /api/superadmin/users/:id    # Update user
DELETE /api/superadmin/users/:id    # Delete user
GET    /api/superadmin/me           # Get superadmin profile
PUT    /api/superadmin/profile      # Update superadmin profile
```

### Departments

```http
GET    /api/superadmin/departments  # Get all departments
POST   /api/superadmin/departments  # Create department
PUT    /api/superadmin/departments/:id # Update department
DELETE /api/superadmin/departments/:id # Delete department
```

### Zones

```http
GET    /api/superadmin/zones        # Get all zones
POST   /api/superadmin/zones        # Create zone (GeoJSON)
PUT    /api/superadmin/zones/:id    # Update zone
DELETE /api/superadmin/zones/:id    # Delete zone
```

### Dashboard & Reports

#### Citizen Dashboard
```http
GET    /api/citizens/dashboard      # Get citizen dashboard data
```

#### Officer Dashboard
```http
GET    /api/officers/dashboard      # Get officer dashboard data
GET    /api/officers/stats          # Get officer statistics
```

#### Admin Dashboard
```http
GET    /api/admin/dashboard         # Get admin dashboard data
GET    /api/admin/reports           # Get department reports
GET    /api/admin/profile/stats     # Get profile statistics
```

#### SuperAdmin Dashboard
```http
GET    /api/superadmin/dashboard    # Get system dashboard data
GET    /api/superadmin/reports      # Get global reports
GET    /api/superadmin/reports/export # Export reports (CSV)
GET    /api/superadmin/monitoring   # Get system monitoring data
```

### Settings

```http
GET    /api/settings                # Get all settings
GET    /api/settings/:key           # Get setting by key
PUT    /api/settings/:key           # Update setting
```

---

## 🗄️ Database Models

### User Models

#### Citizen
```javascript
{
  employeeId: String,      // CZ-000001, CZ-000002, etc.
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String (unique),
  role: 'citizen',
  createdAt: Date,
  updatedAt: Date
}
```

#### Officer
```javascript
{
  employeeId: String,      // OF-000001, OF-000002, etc.
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String (unique),
  department: ObjectId (ref: Department),
  role: 'officer',
  createdAt: Date,
  updatedAt: Date
}
```

#### Admin
```javascript
{
  employeeId: String,      // AD-000001, AD-000002, etc.
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String (unique),
  department: ObjectId (ref: Department),
  zone: ObjectId (ref: Zone),
  role: 'admin',
  createdAt: Date,
  updatedAt: Date
}
```

#### SuperAdmin
```javascript
{
  employeeId: String,      // SA-000001, SA-000002, etc.
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String (unique),
  role: 'superAdmin',
  createdAt: Date,
  updatedAt: Date
}
```

### Complaint Model

```javascript
{
  title: String,
  description: String,
  category: String,
  severity: String,        // low, medium, high, critical
  status: String,          // pending, assigned, in_progress, resolved, closed
  citizen: ObjectId (ref: Citizen),
  department: ObjectId (ref: Department),
  assignedTo: ObjectId (ref: Officer),
  location: {
    type: 'Point',
    coordinates: [longitude, latitude],
    address: String
  },
  images: [String],        // Cloudinary URLs
  dueDate: Date,
  resolutionDate: Date,
  resolutionDetails: String,
  feedback: {
    rating: Number,
    comment: String,
    submittedAt: Date
  },
  timeline: [{
    eventType: String,     // submitted, assigned, in_progress, resolved, etc.
    status: String,
    description: String,
    updatedBy: ObjectId,
    updatedByModel: String, // Citizen, Officer, Admin, SuperAdmin
    metadata: Object,
    date: Date
  }],
  progressUpdates: [{
    status: String,
    remarks: String,
    images: [String],
    updatedBy: ObjectId (ref: Officer),
    createdAt: Date
  }],
  reassignmentHistory: [{
    fromOfficer: ObjectId (ref: Officer),
    toOfficer: ObjectId (ref: Officer),
    reason: String,
    newDueDate: Date,
    reassignedBy: ObjectId,
    reassignedAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Department Model

```javascript
{
  name: String (unique),
  description: String,
  contactEmail: String,
  contactPhone: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Zone Model

```javascript
{
  name: String (unique),
  description: String,
  location: {
    type: 'Polygon',
    coordinates: [[[longitude, latitude]]]  // GeoJSON
  },
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Counter Model

```javascript
{
  _id: String,             // 'citizen', 'officer', 'admin', 'superAdmin'
  seq: Number              // Sequential counter
}
```

---

## 🔐 Authentication

### JWT Token

- **Algorithm**: HS256
- **Expiration**: 30 days (configurable)
- **Storage**: HTTP-only cookie + LocalStorage
- **Payload**: User ID and role

### Password Security

- **Hashing**: Bcrypt with salt rounds
- **Validation**: Minimum 8 characters, uppercase, lowercase, number, special character

### Role-Based Access

- **Citizen**: Can create, view, edit, delete own complaints
- **Officer**: Can view assigned tasks, update progress
- **Admin**: Can manage department complaints and officers
- **SuperAdmin**: Full system access

### Middleware

#### authMiddleware
```javascript
// Protects routes requiring authentication
// Verifies JWT token
// Attaches user to request object
```

#### superAdminAccessMiddleware
```javascript
// Validates SuperAdmin access code
// Checks x-admin-access-code header
// Compares with environment variable
```

---

## 📤 File Upload

### Cloudinary Integration

- **Image Upload**: Multer + Cloudinary
- **Max Files**: 5 images per upload
- **Formats**: JPEG, PNG, WebP
- **Storage**: Cloudinary cloud storage
- **Transformation**: Auto-optimization

### Upload Endpoints

```javascript
// Complaint images
POST /api/citizens/complaints
- multipart/form-data
- Field: images (max 5)

// Progress update images
POST /api/officers/tasks/:id/progress
- multipart/form-data
- Field: images (max 5)
```

---

## 🔧 Utilities

### generateEmployeeId

Generates sequential employee IDs:
- `CZ-000001`, `CZ-000002` for Citizens
- `OF-000001`, `OF-000002` for Officers
- `AD-000001`, `AD-000002` for Admins
- `SA-000001`, `SA-000002` for SuperAdmins

Uses MongoDB atomic operations for thread-safe increments.

### queryHelper

Builds MongoDB queries with:
- Pagination
- Filtering
- Sorting
- Search

### cloudinaryHelper

Handles image uploads:
- Stream upload
- Error handling
- URL generation

---

## 🧪 Testing

```bash
# Run tests (if configured)
npm test
```

---

## 📊 Database Indexes

### Complaint Indexes
- `location` (2dsphere) - Geospatial queries
- `citizen` - Citizen complaints lookup
- `assignedTo` - Officer tasks lookup
- `department` - Department complaints lookup
- `status` - Status filtering
- `createdAt` - Sorting

### User Indexes
- `email` (unique) - User lookup
- `phone` (unique) - Phone validation
- `employeeId` (unique) - ID lookup

---

## 🚀 Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT secret
- [ ] Configure MongoDB Atlas
- [ ] Set up Cloudinary production account
- [ ] Enable CORS for production domain
- [ ] Set secure cookie options
- [ ] Enable rate limiting
- [ ] Set up logging
- [ ] Configure error monitoring

### Environment Variables

```env
NODE_ENV=production
PORT=8080
MONGO_URI=<your_mongodb_atlas_connection_string>
JWT_SECRET=<strong_random_secret>
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
SUPERADMIN_ACCESS_CODE=<your_secure_access_code>
```

---

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "stack": "..." // Only in development
}
```

### Paginated Response
```json
{
  "data": [...],
  "currentPage": 1,
  "totalPages": 10,
  "total": 100
}
```

---

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: Bcrypt encryption
- **CORS**: Configured for frontend domain
- **Input Validation**: Mongoose schema validation
- **SQL Injection Prevention**: MongoDB parameterized queries
- **XSS Protection**: Input sanitization
- **Rate Limiting**: (Recommended for production)
- **Helmet**: (Recommended for production)

---

## 📄 License

Private License - All rights reserved

---

## 🙏 Acknowledgments

- Express.js for the web framework
- MongoDB for the database
- Cloudinary for image storage
- JWT for authentication

---

**Built with ❤️ for better communities**
