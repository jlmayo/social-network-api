const { Schema, Types, model } = require('mongoose');
const formatDate = require('../utils/formatDate');


const reactionsSchema = new Schema(
    {
        /*reactionsId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },*/
        reactionBody: {
            type: String,
            required: [true, 'Please write your reaction'],
            maxLength: [ 280, 'Ok! Enough already!']
        },
        userName: {
            type: String,
            required: [ true, 'No lurkers allowed. Leave your name, coward!']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (dateTime) => formatDate(dateTime)
        }
    },
    {
        toJSON: {
            getters: true
        },
    }
);


const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [ true, 'No thoughts to share?' ],
            minLength: 1,
            maxLength: [ 280, 'Ok! Enough already!' ]
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (dateTime) => formatDate(dateTime)
        },
        userName: {
            type: String,
            required: [ true, 'No lurkers allowed. Please leave your name.' ]
        },
        reactions: [reactionsSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
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
