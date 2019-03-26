exports.default = function () {
  const jwt = require('_helpers/jwt');
  const express = require('express');
  const errorHandler = require('_helpers/error-handler');

  // use JWT auth to secure the api
  const api = express.Router();

  api.use(jwt());

  // api routes
  api.use('/users', require('./users/users.controller'));
  api.use('/seasons', require('./seasons/seasons.controller'));
  api.use('/workout', require('./workouts/workout.controller'));
  api.use('/achievement', require('./achievement/achievement.controller'));
  api.use('/exercise', require('./exercises/exercises.conroller'));

  api.use(errorHandler);

  return api;
}