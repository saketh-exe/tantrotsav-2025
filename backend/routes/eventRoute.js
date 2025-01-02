const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const xlsx = require('xlsx');
const User = require('../models/User');
const mongoose = require('mongoose');

const departments = ['CSE', 'CYS', 'AIE', 'ECE', 'RAI', 'ARE', 'MECH', 'CCE'];

// Route to get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events from the database
    events.forEach(event => {
      if (event.isHidden === undefined) {
      event.isHidden = false;
      }
    });
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

// Event Adding
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
    teamSize,
    prize1st,
    prize2nd,
    contact1,
    contact1num,
    contact2,
    contact2num,
    type,
    isHidden,
    duration
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
      teamSize,
      prize1st,
      prize2nd,
      contact1,
      contact1num,
      contact2,
      contact2num,
      type,
      isHidden,
      duration
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

    const userDataPromises = event.registeredUsers.map(async (user) => {
      return await User.findById(user);
    });

    const UserData = await Promise.all(userDataPromises);

    res.status(200).json(UserData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching registrations' });
  }
});

// Route to export registration details as an Excel file
router.get('/:eventId/registrations/excel', async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const registeredUsers = event.registeredUsers;

    if (registeredUsers.length === 0) {
      return res.status(404).json({ message: 'No registrations found' });
    }

    // Fetch User and Event Data
    const userDataPromises = registeredUsers.map((user) => User.findById(user));
    const userData = await Promise.all(userDataPromises);

    // Helper function to fetch event names
    const getEventName = async (eventId) => {
      const event = await Event.findById(eventId);
      return event ? event.title : 'Unknown Event';
    };

    // Prepare data for the Excel sheet
    const sheetDataPromises = userData.map(async (user) => {
      const eventNames = await Promise.all(
        (user.orders?.[0]?.events || []).map(getEventName)
      );

      return {
        Name: user.name,
        Email: user.email,
        'Phone Number': user.phoneNumber,
        Department: user.department,
        'Event Names': eventNames.join(', '),
        'Transaction ID': user.orders?.[0]?.paymentDetails?.transactionId || 'N/A',
        'Payment Mode': user.orders?.[0]?.paymentDetails?.paymentMode || 'N/A',
        Amount: user.orders?.[0]?.paymentDetails?.amount || 'N/A',
        'Payment Status': user.orders?.[0]?.paymentStatus || 'N/A',
        'Registration Date': new Date(user.orders?.[0]?.paymentDetails?.date).toLocaleString(),
      };
    });

    const sheetData = await Promise.all(sheetDataPromises);

    // Create Excel worksheet
    const ws = xlsx.utils.json_to_sheet(sheetData);

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
    var event = await Event.findById(eventId); // Find event by ID
    if (event.isHidden === undefined) {
      event.isHidden = false;
    }
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
    teamSize,
    prize1st,
    prize2nd,
    contact1,
    contact1num,
    contact2,
    contact2num,
    type,
    isHidden,
    duration
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
    event.teamSize = teamSize;
    event.prize1st = prize1st;
    event.prize2nd = prize2nd;
    event.contact1 = contact1;
    event.contact1num = contact1num;
    event.contact2 = contact2;
    event.contact2num = contact2num;
    event.type = type;
    event.isHidden = isHidden,
      event.duration = duration

    await event.save(); // Save the updated event details
    res.status(200).json({ message: 'Event updated successfully', event }); // Return success message
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating event' }); // Handle errors
  }
});

// Route to filter users by department
router.get('/department/:department/registrations', async (req, res) => {
  const { department } = req.params;

  // Check if the department is valid
  if (!departments.includes(department)) {
    return res.status(400).json({ message: 'Invalid department' });
  }

  try {
    // Find users by department
    var users = await User.find({ department }); // Assuming `department` is a field in the User model

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: 'No users found in this department' });
    }

    // filter out users who have registeredEvents attribute of length 0
    users = users.filter((user) => user.registeredEvents.length > 0);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

router.get('/department/:department/registrations/excel', async (req, res) => {
  const { department } = req.params;

  if (!departments.includes(department)) {
    return res.status(400).json({ message: 'Invalid department' });
  }

  try {
    var users = await User.find({ department });

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: 'No users found in this department' });
    }

    users = users.filter((user) => user.registeredEvents.length > 0);

    // Helper function to fetch event names
    const getEventName = async (eventId) => {
      const event = await Event.findById(eventId);
      return event ? event.title : 'Unknown Event';
    };

    // Prepare data for the Excel sheet
    const sheetDataPromises = users.map(async (user) => {
      const eventNames = await Promise.all(
        (user.orders?.[0]?.events || []).map(getEventName)
      );

      return {
        Name: user.name,
        Email: user.email,
        'Phone Number': user.phoneNumber,
        Department: user.department,
        'Event Names': eventNames.join(', '),
        'Transaction ID': user.orders?.[0]?.paymentDetails?.transactionId || 'N/A',
        'Payment Mode': user.orders?.[0]?.paymentDetails?.paymentMode || 'N/A',
        Amount: user.orders?.[0]?.paymentDetails?.amount || 'N/A',
        'Payment Status': user.orders?.[0]?.paymentStatus || 'N/A',
        'Registration Date': new Date(user.orders?.[0]?.paymentDetails?.date).toLocaleString(),
      };
    });

    const sheetData = await Promise.all(sheetDataPromises);

    // Create Excel worksheet
    const ws = xlsx.utils.json_to_sheet(sheetData);

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


module.exports = router;
