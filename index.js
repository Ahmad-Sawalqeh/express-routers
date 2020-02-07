'use strict';

const mongoose = require('mongoose');
const server = require('./lib/server.js');
require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGODB_URI, mongooseOptions)
  .then(() => {
    //connection established successfully
    console.log('Database connected');
  })
  .catch((error) => {
    //catch any error during the initial connection
    console.log('Failed to connect to database: ', error);
  });


server.start(PORT);
