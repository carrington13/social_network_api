const { User, Thought } = require('../models');

const userController = {
// Routes = /api/users
// -------------------
// Get all users
getAllUsers(req, res) {
  User.find({})
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

// Route: /api/users/<userId>
// --------------------------
// Get a single user by _id
getUserById({ params }, res) {
  User.findOne({ _id: params.userId })
    .populate({
        path: 'thoughts',
        select: '-__v'
    })
    .populate({
      path: 'friends',
      select: '-__v'
    })
    .select('-__v')
    .then(dbUserData => {
      if(!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
},

// update a user by _id
updateUserById({ params, body }, res) {
  User.findOneAndUpdate(
    { _id: params.userId }, 
    body, 
    { new: true, runValidators: true }
    )
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
  User.findOneAndDelete({ _id: params.userId })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},

// Route: /api/users/<userId>/friends/<friendId>
addFriend({ params }, res) {
  User.findOneAndUpdate(
    {_id: params.userId},
    { $push: { friends: params.friendId }},
    { new: true }
    )
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!'});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},

// removeFriend({ params }, res) {
//   console.log(params);
//   User.findOneAndDelete(
//     {_id: params.userId},
//     { $pull: { friends: { _id: params.friendId} } },
//     )
//     .then(dbUserData => {
//       if (!dbUserData) {
//         res.status(404).json({ message: 'No user found with this id!'});
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch(err => res.status(400).json(err));
// },
removeFriend({ params }, res) {
  User.findOneAndDelete(
    { _id: params.userId },
    { $pull: { friends: { _id: params.friendId } } },
    { new: true}
    )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
}
// Bonus: Remove a user's associated thoughts when deleted.
};

module.exports = userController;
