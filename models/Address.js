const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AddressSchema = new Schema(
    {
        houseNumber: {
            type: String,
        },
        street: {
            type: String,
        },
        district: {
            type: String,
        },
        city: {
            type: String,
        },
        country: {
            type: String,
        },
        status: {
            type: Number,
            select: false,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

const Address = mongoose.model('Address', AddressSchema)

module.exports = Address
