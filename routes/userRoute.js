const express = require('express');
const userRouter = express.Router();

const { getAllUsers, getSingleUser, upDateUser, changePassword, deleteUser, addFund } = require('../controllers/userController')

//route for getting all users
userRouter.get('/', getAllUsers);

//route for getting a single users
userRouter.get('/singleUser/:id', getSingleUser);

// route for updating a user
userRouter.patch('/update/:id', upDateUser);
userRouter.put('/changePassword/:userId', changePassword);
//route for deleting a user
userRouter.delete('/delete/:id', deleteUser);


// route for adding fund to user balance
userRouter.post('/add-fund/:userId', addFund)

module.exports = userRouter;
