const { Schema, Types, model } = require('mongoose');

const friendsSchema = new Schema(
    {
        userName: {
            type: String,
            required: [ true, 'No lurkers allowed. Leave your name, coward!']
        }
    },
    {
        toJSON: {
            getters: true
        },
    }
);

const userSchema = new Schema(
    {
        userName: { 
            type: String, 
            unique: [ true, 'Username already taken' ],
            required: [ true, 'Username is required' ], 
            trim: true
        },
        email: {
            type: String,
            required: [ true, 'Valid email address required'],
            unique: [ true, 'This email address has already been used' ],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts',
            },
        ],
        friends: [friendsSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

const User = model('user', userSchema);

module.exports = User;