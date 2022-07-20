const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

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

BillSchema.plugin(mongoosePaginate)

const Bill = mongoose.model('Bill', BillSchema)

module.exports = Bill
