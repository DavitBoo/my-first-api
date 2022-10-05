const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');       //this package will hide some interesting string for us
const cors = require('cors')


const bodyParser = require('body-parser')

//Import routes
const postsRoutes = require('./routes/posts');


//Middlewares
// app.use('/posts', () => {
//     console.log('This is a middleware running')
// })

app.use(cors());
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

//every time you'll go to /posts => you will you the postsRoutes
app.use('/posts', postsRoutes) 

//ROUTES
app.get('/', (req, res) => {
    res.send('I am in the home right now');
})

//Connect to MongoDB
///process.env.DB_CONNECTION is our url~password store in .env
mongoose.connect(process.env.DB_CONNECTION, () => {console.log('Conencted to the DB')})

//How do we start listening to the server
app.listen(3000);