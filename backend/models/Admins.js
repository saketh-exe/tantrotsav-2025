const mongoose = require('mongoose');

// create a mongoose schema which will store the user name and password

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

// create a model for the schema
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;