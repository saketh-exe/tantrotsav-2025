const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const xlsx = require('xlsx');
const User = require('../models/User');

const departments = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'];

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

// Route to get hardcoded departments
router.get('/departments', (req, res) => {
  res.status(200).json(departments);
});

router.post('/add', async (req, res) => {
  const {
    title,
    description,
    date,
    time,
    location,
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

// Route to update event details by ID
router.put('/:eventId', async (req, res) => {
  const { eventId } = req.params;
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
    const event = await Event.findById(eventId); // Find event by ID
    if (!event) {
      return res.status(404).json({ message: 'Event not found' }); // Handle if event is not found
    }

    event.title = title;
    event.description = description;
    event.date = date;
    event.time = time;
    event.location = location;
    event.capacity = capacity;
    event.documents = documents;
    event.clubName = clubName;
    event.thumbnail = thumbnail;
    event.registrationFee = registrationFee;

    await event.save(); // Save the updated event details
    res.status(200).json({ message: 'Event updated successfully', event }); // Return success message
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating event' }); // Handle errors
  }
});

// Route to filter users by department
router.get('/:department/registrations', async (req, res) => {
  const { department } = req.params;

  // Check if the department is valid
  if (!departments.includes(department)) {
    return res.status(400).json({ message: 'Invalid department' });
  }

  try {
    // Find users by department
    const users = await User.find({ department }); // Assuming `department` is a field in the User model
    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: 'No users found in this department' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = router;
