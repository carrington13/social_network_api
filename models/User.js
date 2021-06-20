const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            require: 'Username is require!',
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        // thoughts [_id values] referencing Thought model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        // Array of _id values referencing the User model (self- reference)
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const User = model('User', UserSchema);

module.exports = User;