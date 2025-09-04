# 🍔 Dan’s Den – Food Delivery App

A **full-stack food delivery platform** built with the **MERN stack**. Users can browse menus, add items to cart, place orders, and make secure online payments.

## 🚀 Features
- 🔐 **Authentication & Authorization** – User sign-up, login, and JWT-based session management.
- 📦 **Order Management** – Add to cart, checkout, and track orders in real time.
- 💳 **Payments** – Secure payment integration with Stripe API.
- ☁️ **Image Handling** – Cloudinary integration for optimized food images and assets.
- 🎨 **Modern UI** – Responsive, mobile-friendly interface with React, TailwindCSS, and Zustand for state management.

## 🛠️ Tech Stack
**Frontend:**
- React.js, Vite
- Tailwind CSS, DaisyUI, Framer Motion
- React Router, Axios, Zustand

**Backend:**
- Node.js, Express.js
- MongoDB with Mongoose
- JWT Authentication, Bcrypt for password hashing
- Stripe API, Cloudinary, Multer

## 📂 Project Structure
```
/frontend   -> React.js app (UI, components, state management)
/backend    -> Express.js server (APIs, authentication, database, payments)
```

## ⚡ Getting Started

### Prerequisites
- Node.js (>=18)
- MongoDB (local or cloud e.g., MongoDB Atlas)
- Stripe account (for payments)
- Cloudinary account (for image storage)

### Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/PrathameshPowar-dan/Food-Delivery.git
   cd Food-Delivery
   ```

2. Install dependencies for both frontend and backend  
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. Set up environment variables in `.env` (backend folder):  
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET=your_stripe_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Start the development servers  
   - Frontend:  
     ```bash
     cd frontend
     npm run dev
     ```  
   - Backend:  
     ```bash
     cd backend
     npm run dev
     ```

## 🌐 Deployment
- Frontend deployed on **Netlify/Vercel**  
- Backend deployed on **Render/Heroku**  

## 📸 Screenshots
_Add screenshots/gifs of the app here._

## 👨‍💻 Author
**Prathamesh Powar**  
- [LinkedIn](https://www.linkedin.com/in/prathamesh-powar-dan/)  
- [GitHub](https://github.com/PrathameshPowar-dan)
