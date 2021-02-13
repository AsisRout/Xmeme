const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const memeRoutes = require('./routes/memeRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')


// express app
const app = express();

app.use(cors())


// connect to mongodb 
// const dbURI = 'mongodb+srv://asis123:265rohit@cluster0.xbfv4.mongodb.net/xmeme?retryWrites=true&w=majority';
const dbURI =  "mongodb://mongo:27017/meme";



mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(process.env.PORT || 8081))
  .catch(err => console.log(err));

// middleware & static files
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// meme routes
app.use('/memes', memeRoutes);