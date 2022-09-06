const {User} = require('../models');

const userController = {
    // GET/api/users 
    getAllUser(req,res) {
        User.find({})
        .populate({
            path:'thoughts',
            select: '-__v'
        }).select('-__v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },
    // GET/api/users/:id 
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
          .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .select('-__v')
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
    //   POST /api/users create new user
    createUser ({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    // PUt /api/users/:id Update user by ID
    updateUser({params,body}, res) {
        User.findOneAndUpdate({_id: params.id}, body,{new:true,runValidators:true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with this ID'})
                return;
            }
            res.json(dbUserData)
        }).catch(err => res.status(400).json(err));
    },
    // DELETE /api/users/:id Deletes user by ID
    deleteUser({params},res){
        User.findOneAndDelete({_id:params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with thisID'});
                return;
            }
            res.json(dbUserData)
        }).catch(err => res.status(400).json(err))
    },
    // POST /api/users/:userId/friends/:userId Add Friend to user's friend list
    addFriend({params,body}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends: params.friendId}},
            {new: true, runValidators: true}
        ).then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'No user found with this ID'});
                return;
            }
            res.json(dbUserData);
        }).catch(err => res.json(err));
    },
    // DELETE /api/users/:userId/friends/:userId Remove friend from user list
    removeFriend ({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends:params.friendId}},
            {new: true}
            ).then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err))
    }
}
module.exports = userController;