const express = require('express');
const router = express.Router();
const achievementService = require('./achievement.service');

// routes
router.get('/:id', getById);
// router.get('/current', getCurrent);
// router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getById(req, res, next) {
    achievementService.getById(req.params.id)
        .then(achievement => achievement ? res.json(achievement) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    achievementService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}