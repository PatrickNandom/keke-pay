const express = require('express');
const userRouter = express.Router();

const { getAllUsers, getSingleUser, upDateUser, deleteUser } = require('../controllers/userController')

//route for getting all users
userRouter.get('/', getAllUsers);

//route for getting a single users
userRouter.get('/singleUser/:id', getSingleUser);

// route for updating a user
userRouter.patch('/update/:id', upDateUser);

//route for deleting a user
userRouter.delete('/delete/:id', deleteUser);

module.exports = userRouter;
