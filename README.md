# Intern Review API

A backend API for managing company internship reviews. Built with **Node.js**, **Express**, and **MongoDB**. Includes authentication, review management, and a moderation system for admin approval.

---

## Features

- **User Authentication**
  - Register & login
  - Password hashing with bcrypt
  - JWT-based authentication

- **Reviews**
  - Create, edit, delete your own reviews
  - Filter by company or role
  - Pagination and indexed queries for performance

- **Moderation**
  - Approve or reject pending reviews (admin-only)
  - View flagged reviews
  - Role-based access control
  - Review status: `pending`, `approved`, `rejected`
  - Users can flag inappropriate reviews

---

## Tech Stack

- **Backend:** Node.js, Express  
- **Database:** MongoDB (Mongoose ORM)  
- **Authentication:** JWT + bcrypt  
- **Middleware:** Custom auth & admin middleware  
- **Validation:** Zod schemas for request validation  

---

## Folder Structure
# Intern Review API

A backend API for managing company internship reviews. Built with **Node.js**, **Express**, and **MongoDB**. Includes authentication, review management, and a moderation system for admin approval.

---

## Features

- **User Authentication**
  - Register & login
  - Password hashing with bcrypt
  - JWT-based authentication

- **Reviews**
  - Create, edit, delete your own reviews
  - Filter by company or role
  - Pagination and indexed queries for performance

- **Moderation**
  - Approve or reject pending reviews (admin-only)
  - View flagged reviews
  - Role-based access control
  - Review status: `pending`, `approved`, `rejected`
  - Users can flag inappropriate reviews

---

## Tech Stack

- **Backend:** Node.js, Express  
- **Database:** MongoDB (Mongoose ORM)  
- **Authentication:** JWT + bcrypt  
- **Middleware:** Custom auth & admin middleware  
- **Validation:** Zod schemas for request validation  

---

## Folder Structure
```
intern-review-api/
├── src/
│   ├── app.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── reviewController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── rateLimiter.js
│   │   └── validate.js
│   ├── models/
│   │   ├── User.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── testRoutes.js
│   │   ├── authRoutes.js
│   │   └── reviewRoutes.js
│   ├── utils/
│   └── validators/
│       ├── authSchemas.js
│       └── reviewSchemas.js
├── .env
├── server.js
├── package.json
├── LICENSE
├── .gitignore
└── README.md
```
---

## .env Setup

PORT=3000
MONGO=<your-mongodb-url>
JWT=<your-jwt-secret>

---

### API Docs

Swagger UI: /api/docs

Authentication: /api/auth/register, /api/auth/login

Reviews: /api/reviews/ (CRUD, filtering, pagination)

Admin: /api/reviews/admin/pending, /api/reviews/:id/approve, /api/reviews/:id/reject, /api/reviews/admin/flagged