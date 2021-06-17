const { Thought, User } = require('../models');

const thoughtController = {
// Route /api/thoughts

//Get all thoughts
getAllThought(req, res) {
  Thought.find({})
    .populate({
        path: 'reactions'
    })    
}

// Get one thought by _id

// Create a new thought and push its id to users thoughts array field

// Update a thought by _id

// Delete a thought by _id

// Route /api/thoughts/:thoughtId/reactions

// Create a reaction stored in a single thoughts reactions array field

// Delete to pull and remove a reaction by the reactions reactionId value
}

module.exports = thoughtController;