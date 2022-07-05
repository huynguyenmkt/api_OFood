const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BillSchema = new Schema(
    {
        status: {
            type: Number,
            default: 0,
        },
        billInfos: [
            {
                type: Schema.Types.ObjectId,
                ref: 'BillInfo',
            },
        ],
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        address: {
            type: Schema.Types.ObjectId,
            ref: 'Address',
        },
    },
    {
        timestamps: true,
    }
)

const Bill = mongoose.model('Bill', BillSchema)

module.exports = Bill
