// routes/auth.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const Admins = require('../models/Admins');
const Logs = require('../models/Logs');
const { sendSecurityNotification } = require('../utils/ntfynotifier');

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

router.post("/adminlogin", async (req, res) => {
  const { password } = req.body;

  try {
    const person = await Admins.findOne({ password });
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }

    const tokenPayload = { name: person.username, role: person.role };

    // Set a secure HTTP-only cookie for login persistence
    res.cookie("auth_token", JSON.stringify(tokenPayload), {
      httpOnly: true, // Prevent access via JavaScript
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "strict", // Prevent CSRF
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiry
    });

    // new log
    const newLog = new Logs({
      "message": `${person.username} logged in of role ${person.role}`,
    });

    await newLog.save();

    if (person.role == "admin") {
      sendSecurityNotification(`${person.username} has logged in`);
    }

    res.status(200).json({ message: 'Login successful', personData: tokenPayload });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get("/validate", (req, res) => {
  try {
    const authToken = req.cookies.auth_token;
    console.log(authToken);

    if (!authToken) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const tokenPayload = JSON.parse(authToken);

    // Return the user's role
    res.status(200).json({ message: 'Authentication valid', role: tokenPayload.role });
  } catch (error) {
    res.status(500).json({ error: 'Failed to validate authentication' });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

router.post('/adduser', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const userExists = await Admins.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new Admins({
      username,
      password,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add user', error });
  }
});


module.exports = router;
