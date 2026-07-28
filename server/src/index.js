const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

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

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  DHAJ Menswear Backend Server Running on Port ${PORT}`);
  console.log(`  APNI DHAJ. APNA ANDAAZ.`);
  console.log(`====================================================`);
});
