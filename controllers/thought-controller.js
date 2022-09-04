const {Thought, User} = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought with this ID '});
                return;
            }
            res.json(dbThoughtData);
        }).catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    createThought ({body},res) {
        Thought.create(body)
        .then((dbThoughtData) => {
            return User.findOneAndUpdate (
                {_id: body.userId},
                {$push: {thoughts: dbThoughtData._id}},
                {new: true}
            );
        }).then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No user with this id'});
                return;
            }
        }).catch(err => res.json(err));
    },
    updateThought ({params,body}, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators:true})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought with this ID'});
                return;
            }
            res.json(dbThoughtData);
        }).catch(err => res.status(400).json(err));
    },
    deleteThought ({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought with this ID'});
                return;
            }
            res.json(dbThoughtData)
        }).catch(err => res.status(400).json(err));
    },
    addReaction ({params,body},res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        ).then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No though with this ID'});
                return;
            }
            res.json(dbThoughtData);
        }).catch(err => res.json(err));
    },
    removeReaction({params},res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
            )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
}
module.exports = thoughtController;