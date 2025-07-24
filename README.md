## 🧠 Backend Overview

This backend powers a role-based Building Management System with secure rent payments, notices, coupon handling, and Stripe integration. It's built using modern technologies to ensure scalability, security, and flexibility. Admins can manage tenants, coupons, and announcements, while members can view agreements, pay rent, and track notices.

The backend is built to serve RESTful APIs, verified using Firebase Admin SDK and protected by middleware. It supports real-time functionality through well-structured models and is optimized for production with token-based security and modular routing.

---

## 📦 Backend Features Overview

### 🧩 Technology Stack
- **Node.js** with **Express.js** for scalable routing
- **MongoDB** with **Mongoose** for flexible data modeling
- **Firebase Admin SDK** for secure authentication and role-based access
- **Stripe** integration for secure rent payments

---

### 📁 Main Folder Structure

```bash
backend/
├── controllers/           # Business logic for each feature
│   ├── authController.js
│   ├── paymentController.js
│   ├── couponController.js
│   └── ...
├── routes/                # API endpoints
│   ├── authRoutes.js
│   ├── paymentRoutes.js
│   ├── couponRoutes.js
│   └── ...
├── models/                # MongoDB Mongoose models
│   ├── User.js
│   ├── Agreement.js
│   ├── Payment.js
│   └── ...
├── middlewares/           # Custom middleware
│   ├── verifyFirebaseToken.js
│   ├── verifyRole.js
│   └── ...
├── utils/                 # Utility functions (e.g., Stripe, Firebase admin)
│   └── stripe.js
├── .env                   # Environment variables
├── server.js              # Entry point
└── package.json
