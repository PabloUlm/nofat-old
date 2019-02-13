const express = require('express');
const router = express.Router();
const workoutService = require('./workout.service');

// routes
router.post('/add', addWorkout);

module.exports = router;

function addWorkout(req, res, next) {
  workoutService.add(req.body)
    .then(workout => workout ? res.json(workout) : res.status(400).json({
      message: 'Something went wrong adding the workout!'
    }))
    .catch(err => next(err));
}