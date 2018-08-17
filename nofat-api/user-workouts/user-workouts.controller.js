const express = require('express');
const router = express.Router();
const userWorkoutService = require('./user-workout.service');

// routes
router.get('/:id', getById);
// router.get('/current', getCurrent);
// router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getById(req, res, next) {
    userWorkoutService.getById(req.params.id)
        .then(userWorkout => userWorkout ? res.json(userWorkout) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userWorkoutService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}