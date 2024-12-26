const express = require('express');
const CCAvenue = require('../utils/CCAvenue');
const User = require('../models/User'); // Import User model
const Event = require('../models/Event'); // Import Event model
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from a .env file

const router = express.Router();

const deployed_url = process.env.DEPLOYED_URL || 'http://localhost:3000';

// Handle CCAvenue response
router.post('/ccavenue-handle', async (req, res) => {
  try {
    // Decrypt the Response Data from Request Body
    const data = CCAvenue.redirectResponseToJson(req.body.encResp);

    // Check if decryption was successful
    if (!data) {
      console.error('Failed to decrypt response');
      return res.redirect(302, `${deployed_url}/failed`);
    }

    const email = data.billing_email;
    const orderId = data.order_id;

    if (!email || !orderId) {
      console.error('Missing userId or orderId in response');
      return res.redirect(302, `${deployed_url}/failed`);
    }

    // Fetch user
    const user = await User.findOne({ email }).populate('cart.eventId');

    if (!user) {
      console.error(`User not found for email: ${email}`);
      return res.redirect(302, `${deployed_url}/failed`);
    }

    // Fetch cart events
    const cartEvents = user.cart.map((item) => item.eventId?._id);

    if (data.order_status === 'Success') {
      // Avoid processing if no events in the cart
      if (!cartEvents.length) {
        console.error('No events in the user cart to process');
        return res.redirect(302, `${deployed_url}/failed`);
      }

      // Create a new order
      const newOrder = {
        orderId,
        paymentStatus: 'Success',
        paymentDetails: {
          transactionId: data.tracking_id || null,
          paymentMode: data.payment_mode || 'Unknown',
          amount: parseFloat(data.amount) || 0,
          date: Date.now(),
        },
        events: cartEvents,
      };

      // Update user data: registered events, orders, and clear cart
      user.registeredEvents.push(...cartEvents);
      user.orders.push(newOrder);
      user.cart = [];
      await user.save();

      // Update event registrations
      await Event.updateMany(
        { _id: { $in: cartEvents } },
        { $addToSet: { registeredUsers: user._id } }
      );

      console.log(`Payment success for user ${email}, order ${orderId}`);
      return res.redirect(302, `${deployed_url}/success`);
    } else {
      // Handle failed payment
      const failedOrder = {
        orderId,
        paymentStatus: 'Failure',
        paymentDetails: {
          transactionId: data.tracking_id || null,
          paymentMode: data.payment_mode || 'Unknown',
          amount: parseFloat(data.amount) || 0,
          date: Date.now(),
        },
        events: cartEvents,
      };

      // Save failed order but keep cart intact
      user.orders.push(failedOrder);
      await user.save();

      console.error(`Payment failed for user ${email}, order ${orderId}`);
      return res.redirect(302, `${deployed_url}/failed`);
    }
  } catch (error) {
    console.error('Error processing CCAvenue request:', error);

    // Redirect to Payment Failed Page
    return res.redirect(302, `${deployed_url}/failed`);
  }
});

// Default route for unsupported methods
router.all('/ccavenue-handle', (req, res) => {
  res.status(405).send('Method Not Allowed');
});

module.exports = router;
