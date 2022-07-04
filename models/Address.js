const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AddressSchema = new Schema({
    houseNumber:{
        type: String
    },
    street:{
        type: String
    },
    district:{
        type: String
    },
    city:{
        type: String
    },
    country:{
        type: String
    },
    status: {
        type: Number
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Address = mongoose.model('Address', AddressSchema)

module.exports = Address