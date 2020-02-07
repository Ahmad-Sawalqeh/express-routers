'use strict';

const express = require('express');
const category = require('../models/categories/categories-model.js');
const router = express.Router();

// Main Routes
router.get('/categories', getCategories);
router.get('/categories/:id', getOneCategory);
router.post('/categories', createCategories);
router.put('/categories/:id', updateCategories);
router.delete('/categories/:id', deleteCategories);

//{
//   "name": "cellphone",
//   "display_name": "M20",
//   "description": "has 2 cameras"
// }

function getCategories(req, res, next) {
  category.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
}

function getOneCategory(req, res, next) {
  let id = req.params.id;
  category.get(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
}

function createCategories(req, res, next) {
  category.create(req.body)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(next);
}

function updateCategories(req, res, next) {
  let id = req.params.id;
  category.update(id, req.body)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(next);
}

function deleteCategories(req, res, next) {
  let id = req.params.id;
  category.delete(id)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(next);
}

module.exports = router;
