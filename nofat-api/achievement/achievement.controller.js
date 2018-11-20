const express = require('express');
const router = express.Router();
const achievementService = require('./achievement.service');

// routes
router.get('/:achievement', addAchievement);

module.exports = router;

function addAchievement(req, res, next) {
    achievementService.add(req.params)
        .then(achievement => achievement ? res.json(achievement) : res.sendStatus(404))
        .catch(err => next(err));
}