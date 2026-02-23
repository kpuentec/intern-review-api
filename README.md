# intern-review-api

A backend API for managing company interview reviews. Built with **Node.js**, **Express**, and **MongoDB**. Includes authentication, review management, and a moderation system for admin approval.

---

## Features

- **User Authentication**  
  - Register & login  
  - Password hashing with bcrypt  
  - JWT-based authentication

- **Reviews**  
  - Create, edit, delete your own reviews  
  - Filter by company or role  
  - Pagination and indexing for performance

- **Moderation**  
  - Approve or reject pending reviews  
  - View flagged reviews  
  - Admin-only endpoints and role-based access control  
  - Review status: `pending`, `approved`, `rejected`  
  - Users can flag inappropriate reviews

---

## Tech Stack

- **Backend:** Node.js, Express  
- **Database:** MongoDB (Mongoose ORM)  
- **Authentication:** JWT + bcrypt  
- **Middleware:** Custom auth & admin middleware

## Road Map

- Rate limiting  
- Centralized error handling  
- Swagger API docs  
- Deployment prep  