// routes/auth.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// POST route for login
router.post('/login', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      // If the user doesn't exist, return a 404 and message indicating user doesn't exist
      return res
        .status(404)
        .json({ message: 'User not found, please complete your profile.' });
    }

    // If user exists, return a success response with the user info
    res.status(200).json({ message: 'User exists', user });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// POST route to create a new user (sign-up process)
router.post('/register', async (req, res) => {
  try {
    const { email, name, profileImage } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({
      email,
      name,
      profileImage,
      event: [],
      cart: [],
    });
    await newUser.save();

    res
      .status(201)
      .json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

module.exports = router;
