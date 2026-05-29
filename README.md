# MERN Task Management System

A simple Task Management System built using MongoDB, Express, React, and Node.js.

This project includes role-based authentication using JWT and bcrypt with three roles: Admin, Manager, and Employee.

### Setup

**Backend**

```bash id="qjlwm1"
cd backend
npm install
npm start
```

Create `.env` inside backend:

```env id="wjlwm2"
PORT=5001
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
```

**Frontend**

```bash id="ejlwm3"
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### Features

* JWT Authentication
* Role Based Access
* Admin User Management
* Manager Task Assignment
* Employee Task View

Check `.env.example` for environment configuration.
