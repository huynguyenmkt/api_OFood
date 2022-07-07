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
        },
        status: {
            type: Number,
            default: 1,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            default: null,
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
