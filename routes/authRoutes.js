const express = require('express');
const authRouter = express.Router();
const { sendVerificationCode, confirmVerificationCode, registerUser, loginUser } = require('../controllers/authController');
const { validateUserRegistration, validateRegistrationErrors, } = require('../validator/userValidator');

authRouter.post('/send-code', sendVerificationCode);
authRouter.post('/confirm-code', confirmVerificationCode);
authRouter.post('/register', validateUserRegistration, validateRegistrationErrors, registerUser);
authRouter.post('/login', loginUser);


module.exports = authRouter;
