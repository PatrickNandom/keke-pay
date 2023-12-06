// //Update user model
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     kekeRegNo: { type: String, required: true, unique: true },
//     balance: { type: Number, default: 0 }, // Add this line
//     // ... other fields ...
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
// //Transaction model
// const mongoose = require('mongoose');

// const transactionSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     date: { type: Date, default: Date.now },
//     description: { type: String, required: true },
//     amount: { type: Number, required: true },
//     receiptNumber: { type: String, required: true, unique: true },
//     status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
//     // Add any other fields you need
// });

// const Transaction = mongoose.model('Transaction', transactionSchema);

// module.exports = Transaction;

// //wallet deduction logic
// const schedule = require('node-schedule');
// const Transaction = require('./models/Transaction');
// const User = require('./models/User');

// // Schedule the deduction to run daily at a specific time (adjust as needed)
// schedule.scheduleJob('0 0 * * *', async () => {
//     try {
//         const users = await User.find();

//         // Deduct N100 from each user's balance
//         for (const user of users) {
//             if (user.balance >= 100) {
//                 user.balance -= 100;

//                 // Create a transaction record
//                 const transaction = new Transaction({
//                     user: user._id,
//                     description: 'Daily Deduction',
//                     amount: 100,
//                     receiptNumber: generateUniqueReceiptNumber(), // Implement this function
//                     status: 'completed',
//                 });

//                 await user.save();
//                 await transaction.save();
//             }
//         }
//     } catch (error) {
//         console.error('Error during daily deduction:', error);
//     }
// });

// function generateUniqueReceiptNumber() {
//     // Implement a function to generate a unique receipt number
//     // This could involve a combination of date/time and a random component
//     // Return a string representing the unique receipt number
// }


// // QR code generation logic

// const qrcode = require('qrcode');

// async function generateUniqueQRCode(text) {
//     try {
//         const qrCodeImage = await qrcode.toDataURL(text);
//         return qrCodeImage;
//     } catch (error) {
//         console.error('Error generating QR code:', error);
//         return null;
//     }
// }


// //Adding fund with card
// /*

// Certainly, integrating card payments with PayPal involves a few additional steps. Instead of using the PayPal REST SDK, you can use the Braintree SDK, which is owned by PayPal and supports a variety of payment methods, including credit cards.

// Here's a guide on how to implement card payments with Braintree:

// 1. Install the Braintree SDK:
// First, install the Braintree SDK for Node.js:
// //npm install braintree

// 2. Set Up Braintree Configuration:
// In your Express application, configure Braintree with your API credentials. You can find these credentials in your Braintree account.
// */
// const express = require('express');
// const router = express.Router();
// const braintree = require('braintree');

// const gateway = new braintree.BraintreeGateway({
//     environment: braintree.Environment.Sandbox, // Use 'Production' in a live environment
//     merchantId: 'YOUR_MERCHANT_ID',
//     publicKey: 'YOUR_PUBLIC_KEY',
//     privateKey: 'YOUR_PRIVATE_KEY',
// });

// router.post('/add-funds', async (req, res) => {
//     const { userId, amount, paymentMethodNonce } = req.body;

//     try {
//         // Create a Braintree transaction
//         const result = await gateway.transaction.sale({
//             amount,
//             paymentMethodNonce,
//             options: {
//                 submitForSettlement: true,
//             },
//         });

//         if (result.success) {
//             // Transaction succeeded
//             const user = await User.findById(userId);
//             user.balance += parseFloat(amount);
//             await user.save();

//             // Save transaction details to your database
//             const transaction = new Transaction({
//                 user: user._id,
//                 date: new Date(),
//                 description: 'Adding funds to wallet',
//                 amount: parseFloat(amount),
//                 receiptNumber: generateUniqueReceiptNumber(),
//                 status: 'completed',
//             });
//             await transaction.save();

//             res.status(200).json({ message: 'Payment successful' });
//         } else {
//             // Transaction failed
//             res.status(400).json({ error: result.message });
//         }
//     } catch (error) {
//         console.error('Error processing payment:', error);
//         res.status(500).json({ error: 'Error processing payment' });
//     }
// });

// /*
// 3. Frontend:
// On the frontend, when users want to add funds, you need to generate a payment method nonce using the Braintree Drop-in UI. This nonce is then sent to your server when making the /add-funds API request.

// Important Notes:
// Ensure that you replace 'YOUR_MERCHANT_ID', 'YOUR_PUBLIC_KEY', and 'YOUR_PRIVATE_KEY' with your actual Braintree API credentials.
// This example uses the Braintree sandbox environment for testing. In a production environment, switch to braintree.Environment.Production.
// Handle security aspects, such as validating inputs, securing API credentials, and using HTTPS for your production environment.
// Follow the Braintree Node.js SDK documentation for more details on customization and error handling.
// Remember that this is a simplified example, and you may need to adapt it to your application's specific requirements. Always refer to the official documentation for the latest information and best practices.

// */

// // Function to generate a unique receipt number

// function generateUniqueReceiptNumber() {
//     // Implement a function to generate a unique receipt number
//     // This could involve a combination of date/time and a random component
//     // Return a string representing the unique receipt number
// }

// module.exports = router;



//FLUTER WAVE IMPLEMENTATION
// install fluter wave using npm:
/*npm install flutterwave - node - v3*/
//end of the installation

// import and initialize fluterwave sdk
/*const Flutterwave = require('flutterwave-node-v3');
const flutterwave = new Flutterwave(API_KEY, SANDBOX_MODE);*/
// Replace API_KEY with your Flutterwave API key
//end of the import and initialisation




/*const Flutterwave = require('flutterwave-node-v3');
const flutterwave = new Flutterwave(API_KEY, SANDBOX_MODE);*/

// Other imports...



// IMPLEMENTATION OF THE ADD FUIND FUNCTION

/*
exports.addFund = async (req, res) => {
    const { amount, cardNumber, mm, yyyy, cvv, pin } = req.body;

    try {
        // Create a payment payload
        const payload = {
            tx_ref: 'unique-transaction-reference', // Generate a unique transaction reference
            amount: parseFloat(amount),
            currency: 'NGN',
            redirect_url: 'https://your-redirect-url.com', // Replace with your redirect URL
            payment_type: 'card',
            card_number: cardNumber,
            cvv: cvv,
            expiry_month: mm,
            expiry_year: yyyy,
            redirect_url: 'https://your-redirect-url.com', // Replace with your redirect URL
            meta: {
                consumer_id: 'your-consumer-id', // Replace with your consumer ID
            },
            customer: {
                email: 'user@email.com', // Replace with the user's email
                phone_number: 'user-phone-number', // Replace with the user's phone number
                name: 'user-full-name', // Replace with the user's full name
            },
        };

        // Initiate payment
        const response = await flutterwave.Payment.plan(payload);

        // Check if the payment initiation was successful
        if (response.status === 'success') {
            // Transaction succeeded
            const user = await User.findById(userId);
            user.balance += parseFloat(amount);
            await user.save();

            // Save transaction details to your database
            const transaction = new Transaction({
                user: user._id,
                date: new Date(),
                description: 'Adding funds to wallet',
                amount: parseFloat(amount),
                receiptNumber: generateUniqueReceiptNumber(),
                status: 'completed',
            });
            await transaction.save();

            // Redirect the user to the Flutterwave payment page
            res.status(200).json({ redirect_url: response.data.link });
        } else {
            // Transaction failed
            res.status(400).json({ error: response.message });
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Error processing payment' });
    }
};

*/








//FLUTTER WAVE DOCUMENTATION FROM PERPLEXITY

/*

app.post('/card', async (req, res) => {
const payload = {
    "card_number": "5531886652142950",
    "cvv": "564",
    "expiry_month": "09",
    "expiry_year": "21",
    "currency": "ZMW",
    "amount": "100",
    "redirect_url": "https://www.google.com", //Put your redirect link here
    "fullname": "Gift Banda",
    "email": "bandagift42@gmail.com",
    "phone_number": "0977560054",
    "enckey": process.env.ENCRYPTION_KEY,
    "tx_ref": "MC-32444ee--4eerye4euee3rerds4423e43e"// This is a unique reference, unique to the particular transaction being carried out. It is generated when it is not provided by the merchant for every transaction.
    }
    try {
        const response = await flw.Charge.card(payload)
        console.log(response)
        if (response.meta.authorization.mode === 'pin') {
            let payload2 = payload
            payload2.authorization = {
                "mode": "pin",
                "fields": [
                    "pin"
                ],
                "pin": 3310
            }
            const reCallCharge = await flw.Charge.card(payload2)
            const callValidate = await flw.Charge.validate({
                "otp": "12345",
                "flw_ref": reCallCharge.data.flw_ref
            })
           // console.log(callValidate) uncomment for debugging purposes
        }
        if (response.meta.authorization.mode === 'redirect') {
            var url = response.meta.authorization.redirect
            open(url)
        }
        res.status(200).json(response)
        // console.log(response) uncomment for debugging purposes
    } catch (error) {
        console.log(error)
    }
})

*/


// LINK TO THE DOCUMENTATION FOR FLUTTER WAVE
/*https://devgb.hashnode.dev/how-to-integrate-flutterwave-payment-apis-in-node*/



//BLOG LINK TO IMPLEMENT A DIGITAL WALLET EITH FLUTTER WAVE
/*https://blog.idrisolubisi.com/how-to-build-a-wallet-system-with-flutterwave-payment-integration-into-nodejs-application*/


// const Transaction = require('../models/Transaction'); // Make sure this import is correct

// exports.addFund = async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const user = await User.findById(userId);
//         const { amount, cardNumber, mm, yy, cvv, pin } = req.body;
//         const payload = {
//             "card_number": cardNumber,
//             "cvv": cvv,
//             "expiry_month": mm,
//             "expiry_year": yy,
//             "currency": "NGN",
//             "amount": amount,
//             "redirect_url": "https://www.google.com",
//             "fullname": user.fullName,
//             "email": user.email,
//             "enckey": process.env.ENCRYPTION_KEY,
//             "tx_ref": uuidv4(),
//             // "pin": pin
//         };
//         // Attempt to charge the card using Flutterwave API
//         const response = await flw.Charge.card(payload);

//         if (response.meta.authorization.mode === 'pin') {
//             // Handle PIN authorization
//             let payload2 = { ...payload };
//             payload2.authorization = {
//                 "mode": "pin",
//                 "fields": [
//                     "pin"
//                 ],
//                 "pin": pin
//             };

//             const reCallCharge = await flw.Charge.card(payload2);
//             const callValidate = await flw.Charge.validate({
//                 "otp": "12345", // Replace with the actual OTP received during the PIN authorization
//                 "flw_ref": reCallCharge.data.flw_ref
//             });

//             console.log(callValidate);

//             // You may want to handle the validation response accordingly
//             if (callValidate.status === 'success') {
//                 // Continue with processing the payment or perform additional steps
//             } else {
//                 // Handle failed validation
//                 throw new Error('PIN validation failed');
//             }
//         }

//         if (response.status === 'success') {
//             // Handle successful payment
//             user.balance += parseFloat(amount);
//             await user.save();

//             // Save transaction details
//             const transaction = new Transaction({
//                 user: user._id,
//                 date: new Date(),
//                 description: 'Adding funds to wallet',
//                 amount: parseFloat(amount),
//                 receiptNumber: uuidv4(),
//                 status: 'completed',
//             });
//             await transaction.save();
//         }

//         const userBalance = user.balance;
//         res.status(200).json({ response, userBalance });
//     } catch (error) {
//         console.error('Error processing payment:', error);
//         res.status(500).json({ error: 'Error processing payment' });
//     }
// };


