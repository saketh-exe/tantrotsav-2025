const mongoose = require('mongoose');

// Event Schema (optional, if you want to store events in a separate collection)
const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  // Add more event-specific fields as necessary
});

// Cart Item Schema
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  // Add any other cart-related information if needed
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  profileImage: { type: String },
  events: [eventSchema], // Store events directly in the user schema
  cart: [cartItemSchema], // Store cart items directly in the user schema
});

const User = mongoose.model('User', userSchema);

module.exports = User;
