const mongoose = require('mongoose');

// Cart Item Schema
const cartItemSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  registrationFee: { type: Number, required: true },
});

// Order Schema
const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true }, // Unique order ID from the payment gateway
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Success', 'Failure', 'Aborted', 'Invalid', 'Timeout'], // Payment status
    default: 'Pending',
  },
  paymentDetails: {
    // Store additional details like transaction ID, etc.
    transactionId: { type: String },
    paymentMode: { type: String },
    amount: { type: Number },
    date: { type: Date, default: Date.now },
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  profileImage: { type: String },
  phoneNumber: { type: String },
  collegeName: { type: String },
  collegeRollNumber: { type: String },
  city: { type: String },
  state: { type: String },
  isAmritaChennaiStudent: { type: Boolean, default: false },
  department: { type: String },
  // Events the user is registered for
  registeredEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
  cart: [cartItemSchema], // Cart items embedded directly
  orders: [orderSchema], // List of user's orders and payment details
});

const User = mongoose.model('User', userSchema);

module.exports = User;
