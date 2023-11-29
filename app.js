require('dotenv').config();
const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
// const ConnectMongoDbSession = require('connect-mongodb-session')
const cors = require('cors');
const mongoose = require('mongoose');
// const MongoDbStore = ConnectMongoDbSession(session)

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoute')

// .env configuration 

// Configure body-parser to handle URL-encoded data
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS for Express application
app.use(cors({origin: "*"}));

app.use('/verification', authRouter)
app.use('/user', userRouter)

//mongoDB connection+
const uri = process.env.URI

mongoose.connect(uri).then(() => {
    console.log('Connected to database Successfully');
}).catch(error => {
    console.error('Error while connecting to the database', error)
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});