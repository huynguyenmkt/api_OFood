const Category = require('../models/Category')
const Food = require('../models/Food')

const newFood = async (food) => {
    try {
        const newFood = new Food(food)
        const categoryId = newFood.category
        if (categoryId) {
            const category = await Category.findById(categoryId)
            if (category === null) {
                const err = new Error('category is not exits')
                err.status = 404
                throw err
            }
            await newFood.save()
            category.foods.push(newFood)
            await category.save()
        } else {
            await newFood.save()
        }
        return newFood
    } catch (error) {
        throw error
    }
}

const getAllFood = async (allStatus) => {
    try {
        let foods
        if (allStatus) {
            foods = await Food.find({}).populate('category').populate('reviews')
        } else {
            foods = await Food.find({ status: { $gte: 1 } })
                .populate('category')
                .populate('reviews')
        }

        return foods
    } catch (error) {
        throw error
    }
}

const getTopFood = async () => {
    try {
        const foods = await Food.find({ status: { $gte: 1 } })
            .sort({ buys: -1 })
            .limit(10)
        return foods
    } catch (error) {
        throw error
    }
}

const getFood = async (foodId) => {
    try {
        const food = await Food.findById(foodId)

        if (food === null) {
            const err = new Error('food is not exits')
            err.status = 404
            throw err
        }
        return food
    } catch (error) {
        throw error
    }
}

const updateFood = async (foodId, newFood) => {
    try {
        const categoryId = newFood.category
        if (categoryId) {
            const category = await Category.findById(categoryId)
            if (category === null) {
                const err = new Error('category is not exits')
                err.status = 404
                throw err
            }
        }

        const food = await Food.findById(foodId)
        if (food === null) {
            const err = new Error('food is not exits')
            err.status = 404
            throw err
        }
        if (newFood.quantity > 0 && food.status === 0) {
            newFood.status = 1
        }
        if (newFood.quantity <= 0 && food.status === 1) {
            newFood.status = 0
        }
        await food.updateOne(newFood)
    } catch (error) {
        throw error
    }
}

const deleteFood = async (foodId) => {
    try {
        const newFood = await Food.findById(foodId)

        if (newFood === null) {
            const err = new Error('food is not exits')
            err.status = 404
            throw err
        }
        if (newFood.status === 0) {
            const err = new Error('food was sold out')
            err.status = 400
            throw err
        }
        newFood.status = 0
        await newFood.save()
    } catch (error) {
        throw error
    }
}

module.exports = {
    newFood,
    getAllFood,
    getTopFood,
    getFood,
    updateFood,
    deleteFood,
}
