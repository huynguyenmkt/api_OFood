const Category = require('../models/Category')
const Food = require('../models/Food')

const newCategory = async (category) => {
    try {
        const newCategory = new Category(category)
        await newCategory.save()
        return newCategory
    } catch (error) {
        throw error
    }
}

const newFood = async (categoryId, food) => {
    try {
        const category = await Category.findById(categoryId)
        if (category === null) {
            const err = new Error('category is not exits')
            err.status = 404
            throw err
        }
        const newFood = new Food(food)
        newFood.category = category._id
        await newFood.save()
        category.foods.push(newFood._id)
        await category.save()

        return newFood
    } catch (error) {
        throw error
    }
}

const getAllCategory = async () => {
    try {
        const categorys = await Category.find({})
        return categorys
    } catch (error) {
        throw error
    }
}

const getCategory = async (categoryId) => {
    try {
        const category = await Category.findById(categoryId)
        if (category === null) {
            const err = new Error('category is not exits')
            err.status = 404
            throw err
        }
        return category
    } catch (error) {
        throw error
    }
}

const getAllFood = async (categoryId) => {
    try {
        const category = await Category.findById(categoryId).populate({
            path: 'foods',
            match: {
                status: { $gt: 0 },
            },
        })
        if (category === null) {
            const err = new Error('category is not exits')
            err.status = 404
            throw err
        }
        return category.foods
    } catch (error) {
        throw error
    }
}

const updateCategory = async (categoryId, newCategory) => {
    try {
        const category = await Category.findByIdAndUpdate(
            categoryId,
            newCategory
        )
        if (category === null) {
            const err = new Error('category is not exits')
            err.status = 404
            throw err
        }
    } catch (error) {
        throw error
    }
}

const deleteCategory = async (categoryId) => {
    try {
        const category = await Category.findByIdAndDelete(categoryId)

        if (category === null) {
            const err = new Error('category is not exits')
            err.status = 404
            throw err
        }

        const foods = await Food.updateMany(
            { category: categoryId },
            { category: null }
        )
    } catch (error) {
        throw error
    }
}

module.exports = {
    newCategory,
    newFood,
    getAllCategory,
    getCategory,
    getAllFood,
    updateCategory,
    deleteCategory,
}
