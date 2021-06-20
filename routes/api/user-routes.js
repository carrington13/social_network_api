const router = require('express').Router();
const { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUserById, 
    deleteUserById,
    removeFriend,
    addFriend 
} = require('../../controllers/user-controller');


// /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/users/:id
router
  .route('/:userId')
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

// /api/users/:userid/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend)

module.exports = router;
