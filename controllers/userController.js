const User = require('../models/User');


module.exports = {
    getUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-_v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));            
    },

    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({ message: 'User deleted.'}))
            .catch((err) => res.status(500).json(err));
    },

    
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            {
                runValidators: true,
                new: true
            }
        )
            .then((user) =>
                !user
                    ? res.status(404).json( { message: 'No user with that ID'} )
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: {friendsId: req.body.friendsId }}},
        )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'Not getting rid of that friend.' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};