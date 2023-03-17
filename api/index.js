require('dotenv').config();

const express = require("express");
const mongoose = require('mongoose')

const cors = require("cors");
const helmet = require("helmet");
const morgan = require('morgan');
const bodyparser = require("body-parser");

// Initialize App
const app = express();

// Middleware
app.use(bodyparser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
const usersRouter = require('./routes/users')
app.use('/users', usersRouter);

// Database Connection
mongoose.connect(process.env.ATLAS_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log('Connected to database and listening on port 3000')
    })
  })
  .catch((error) => {
    console.log(error)
  })
