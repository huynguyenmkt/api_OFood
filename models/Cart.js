const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    quantity:{
        type: Number
    },
    food:{
        type: Schema.Types.ObjectId,
        ref: 'Food'
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart