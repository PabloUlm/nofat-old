const express = require('express');
const router = express.Router();
const workoutService = require('./workout.service');

// routes
router.get('/:id', getById);
router.get('/current', getCurrent);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getById(req, res, next) {
    workoutService.getById(req.params.id)
        .then(workout => workout ? res.json(workout) : res.sendStatus(404))
        .catch(err => next(err));
}

// function getCurrent(req, res, next) {
//     workoutService.getById(req.params.sub)
//         .then(workout => workout ? workout.json(workout) : res.sendStatus(404))
//         .catch(err => next(err));
// }

// function update(req, res, next) {
//     workoutService.update(req.params.id, req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }

function _delete(req, res, next) {
    workoutService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}