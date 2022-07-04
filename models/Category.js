const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
        },
        foods: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Food',
            },
        ],
    },
    {
        timestamps: true,
    }
)

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
