const router =require('express').Router();

const {getAllThoughts,getThoughtById,createThought,updateThought,deleteThought,addReaction,removeReaction }= require('../../controllers/thought-controller');
// GET all and POST /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);
// GET one, PUT & DELETE at /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);
// POST routes for reactions /api/thoughts/:id/reactions
router
    .route('/:id/reactions')
    .post(addReaction)
// Delete Routes for reactions /api/thoughts/:id/reactions/:reactionId
router
    .route('/:id/reactions/:reactionId')
    .delete(removeReaction)
module.exports = router;