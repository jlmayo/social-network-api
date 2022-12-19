const { Thoughts, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thoughts.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtId })
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'Head empty. No thoughts.' })
                    : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },


    createThought(req, res) {
        Thoughts.create({
            thoughtsText: req.body.thoughtsText,
            username: req.body.username
        })
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: dbThoughtData._id }},
                    { new: true }
                );
            })
            .then(response => {
                if (!response) {
                    res.status(404).json({ message: 'Error'});
                    return;
                }
                res.json(response)
            })
            .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body }
        )
            .then((thoughts) => 
                !thoughts
                    ? res.status(404).json({ message: 'Head empty. No thoughts.'})
                    : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thoughts) =>    
                !thoughts
                    ? res.status(404).json({ message: 'Head Empty. No thoughts.'})
                    : res.json({ message: 'Thoughts erased!'})
            )
            .catch((err) => res.status(500).json(err));
    },

    createReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true },
        )
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'Head empty. No thoughts.'})
                    : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.body.reactionId }}},
        )
            .then((user) =>
                !userd
                    ? res.status(404).json({ message: 'No user with that ID.'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};