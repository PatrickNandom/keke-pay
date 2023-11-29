const User = require('../models/User');
const bcrypt = require('bcrypt');
const { MongoClient, ObjectId } = require('mongodb');

const client = new MongoClient(process.env.URI);
client.connect();


// logic for gettting all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

//logic for getting a single user
exports.getSingleUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch user' });
    }
};

// logic to apdating a user
// exports.upDateUser = async (req, res) => {
//     const { id } = req.params;
//     const {} = req.body;

//     try {
//         const user = await User.findByIdAndUpdate(id, updatedUserData, { new: true });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to update user' });
//     }
// };

exports.upDateUser = async (req, res) => {
    const { id } = req.params;
    const { fullName, email, registrationNumber } = req.body;

    try {
        // Check if the user exists
        const existingUser = await User.findById(id);

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prepare the updated user data
        const updatedUserData = {};

        if (fullName) {
            updatedUserData.fullName = fullName;
        }

        if (email) {
            updatedUserData.email = email;
        }

        if (registrationNumber) {
            updatedUserData.registrationNumber = registrationNumber;
        }

        // Perform the update
        const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, { new: true });

        // Return the updated user data
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update user' });
    }
};


exports.changePassword = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { currentPassword, newPassword, confirmPassword } = req.body;


        // Fetch the user from the MongoDB collection
        const user = await client.db("keke-pay").collection("users").findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(401).json({ message: 'Password do not match' });
        }


        // Check if the current password matches
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid current password' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the MongoDB collection
        const result = await client.db("keke-pay").collection("users").updateOne(
            { _id: new ObjectId(userId) },
            {
                $set: {
                    password: hashedPassword,
                },
            }
        );

        // Check if the update was successful
        if (result.matchedCount > 0) {
            res.status(200).json({ message: 'Password changed successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete user' });
    }
};
