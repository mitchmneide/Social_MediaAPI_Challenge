const router = require('express').Router();
const {getAllUser, getUserById,createUser,updateUser,deleteUser,addFriend, removeFriend}= require('../../controllers/user-controller');

// GET & POST for Users /api/users
router 
    .route('/')
    .get(getAllUser)
    .post(createUser);
// GET,PUT & DELETE at /api/users/:id
router 
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)
// Add /Remove Friends at /api/users/:userid/friends/:friendId
router 
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;