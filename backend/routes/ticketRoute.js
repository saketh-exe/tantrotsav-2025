// routes/ticket.js
const express = require('express');
const Ticket = require('../models/Ticket');
const router = express.Router();
const sendNotification = require('../utils/ntfynotifier');

// POST route to create a new ticket
router.post('/', async (req, res) => {
  const { name, email, category, message } = req.body;

  try {
    const ticket = await Ticket.create({ name, email, category, message });

    await sendNotification({ name, email, category, message })

    res.status(201).json({ message: 'Ticket created successfully', ticket });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;