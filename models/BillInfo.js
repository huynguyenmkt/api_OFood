const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BillInfoSchema = new Schema({
    quantity:{
        type: Number
    },
    priceOrder:{
        type: Number
    },
    food:{
        type: Schema.Types.ObjectId,
        ref: 'Food'
    },
    bill:{
        type: Schema.Types.ObjectId,
        ref: 'Bill'
    }
})

const BillInfo = mongoose.model('BillInfo', BillInfoSchema)

module.exports = BillInfo