const Agent = require('../models/Agent');
const bcrypt = require('bcrypt');



exports.registerAgent = async (req, res) => {

    try {
        const { email, fullName, password, confirmPassword } = req.body;
        if (!email || !fullName || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'password do not match' });
        }

        const agentExist = await Agent.findOne({ email });

        if (agentExist) {

            return res.status(409).json({ message: 'Agent with this email exists' })

        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const agents = new Agent({ email, fullName, password: hashedPassword });

        await agents.save();

        res.status(200).json({ success: true, message: 'Agent registered successfully.' })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal serveer error' })
    }
}

exports.loginAgent = async (req, res) => {

    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const agent = await Agent.findOne({ email });

        if (!agent) {
            return res.status(401).json({ message: 'Agent not found.' });
        }

        console.log('Retrieved agent:', agent);


        const passwordMatch = await bcrypt.compare(password, agent.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        res.status(200).json({ success: true, message: 'Login successful.', });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Login failed.' });
    }

}