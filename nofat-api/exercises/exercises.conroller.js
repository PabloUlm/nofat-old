const express = require('express');
const router = express.Router();
const exercisesService = require('./exercises.service');

// routes
router.get('/', getAll);

module.exports = router;

function getAll(req, res, next) {
    exercisesService.getAll()
        .then(exerc => res.json(exerc))
        .catch(err => next(err));
}