const { Thoughts, User } = require('../models');


const thoughtsController = {
    getThoughts(req, res) {
        Thoughts.find({})
            .select ('-_v')
            .then((dbThoughtData) => res.json(dbThoughtsData))
            .catch((err) => res.status(500).json(err));
    },

    getSingleThought({params}, res) {
        Thoughts.findOne({_id: params.id})
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'Head empty. No thoughts.' });
                    return;
                }
                res.status(200).json(dbThoughtsData);
            })
            .catch((err) => res.status(500).json(err));
    },


    createThought({body}, res) {
        Thoughts.create(body)
            .then((thoughtsData) => {
                return User.findOneAndUpdate(
                    {_id: body.userId},
                    {$push: {thoughts: thoughtData._id}},
                    {
                        new: true,
                        runValidators: true
                    }
                );
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({message: 'Head empty. No thoughts.'});
                    return;
                }
                res.json(dbuserData);
            })
            .catch((err) => res.status(500).json(err));
    },

    updateThought({params, body}, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.id },
            body,
            {new: true},
        )
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    res.status(404).json({message: 'Head empty. No thoughts.'});
                    return;
                }
            res.json(dbThoughtsData);
            }) 
            .catch((err) => res.status(500).json(err));
    },

    deleteThought({params}, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'Head Empty. No thoughts.'});
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => res.status(500).json(err));
    },

    createReaction({params, body}, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true },
        )
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'Head empty. No thoughts.'});
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => res.status(500).json(err));
    },

    deleteReaction({params}, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId }}},
            {new: true}
        )
            .then((dbThoughtsData) => res.json(dbThoughtsData))
            .catch((err) => res.status(500).json(err));
    },
};

module.exports = thoughtsController;



    



//Old code - edited out when app wasn't working
                /*return User.findOneAndUpdate(
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
    },*/

    


   

