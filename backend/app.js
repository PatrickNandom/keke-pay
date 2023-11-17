require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const ConnectMongoDbSession = require('connect-mongodb-session')
const MongoDbStore = ConnectMongoDbSession(session)

const store = new MongoDbStore({
    uri: process.env.URI,
    databaseName: "Keke",
    collection: "emailinfo"
});

app.use(session({
    store: store,
    secret: process.env.secretKey,
    resave: false,
    saveUninitialized: true,
}));

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoute')

// .env configuration 

// Configure body-parser to handle URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS for Express application
app.use(cors());

app.use('/verification', authRouter)
app.use('/user', userRouter)

//mongoDB connection
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
