const router = require('express').Router();
const { 
  getAllThoughts, createThought,
  getOneThought, deleteThoughtById, updateThoughtById, addReaction, 
  removeReaction
} = require('../../controllers/thought-controller');

// Route: /api/thoughts/
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

// Route: /api/thoughts/<thoughtId>
router
  .route('/:thoughtId')
  .get(getOneThought)
  .put(updateThoughtById)
  .delete(deleteThoughtById);
// Route: /api/thoughts/<thoughtId>/user/<userId>

	
// Route: /api/thoughts/<thoughtId>/reactions/
router.route('/:thoughtId/reactions/').post(addReaction);

// Route: /api/thoughts/<thoughtId>/reactions/<reactionId>
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;



