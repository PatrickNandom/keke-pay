const Payment = require('../models/Payment')

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch all payments' });
    }
};

exports.getPaymentsOfSingleUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const payments = await Payment.find({ user: userId });
        res.status(200).json(payments);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch payment history for this user' })
    }
}
