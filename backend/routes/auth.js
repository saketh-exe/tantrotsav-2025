// routes/auth.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// check if user exists
router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User exists', user });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found', code: 404 });
    }

    res.status(200).json({ message: 'User found', user, code: 200 });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

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
    const {
      email,
      name,
      profileImage,
      phoneNumber,
      collegeName,
      collegeRollNumber,
      city,
      state,
      isAmritaChennaiStudent,
      department,
    } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({
      email,
      name,
      profileImage,
      phoneNumber,
      collegeName,
      collegeRollNumber,
      city,
      state,
      isAmritaChennaiStudent,
      department,
      registeredEvents: [],
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

router.post('/update', async (req, res) => {
  try {
    const {
      email,
      name,
      profileImage,
      phoneNumber,
      collegeName,
      collegeRollNumber,
      city,
      state,
      isAmritaChennaiStudent,
      department,
    } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;
    user.profileImage = profileImage;
    user.phoneNumber = phoneNumber;
    user.collegeName = collegeName;
    user.collegeRollNumber = collegeRollNumber;
    user.city = city;
    user.state = state;
    user.isAmritaChennaiStudent = isAmritaChennaiStudent;
    user.department = department;

    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

module.exports = router;
