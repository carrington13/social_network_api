const { Thought, User } = require('../models');

const thoughtController = {
//--------------------
// Route /api/thoughts
// -------------------
//Get all thoughts
getAllThoughts(req, res) {
  Thought.find({})
    .populate({
        path: 'reactions',
        select: '-__v'
    })
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    })    
},

// Create a new thought and push its id to users thoughts array field
  // /api/thoughts/
  createThought({ body }, res) {
    Thought.create(body)
      .then(( { _id } ) => {
        return User.findOneAndUpdate(
          {_id: body.userId},
          { $push: { thoughts: _id }},
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!'})
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

// -----------------------
// Route /api/thoughts/:id
// -----------------------

// Get one thought by _id
  getOneThought({ params }, res) {
    Thought.findOne({_id: params.thoughtId})
      .populate({
          path: 'reactions',
          select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => {
        if(!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!'});
          return; 
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      })    
  },

// Update a thought by thoughtId
  updateThoughtById({ params, body }, res) {
    Thought.findOneAndUpdate(
      {_id: params.thoughtId},
      body,
      { new: true }
    )
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!'});
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
  },

// Delete a thought by _id
  deleteThoughtById({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'There is no thought with this id!' })
        }
        res.json(dbThoughtData);
        return User.findOneAndUpdate(
          { username: params.username },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

    // Create a reaction
    addReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
        {_id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
      )
        .then(dbThoughtData => {
          if(!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
  
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

// ------------------------------------------
// Route /api/thoughts/:thoughtId/reactions/:reactionId
// ------------------------------------------

  // Delete to pull and remove a reaction by the reactions reactionId value
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err);
      });
  }
};


module.exports = thoughtController;

// Get all thoughts, regardless of user

// Route: /api/thoughts/
  // POST Create a thought
  
  // GET Get one thought by id
    // Include reactions

// Route: /api/thoughts/:thoughtId

  // GET Get thoughts by user
    // Include reactions on thoughts

  // DELETE Delete a thought

  // POST/UPDATE Create a reaction on a thought

// Route: /api/thoughts/:thoughtId/:reactionId

  // PUT Update a reaction on a thought

  // DELETE Delete a reaction on a thought