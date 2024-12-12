const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');

// Route to get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events from the database
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Route to register a user for an event
router.post('/:eventId/register', async (req, res) => {
  const { eventId } = req.params;
  const { email } = req.body; // Email is sent in the request body

  try {
    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the user is already registered
    const isUserRegistered = event.registeredUsers.some(
      (user) => user.email === email
    );
    if (isUserRegistered) {
      return res
        .status(400)
        .json({ message: 'User already registered for this event' });
    }

    // Check if the event has reached capacity
    if (event.registeredUsers.length >= event.capacity) {
      return res.status(400).json({ message: 'Event is fully booked' });
    }

    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the user to the registeredUsers array
    event.registeredUsers.push({
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
    });

    await event.save();
    res.status(200).json({ message: 'User registered successfully', event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user for event' });
  }
});

module.exports = router;
