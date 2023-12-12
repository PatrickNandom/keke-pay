const express = require('express');
const paymentRouter = express.Router();
const { getAllPayments, getPaymentsOfSingleUser } = require('../controllers/paymentHistory')

paymentRouter.get('/all-payments', getAllPayments);
paymentRouter.get('/payments/:userId', getPaymentsOfSingleUser)

module.exports = paymentRouter;
