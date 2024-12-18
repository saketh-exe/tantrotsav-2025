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

// User Schema
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

  // Additional fields can be added if needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
