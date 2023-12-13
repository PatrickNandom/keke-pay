const express = require('express');
const agentRouter = express.Router();

const { registerAgent, loginAgent } = require('../controllers/agentController');
agentRouter.post('/register', registerAgent);
agentRouter.post('/login', loginAgent);

module.exports = agentRouter;