const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  time: { type: String },
  location: { type: String },
  documents: { type: String },
  clubName: { type: String, required: true }, // Club name organizing the event
  thumbnail: { type: String }, // Event thumbnail image URL
  registrationFee: { type: Number, default: 0 }, // Registration fee (if any)
  teamSize: { type: Number, default: 1 }, // Team size (default is 1)
  prize1st: { type: Number },
  prize2nd: { type: Number },
  contact1: { type: String },
  contact1num: { type: String },
  contact2: { type: String },
  contact2num: { type: String },
  type: { type: String }, 
  registeredUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    },
  ],
});

// Add an index for efficient queries on registered users
eventSchema.index({ registeredUsers: 1 });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
