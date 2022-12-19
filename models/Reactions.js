const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            driver: mongoose.ObjectId,
            //Not sure if this is right. Default set to new?
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now, //Need a getter method to format the timestamp on query

        },
    },
);

//This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
