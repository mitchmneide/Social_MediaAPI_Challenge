const {Thought, User} = require('../models');

const thoughtController = {
    // GET /api/thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    // GET /api/thoughts/:id
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
    // POST /api/thoughts
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
            res.json({message: 'Thought succesfully created'})
        }).catch(err => res.json(err));
    },
    // PUT /api/thoughts/:thoughtId
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
    // DELETE /api/thoughts/:thoughtId
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
    // POST api/thoughts/:thoughtId/reactions Add a reaction to a thought
    addReaction ({params,body},res) {
        Thought.findOneAndUpdate(
            {_id: params.id},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        ).then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought with this ID'});
                return;
            }
            res.json(dbThoughtData);
        }).catch(err => res.json(err));
    },
    // DELETE api/thoughts/:thoughtId/reactions/:reactionId Delete a reaction
    removeReaction({params},res) {
        Thought.findOneAndUpdate(
            {_id: params.id},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
            )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
}
module.exports = thoughtController;