# DHAJ — Premium Pakistani Menswear E-Commerce Platform

**Brand**: DHAJ  
**Tagline**: *APNI DHAJ. APNA ANDAAZ. (APNI DHAJ. APNA ANDAAZ.)*  
**Tech Stack**: Full-Stack JavaScript (React/Vite Frontend + Node.js/Express Backend + MongoDB Database)

This repository contains the complete full-stack codebase for **DHAJ**, a premium luxury Pakistani menswear e-commerce platform featuring an elegant black & antique metallic-gold design system, rich product catalog filtering, interactive outfit builders, virtual wardrobes, style quizzes, and a serverless backend deployment architecture for Vercel.

---

## 📁 Repository Structure

```
Dhaj/
├── client/                 # React + Vite Frontend (Tailwind CSS, Zustand, Framer Motion)
│   ├── public/             # Static public assets (including official DHAJ Logo)
│   ├── src/                # Frontend source code
│   │   ├── components/     # Reusable layout and interactive components
│   │   ├── pages/          # 26 dedicated pages (Home, Shop, AI Stylist, quiz, etc.)
│   │   ├── store/          # Zustand client state stores (Auth, Cart, Wishlist, AI)
│   │   ├── lib/            # Axios API config
│   │   ├── App.jsx         # App router and loader hook
│   │   └── main.jsx        # App entry point
│   ├── package.json        # Frontend scripts and dependencies
│   ├── vercel.json         # Vercel client-side SPA routing rules
│   └── .env                # Client environment config
│
├── server/                 # Node.js + Express REST API Backend (Mongoose, JWT)
│   ├── src/
│   │   ├── config/         # Connection and config helpers
│   │   ├── controllers/    # Route controllers (Auth, Products, Orders, AI Engine)
│   │   ├── models/         # Mongoose Schemas (User, Product, Order, WardrobeItem)
│   │   ├── routes/         # Backend Express API router endpoints
│   │   ├── seed.js         # Standalone MongoDB database catalog seeder
│   │   └── index.js        # Main backend entry point
│   ├── package.json        # Backend scripts and dependencies
│   ├── vercel.json         # Vercel backend serverless function adapter
│   └── .env                # Backend local environment keys
```

---

## 🛠️ Local Development Setup

### 1. Prerequisite
Ensure [Node.js](https://nodejs.org) is installed on your computer.

### 2. Set Up Backend API Server
1. Navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your environment variables. Create a `.env` file in the `server/` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/dhaj
   JWT_SECRET=dhaj_secret_key_2026_luxury_brand
   ```
   *Note: If a local MongoDB instance is not running on port 27017, the server will log a connection failure and automatically fall back to serving mock data in-memory so the frontend remains fully functional.*

4. Run the database seeding script (requires active MongoDB connection):
   ```bash
   node src/seed.js
   ```

5. Start the backend development server:
   ```bash
   node src/index.js
   ```
   *The API will be available at `http://localhost:5000`.*

### 3. Set Up Frontend client
1. Open a new terminal and navigate to the `client/` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your API base URL. Create a `.env` file in the `client/` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   node ./node_modules/vite/bin/vite.js
   ```
   *The frontend will run at `http://localhost:5173/`.*

---

## 🚀 Cloud Database Setup & Vercel Deployment

For a full production deployment with a live database connection on Vercel:

### Step 1: Create a Free MongoDB Atlas Database
1. Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new shared cluster (`M0` free tier).
3. Under **Database Access**, create a user (e.g., `dhaj_user`) with read/write permissions.
4. Under **Network Access**, add an IP rule allowing access from anywhere (`0.0.0.0/0`) so that Vercel's serverless functions can connect.
5. Copy your connection string from the connection modal.

### Step 2: Seed the Cloud Database
1. Update your local `server/.env` file's `MONGODB_URI` with your copied MongoDB Atlas connection string.
2. Run the seeding command to populate your cloud database with the premium menswear catalog:
   ```bash
   node src/seed.js
   ```

### Step 3: Deploy the Backend to Vercel
1. Run the Vercel CLI helper inside the `server/` directory:
   ```bash
   npx vercel
   ```
2. Complete the setup. Once deployed, note down your production API URL (e.g., `https://dhaj-backend.vercel.app`).
3. Add the following **Environment Variables** in your Vercel Project settings dashboard:
   - `MONGODB_URI` = *Your MongoDB Atlas connection string*
   - `JWT_SECRET` = `dhaj_secret_key_2026_luxury_brand`
4. Redeploy the project from your dashboard to apply the variables.

### Step 4: Deploy the Frontend to Vercel
1. Create a `.env.production` file in your `client/` directory with your deployed backend URL:
   ```env
   VITE_API_URL=https://dhaj-backend.vercel.app/api
   ```
2. Run the Vercel CLI helper inside the `client/` directory:
   ```bash
   npx vercel
   ```
3. Complete the setup. Your live frontend is now connected to your Express serverless functions and MongoDB Atlas database.
