const mongoose = require('mongoose');
const { isEmail } = require('validator');
// Define the user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },

    fullName: {
        type: String,
        required: true,
    },
    registrationNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Create the User model using the user schema
const User = mongoose.model('User', userSchema);
// Export the User model
module.exports = User;
