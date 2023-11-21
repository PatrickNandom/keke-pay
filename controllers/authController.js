const bcrypt = require('bcrypt')
const randomize = require('randomatic');
const { google } = require('googleapis')
const User = require('../models/User');
const nodemailer = require('nodemailer');

require('dotenv').config();


const CLIENT_ID = process.env.CLIENT_ID;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const userEmails = process.env.email;

const OAuth2client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
OAuth2client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(userEmail, verifyingCode) {

    try {
        const accessToken = await OAuth2client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: userEmails,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: 'Keke-Pay <patricknandom82@gmail.com>',
            to: userEmail,
            subject: 'Verfication code',
            text: `Your verification code is ${verifyingCode}`
        }

        const result = transport.sendMail(mailOptions);
        return result
    } catch (error) {
        console.log(error.message);
    }
}


// Function to send a verification code to the user's email
exports.sendVerificationCode = async (req, res) => {
    try {
        const { email } = req.body;
        // console.log(`from sendVerification ${email}`);

        // Generate a random 6-digit verification code
        const verificationCode = randomize('0', 6);

        const sendSomeEmail = await sendMail(email, verificationCode);
        console.log('Email sent', sendSomeEmail);

        // console.log(`from sendVerification ${verificationCode}`);
        // console.log('===========================================');
        req.session.email = email;
        req.session.verificationCode = verificationCode;
        res.status(200).json({ message: 'Verification code sent successfully' });
    } catch (error) {
        console.error(error);
        // Handle errors and respond with a 500 Internal Server Error
        res.status(500).json({ message: 'Error sending verification code.' });
    }
};

// confirm verification logic
exports.confirmVerificationCode = async (req, res) => {
    try {
        const { codeToConfirm } = req.body;
        // console.log(`from req.body ${codeToConfirm}`);

        const storedCode = req.session.verificationCode
        // console.log(`from confirm code ${storedCode}`);


        if (storedCode !== codeToConfirm) {
            return res.status(401).json({ message: 'Invalid verification code' });
        }

        // Respond with a success message
        res.status(200).json({ message: 'Verification code confirmed successfully' });

    } catch (error) {
        console.error(error);
        // Handle errors and respond with a 500 Internal Server Error
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Final Registration Step
exports.registerUser = async (req, res) => {
    try {
        const email = req.session.email;
        // Extract user information from the request body
        const { fullName, registrationNumber, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'password do not match' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Create a new user with the collected data
        const newUser = new User({
            email,
            fullName,
            registrationNumber,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Registration failed.' });
    }
};



//Login User 
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user with the provided phone number
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        // Set up a session for the authenticated user
        req.session.user = user;

        res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Login failed.' });
    }
};

