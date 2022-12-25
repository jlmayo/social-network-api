const { Schema, model } = require('mongoose');

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
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
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