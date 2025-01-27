// routes/userRoutes.js
const express = require('express');
const User = require('../models/User'); // Import the User model
const Event = require('../models/Event'); // Import the Event model
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.get('/:email/cart', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email }).populate('cart.eventId');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add event to user's cart
router.post('/:email/cart', async (req, res) => {
  const { email } = req.params;
  const { eventId } = req.body;

  try {
    // Validate event existence
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Find user and update cart
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if event is already in cart
    const isEventInCart = user.cart.some(
      (item) => item.eventId.toString() === eventId
    );

    const isEventAlreadyRegistered = user.registeredEvents.includes(eventId);
  
    if (isEventAlreadyRegistered) {
      return res.status(400).json({ error: 'Event already registered' });
    }

    if (isEventInCart) {
      return res.status(400).json({ error: 'Event already in cart' });
    }

    // Add event to cart
    user.cart.push({
      eventId,
      registrationFee: event.registrationFee || 0,
    });
    await user.save();

    res.status(200).json({ message: 'Event added to cart', cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:email/cart/:eventId', async (req, res) => {
  const { email, eventId } = req.params;
  // console.log(email, eventId);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.cart = user.cart.filter((item) => item.eventId._id != eventId);
    await user.save();

    res.status(200).json({ message: 'Item removed from cart', user: user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
