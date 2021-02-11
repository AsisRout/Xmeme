const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const memeRoutes = require('./routes/memeRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

// express app
const app = express();

app.use(cors())

// connect to mongodb 
const dbURI = 'mongodb+srv://asis123:265rohit@cluster0.xbfv4.mongodb.net/xmeme?retryWrites=true&w=majority';
//const dbURI = 'mongodb://127.0.0.1:27017/meme';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(process.env.port || 8081))
  .catch(err => console.log(err));

// middleware & static files
app.use(morgan('dev'));
app.use(bodyParser.json());

// meme routes
app.use('/memes', memeRoutes);