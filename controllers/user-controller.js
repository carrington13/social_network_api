const { User, Thought } = require('../models');

const userController = {
// Routes = /api/users

// Get all users
getAllUsers(req, res) {
  User.find({})
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .select('-__v')
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
},

// Get a single user by _id
getUserById({ params }, res) {
  User.findOne({ _id: params.id })
    .populate({
        path: 'thoughts',
        select: '-__v'
    })
    .select('-__v')
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
},

// Add A User
createUser({ body }, res) {
  User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
},

// update a user by _id
updateUserById({ params, body }, res) {
  User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
  .catch(err => res.status(400).json(err));
},



// Delete a user by _id
deleteUserById({ params }, res) {
  User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
}


// Bonus: Remove a user's associated thoughts when deleted.
};

module.exports = userController;