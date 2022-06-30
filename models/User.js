const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:{
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    userName: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: Number
    },
    // address: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Address'
    // }],
    // cart: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Cart'
    // }],
    // bills: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Bill'
    //     }
    // ]
})

const User = mongoose.model('User',UserSchema)

module.exports = User