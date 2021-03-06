﻿// const express = require('express');
const router = express.Router();
const workoutService = require('./workout.service');

// routes
router.post('/add', addWorkout);
router.get('/get', getCurrentWorkout);

module.exports = router;

function addWorkout(req, res, next) {
  workoutService.add(req.body)
    .then(workout => workout ? res.json(workout) : res.status(400).json({
      message: 'Something went wrong adding the workout!'
    }))
    .catch(err => next(err));
}

function getCurrentWorkout(req, res, next) {
  workoutService.getCurrentWorkout(req.params.week)
    .then(workout => workout ? res.json(workout) : res.sendStatus(404))
    .catch(err => next(err));
}