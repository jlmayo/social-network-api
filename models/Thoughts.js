const { Schema, model } = require('mongoose');
const Reactions = require('./Reactions');

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }, //Use a getter method to format the timestamp on query?
        username: {
            type: String,
            required: true,
        },
        reactions: [Reactions],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtsSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;