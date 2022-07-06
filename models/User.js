const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        phone: {
            type: String,
            unique: true,
            required: true,
        },
        userName: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            default: 1,
        },
        image: {
            type: String,
        },
        birthday: {
            type: String,
        },
        address: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Address',
            },
        ],
        cart: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Cart',
            },
        ],
        bills: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Bill',
            },
        ],
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('User', UserSchema)

module.exports = User
