const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Import all routes
const uploadRoutes = require('./routes/uploads');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const ideaRoutes = require('./routes/ideaRoutes'); // Import idea routes

// Load environment variables
dotenv.config({ path: './.env' });

// Connect to the database
connectDB();

const app = express();

// --- CORS Configuration ---
// Allow all origins (no restrictions)
app.use(cors());
// --- End of Configuration ---

// Middleware to parse JSON bodies
app.use(express.json());

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/uploads', uploadRoutes);
app.use('/api/v1/ideas', ideaRoutes); // Use idea routes

// Simple test route for the root URL
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
