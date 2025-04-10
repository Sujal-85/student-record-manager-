const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
require('dotenv').config(); // Load environment variables

const app = express();

// Improved MongoDB connection with better error handling
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://sujay:sujay123@studentmanagement.gpm4ms2.mongodb.net/?retryWrites=true&w=majority&appName=studentManagement', {
      useNewUrlParser: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

connectDB(); // Initialize database connection

// Middleware
app.use(express.json());

// Enhanced CORS configuration
app.use(cors({
  origin:'https://student-record-manager.vercel.app/',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/student', studentRoutes); // Changed to plural for RESTful convention

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
