require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Safe database connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.warn('WARNING: MONGODB_URI is not defined in the environment variables. Using mock in-memory data.');
      return;
    }
    await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected successfully to ${mongoose.connection.host}`);
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    console.warn('Falling back to mock in-memory data due to database connection failure.');
  }
};
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static logo & uploads
app.use('/public', express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api', apiRoutes);

// Healthcheck
app.get('/health', (req, res) => {
  res.json({ status: 'online', brand: 'DHAJ', tagline: 'APNI DHAJ. APNA ANDAAZ.', timestamp: new Date() });
});

// Conditionally start local server if not on Vercel
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`  DHAJ Menswear Backend Server Running on Port ${PORT}`);
    console.log(`  APNI DHAJ. APNA ANDAAZ.`);
    console.log(`====================================================`);
  });
}

module.exports = app;

