const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
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
            default: 0,
        },
        image: {
            type: String,
        },
        buys: {
            type: Number,
            default: 0,
        },
        quantity: {
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

FoodSchema.plugin(mongoosePaginate)

const Food = mongoose.model('Food', FoodSchema)

module.exports = Food
