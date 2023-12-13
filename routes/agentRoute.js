const express = require('express');
const agentRouter = express.Router();

const { registerAgent, loginAgent, upDateAgent } = require('../controllers/agentController');
agentRouter.post('/register', registerAgent);
agentRouter.post('/login', loginAgent);
agentRouter.patch('/upDateAgent', upDateAgent);

module.exports = agentRouter;