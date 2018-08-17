const express = require('express');
const router = express.Router();
const seasonService = require('./season.service');

// routes
router.get('/:id', getById);
// router.get('/current', getCurrent);
// router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getById(req, res, next) {
    seasonService.getById(req.params.id)
        .then(season => season ? res.json(season) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    seasonService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}