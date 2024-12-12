const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const xlsx = require('xlsx');
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

router.post('/add', async (req, res) => {
  const {
    title,
    description,
    date,
    time,
    location,
    capacity,
    documents,
    clubName,
    thumbnail,
    registrationFee,
  } = req.body;

  try {
    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      capacity,
      documents,
      clubName,
      thumbnail,
      registrationFee,
    });

    await newEvent.save();
    res.status(201).json({
      message: 'Event created successfully!',
      event: newEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating event' });
  }
});

// In the eventRoute.js file
router.get('/:eventId/registrations', async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({
      registeredUsers: event.registeredUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching registrations' });
  }
});

// Route to export registration details as an Excel file
router.get('/:eventId/registrations/excel', async (req, res) => {
  const { eventId } = req.params;

  try {
    const id = mongoose.Types.ObjectId(eventId);
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const registeredUsers = event.registeredUsers;

    if (registeredUsers.length === 0) {
      return res.status(404).json({ message: 'No registrations found' });
    }

    // Create Excel worksheet
    const ws = xlsx.utils.json_to_sheet(
      registeredUsers.map((user) => ({
        Name: user.name,
        Email: user.email,
        'Phone Number': user.phoneNumber,
        'Registration Date': new Date(user.registrationDate).toLocaleString(),
      }))
    );

    // Create Excel workbook
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Registrations');

    // Set response headers for file download
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=registrations.xlsx'
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    // Send the Excel file as response
    res.send(xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating Excel file' });
  }
});

// Route to get event details by ID
router.get('/:eventId', async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId); // Find event by ID
    if (!event) {
      return res.status(404).json({ message: 'Event not found' }); // Handle if event is not found
    }

    res.status(200).json(event); // Return the event details
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching event details' }); // Handle errors
  }
});

module.exports = router;
