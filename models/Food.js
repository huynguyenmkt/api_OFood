const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FoodSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
        },
        sale: {
            type: Number,
        },
        image: {
            type: String,
        },
        buys: {
            type: Number,
            default: 0,
            select: false,
        },
        status: {
            type: Number,
            default: 1,
            select: false,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
        },
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Review',
            },
        ],
    },
    {
        timestamps: true,
    }
)

const Food = mongoose.model('Food', FoodSchema)

module.exports = Food
