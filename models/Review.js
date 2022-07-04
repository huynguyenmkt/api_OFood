const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema(
    {
        rate: {
            type: String,
        },
        comment: {
            type: String,
        },
        food: {
            type: Schema.Types.ObjectId,
            ref: 'Food',
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

const Review = mongoose.model('Review', ReviewSchema)

module.exports = Review
