# E-Commerce Web Application

## Overview
This is a full-stack e-commerce web application built using the MERN stack. It includes user authentication, product browsing, cart management, address handling, and order placement with both Cash on Delivery (COD) and online payment integration.

---

## Features

### User Features
- User registration and login
- Browse products by category
- Add/remove items from cart
- Update item quantity
- Save and manage delivery addresses
- Place orders using:
  - Cash on Delivery (COD)
  - Online payment (Stripe - test mode)
- View order history

### Seller/Admin Features
- Seller login authentication
- View all orders
- Access customer details and delivery addresses

---

## Tech Stack

### Frontend
- React.js
- Context API (State Management)
- Axios (API calls)
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Payment Integration
- Stripe (Test & Live mode supported)

---

## Project Structure

project-root/
│
├── client/             # Frontend (React)
├── server/             # Backend (Node + Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── config/
│
└── .env

---

## Environment Variables

Create a `.env` file in the server directory and add:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret

STRIPE_SECRET_KEY=your_secret_key

SELLER_EMAIL=your_email
SELLER_PASSWORD=your_password

Frontend `.env` (if needed):

VITE_STRIPE_PUBLISHABLE_KEY=your_publishable_key

---

## Installation

### 1. Clone the repository
git clone <your-repo-link>
cd project-root

### 2. Install dependencies

Backend:
cd server
npm install

Frontend:
cd client
npm install

---

## Running the Application

### Start Backend
cd server
npm run server

### Start Frontend
cd client
npm run dev

---

## Stripe Payment Setup

### Test Mode
- Use pk_test_ in frontend
- Use sk_test_ in backend
- No real money is charged

### Live Mode (Production)
- Replace with pk_live_ and sk_live_
- Real transactions will occur

---

## Important Notes

- Never expose your Stripe secret key in frontend code
- Always use environment variables for sensitive data
- Ensure authentication middleware is applied to protected routes
- Use withCredentials: true for cookie-based authentication


---

## Future Improvements

- Add online payment success/failure handling
- Implement order tracking status
- Add product reviews and ratings
- Improve UI/UX

---

## License
This project is for educational purposes.

---

## Author
Nandani Singh