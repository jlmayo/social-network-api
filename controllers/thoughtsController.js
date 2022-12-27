const { Thoughts, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thoughts.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtsId })
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'Head empty. No thoughts.' })
                    : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },


    createThought(req, res) {
        Thoughts.create(req.body)
            .then((thoughts) => {
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $addToSet: { thoughts: thoughts._id }},
                    { new: true }
                );
            })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'Good thinking, but no User found.',})
                    : res.json('Thoughts posted!')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $set: req.body },
            {
                runValidators: true,
                new: true
            }
        )
            .then((thoughts) => 
                !thoughts
                    ? res.status(404).json({ message: 'Head empty. No thoughts.'})
                    : res.json(thoughts)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    deleteThought(req, res) {
        Thoughts.findOneAndRemove({ _id: req.params.thoughtsId })
            .then((thoughts) =>    
                !thoughts
                    ? res.status(404).json({ message: 'Head Empty. No thoughts.'})
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtsId },
                        { $pull: {thoughts: req.params.thoughtsId }},
                        {new: true}
                    ) 
            )
            .then((user) =>
                !user
                ? res.status(404).json({ message: 'No thoughts with this ID!'})
                : res.json({ message: 'Head empty. Thoughts erased!' })
            )
            .catch((err) => res.status(500).json(err));
    },

    createReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $addToSet: { reactions: req.body } },
            {
                runValidators: true,
                new: true
            }
        )
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'Head empty. No thoughts with this ID.'})
                    : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $pull: { reactions: { reactionsId: req.params.reactionsId }}},
        )
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'Head empty. No thoughts with that ID.'})
                    : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },
};