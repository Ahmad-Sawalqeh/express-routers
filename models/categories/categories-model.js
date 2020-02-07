/* eslint-disable camelcase */
'use strict';

const categories_schema = require('./categories-schema.js');
const Model = require('../mongo.js');

class Categories extends Model {
  constructor() {
    super(categories_schema);
  }
}

module.exports = new Categories();
