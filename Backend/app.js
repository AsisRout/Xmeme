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
const dbURI =  process.env.MONGODB_URI ? process.env.MONGODB_URI: "mongodb://localhost:27017/meme";



mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(process.env.PORT || 8081))
  .catch(err => console.log(err));

// middleware & static files
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// meme routes
app.use('/memes', memeRoutes);