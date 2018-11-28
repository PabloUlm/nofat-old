const express = require('express');
const router = express.Router();
const achievementService = require('./achievement.service');

// routes
router.post('/achievement', addAchievement);

module.exports = router;

function addAchievement(req, res, next) {
    achievementService.add(req.params)
        .then(achievement => achievement ? res.json(achievement) : res.status(400).json({ message: 'Hey you bitch!' }))
        .catch(err => next(err));
}