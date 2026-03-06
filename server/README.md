# CivicPulse Server

Backend API for CivicPulse - A civic complaint management system.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **Multer** - File upload handling

## Project Structure

```
server/
├── config/              # Configuration files
│   ├── cloudinary.js    # Cloudinary setup
│   └── db.js            # MongoDB connection
├── controllers/         # Business logic
│   ├── admin/           # Admin controllers
│   ├── citizen/         # Citizen controllers
│   ├── officer/         # Officer controllers
│   ├── superAdmin/      # SuperAdmin controllers
│   └── general/         # Shared controllers
├── middleware/          # Custom middleware
│   ├── authMiddleware.js    # JWT authentication & authorization
│   ├── errorMiddleware.js   # Error handling
│   └── uploadMiddleware.js  # File upload handling
├── models/              # Mongoose schemas
│   ├── admin/           # Admin models
│   ├── citizen/         # Citizen models
│   ├── officer/         # Officer models
│   ├── superAdmin/      # SuperAdmin models
│   └── general/         # Shared models
├── routes/              # API routes
│   ├── admin/           # Admin routes
│   ├── citizen/         # Citizen routes
│   ├── officer/         # Officer routes
│   ├── superAdmin/      # SuperAdmin routes
│   └── general/         # Shared routes
├── scripts/             # Database migrations & utilities
│   └── migrateTimeline.js   # Timeline schema migration
├── utils/               # Helper functions
│   ├── authHelper.js        # Authentication utilities
│   ├── cloudinaryHelper.js  # Cloudinary operations
│   ├── queryHelper.js       # Query building utilities
│   ├── validationHelper.js  # Validation functions
│   └── userHelper.js        # User-related utilities
├── .env                 # Environment variables
├── .env.example         # Environment template
├── server.js            # Entry point
└── seeder.js            # Database seeder
```

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd CivicPulse/server
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
NODE_ENV=development
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
SUPERADMIN_ACCESS_CODE=CP_xIPz47AexFlr4fYlvN0fXAOZBMTx
```

**Note**: Change `SUPERADMIN_ACCESS_CODE` in production. Must match frontend code.

4. **Start the server**
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login (all roles)
- `POST /api/citizens/register` - Citizen registration
- `POST /api/superadmin/verify-access` - Verify SuperAdmin access code
- `POST /api/superadmin/register` - SuperAdmin registration (requires access code header)

### Citizen Routes
- `GET /api/citizen/dashboard` - Get dashboard data
- `GET /api/citizen/complaints` - Get my complaints
- `POST /api/complaints` - Create complaint
- `PUT /api/complaints/:id` - Update complaint
- `DELETE /api/complaints/:id` - Delete complaint
- `GET /api/complaints/nearby` - Get nearby complaints
- `POST /api/complaints/:id/feedback` - Submit feedback

### Officer Routes
- `GET /api/officer/dashboard` - Get dashboard data
- `GET /api/officer/tasks` - Get assigned tasks
- `GET /api/officer/tasks/:id` - Get task details
- `PUT /api/officer/tasks/:id/progress` - Update task progress
- `GET /api/officer/work-history` - Get work history

### Admin Routes
- `GET /api/admin/dashboard` - Get dashboard data
- `GET /api/admin/complaints` - Get all complaints
- `POST /api/admin/complaints/:id/assign` - Assign complaint to officer
- `PUT /api/admin/complaints/:id/reassign` - Reassign complaint
- `GET /api/admin/officers` - Get all officers
- `POST /api/admin/officers` - Create officer
- `GET /api/admin/reports` - Get reports
- `GET /api/admin/escalations` - Get escalated complaints

### SuperAdmin Routes
- `POST /api/superadmin/verify-access` - Verify access code
- `GET /api/superadmin/dashboard` - Get dashboard data
- `GET /api/superadmin/reports` - Get global reports
- `GET /api/superadmin/monitoring` - Get system monitoring data
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create department
- `GET /api/superadmin/zones` - Get all zones
- `POST /api/superadmin/zones` - Create zone
- `GET /api/settings` - Get settings
- `PUT /api/settings` - Update settings
- `GET /api/categories` - Get categories
- `POST /api/categories` - Create category

**Note**: All SuperAdmin routes (except `/verify-access`) require `x-admin-access-code` header.

## Authentication & Authorization

### Roles
- **Citizen** (CZ-XXXXXX) - Report and track complaints
- **Officer** (OF-XXXXXX) - Handle assigned tasks
- **Admin** (AD-XXXXXX) - Manage department operations
- **SuperAdmin** (SA-XXXXXX) - System-wide administration

### Sequential ID System
Each role has automatic, sequential ID generation:
- **Counter Model**: Tracks sequence per role
- **Format**: PREFIX-XXXXXX (e.g., CZ-000001)
- **Thread-Safe**: Atomic MongoDB operations
- **Auto-Generated**: Created during user registration

### Protected Routes
All routes except `/api/auth/*` require JWT authentication via HTTP-only cookie.

### Authorization Middleware
```javascript
protect      // Verify JWT token
authorize([roles])  // Check user role
```

## Database Models

### User Models
- **Citizen** - Citizens who report complaints
- **Officer** - Field officers who resolve issues
- **Admin** - Department administrators
- **SuperAdmin** - System administrators

### Core Models
- **Complaint** - Civic complaints with location, images, status
- **Department** - Government departments
- **Zone** - Geographic zones
- **Category** - Complaint categories
- **Setting** - System settings
- **Counter** - Sequential ID tracking per role

## Features

### Security
- JWT authentication with HTTP-only cookies
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Protected routes and authorization middleware
- SuperAdmin access code validation (frontend + backend)

### File Upload
- Image upload to Cloudinary
- Multiple image support
- Automatic image optimization
- Secure file handling with Multer

### Geolocation
- GeoJSON support for location data
- Nearby complaints search
- Zone-based complaint filtering

### Error Handling
- Centralized error middleware
- Async error handling
- Consistent error responses

## Scripts

```bash
npm start              # Start production server
npm run server         # Start development server with nodemon
npm run migrate:timeline  # Run timeline migration
```

**Note**: The seeder has been removed. Users must register through proper channels:
- Citizens: `/citizen/register`
- SuperAdmin: `/superadmin/register`
- Officers/Admins: Created by SuperAdmin via User Management

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| NODE_ENV | Environment (development/production) | Yes |
| PORT | Server port | Yes |
| MONGO_URI | MongoDB connection string | Yes |
| JWT_SECRET | JWT signing secret | Yes |
| JWT_EXPIRE | JWT expiration time | Yes |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | Yes |
| CLOUDINARY_API_KEY | Cloudinary API key | Yes |
| CLOUDINARY_API_SECRET | Cloudinary API secret | Yes |
| SUPERADMIN_ACCESS_CODE | SuperAdmin access code | Yes |

## Development

### Code Style
- Use async/await for asynchronous operations
- Use express-async-handler for error handling
- Follow MVC pattern
- Keep controllers thin, models fat
- Use meaningful variable names

### Best Practices
- Validate all inputs
- Use lean queries for read-only operations
- Implement proper error handling
- Use environment variables for configuration
- Keep routes organized by role

## Production Deployment

1. Set `NODE_ENV=production`
2. Use strong JWT_SECRET
3. Enable CORS for specific origins
4. Use HTTPS
5. Implement rate limiting
6. Set up monitoring and logging
7. Use process manager (PM2)

## License

Private - All rights reserved

## Support

For issues and questions, contact the development team.
