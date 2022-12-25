const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtsController');

router
    .route('/')
    .get(getThoughts)
    .post(createThought);

router
    .route('/:thoughtsId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:thoughtsId/reactions')
    .post(createReaction);

router
    .route('/:thoughtsId/reactions/:reactionsId')
    .delete(deleteReaction);

module.exports = router;