
const mongoose = require('mongoose');
const validator = require('validator');

// user model definition
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        unique: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid email format'],
    },
    verificationCode: {
        type: String,
    },
    verified: {
        type: Boolean,
    },
    fullName: {
        type: String,
        // required: [true, 'Full name is required'],
    },
    registrationNumber: {
        type: String,
        // required: [true, 'Registration number is required'],
    },
    password: {
        type: String,
        // required: [true, 'Password is required'],
    },
});

// Create the User model using the user schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;







// const mongoose = require('mongoose');
// const { isEmail } = require('validator');
// // Define the user schema
// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         lowercase: true,
//         unique: true,
//         trim: true
//     },
//     verificationCode: {
//         type: String
//     },
//     verified: {
//         type: Boolean
//     },

//     fullName: {
//         type: String,
//         required: true,
//     },
//     registrationNumber: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
// });

// // Create the User model using the user schema
// const User = mongoose.model('User', userSchema);
// // Export the User model
// module.exports = User;
