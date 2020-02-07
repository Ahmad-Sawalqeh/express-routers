'use strict';

// 3rd party
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

// files
const categoriesRoutes = require('../routes/categories.js');
const productsRoutes = require('../routes/products.js');

// app constant
const app = express();

// errors
const notFound = require('../middleware/404.js');
const serverError = require('../middleware/500.js');

// 3rd party middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// 1st party middleware
app.use('/api/v1', categoriesRoutes);
app.use('/api/v1', productsRoutes);

app.use('*', notFound);
app.use(serverError);

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`server up ${PORT}`));
  },
};
