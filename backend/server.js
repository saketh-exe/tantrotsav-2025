// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/eventRoute');
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoute');
const ccavenueRoutes = require('./routes/ccavenueRoute'); // Import the CCAvenue route
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from a .env file

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Use the auth routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ticket', ticketRoutes);

app.use('/api', ccavenueRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
