const { User, Thoughts } = require('../models');

const userController = {
    getUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-_v'
            })
            .select('-_v')
            .sort({_id: -1})
            .then((dbUserdata) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    getSingleUser( {params}, res) {
        User.findOne({_id: params.id})
            .populate({
                path: 'thoughts',
                select: '-_v'
            })
            .select('-_v')
            .then ((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json( {message: 'No user with that ID.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(500).json(err));
    },

    createUser({body}, res) {
        User.create(body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    updateUser({params, body}, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            {new: true})
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with that ID' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },

    deleteUser({params}, res) {
        User.findOneAndDelete({ _id: params.id })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with that ID' });
                    return;

                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },


    addFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendsId } },
            { new: true,})
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    deleteFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendsId }},
            { new: true},
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'No user with that ID.'});
                    return;
                    }
                    res.status(200).json(dbUserdata);
                })
                .catch((err) => res.status(500).json(err));
    },
};

module.exports = userController;