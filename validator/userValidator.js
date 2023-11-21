const { check, validationResult } = require('express-validator');

const validateUserRegistration = [
    // check('phoneNumber').isMobilePhone('any').withMessage('Please provide a valid phone number.'),
    check('fullName').notEmpty().withMessage('Full name is required.'),
    check('registrationNumber').isString().withMessage('Registration number must be a string.'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match.');
        }
        return true;
    }),
];

const validateRegistrationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return res.status(400).json({ errors: errorMessages });
    }

    next();
};

module.exports = {
    validateUserRegistration,
    validateRegistrationErrors,
};
