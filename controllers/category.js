const Category = require('../models/Category')
const Food = require('../models/Food')
//CREATE
const newCategory = async (req, res, next) => {
    // console.log(req.body)
    try {
        const newCategory = new Category(req.value.body)
        await newCategory.save()
        return res.status(201).json({
            status: true,
            message: 'create Category success!',
            data: newCategory,
        })
    } catch (error) {
        if (error.keyValue) {
            // console.log('POST' + JSON.stringify(error[Object.keys(error)[3]]))
            const msg =
                JSON.stringify(error[Object.keys(error)[3]]) +
                ' is already being used!'
            const err = new Error(msg)
            next(err)
        } else {
            next(error)
        }
    }
}

const newFood = async (req, res, next) => {
    try {
        const { categoryId } = req.value.params
        const category = await Category.findById(categoryId)
        const newFood = new Food(req.value.body)
        newFood.category = category._id
        await newFood.save()
        category.foods.push(newFood._id)
        await category.save()

        return res.status(201).json({
            status: true,
            message: 'create food success!',
            data: newFood,
        })
    } catch (error) {
        next(error)
    }
}

//READ
const getAllCategory = async (req, res, next) => {
    try {
        const categorys = await Category.find({})
        return res.status(200).json({
            status: true,
            message: 'get all categorys success!',
            data: categorys,
        })
    } catch (error) {
        next(error)
    }
}

const getCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.value.params
        const category = await Category.findById(categoryId)
        if (category === null)
            return res.status(404).json({
                status: false,
                message: 'Category not found!',
                data: [],
            })
        return res.status(200).json({
            status: true,
            message: 'get Category success!',
            data: category,
        })
    } catch (error) {
        next(new Error('has error with CategoryID'))
    }
}

const getAllFood = async (req, res, next) => {
    try {
        const { categoryId } = req.value.params
        const category = await Category.findById(categoryId).populate('foods')
        if (category === null)
            return res.status(404).json({
                status: false,
                message: 'Category not found!',
                data: [],
            })
        const listFoodsFilter = category.foods.filter(
            (food) => food.status !== 0
        )
        return res.status(200).json({
            status: true,
            message: 'get foods success!',
            data: listFoodsFilter,
        })
    } catch (error) {
        next(error)
    }
}
//UPDATE
const updateCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.value.params
        const newCategory = req.value.body
        const category = await Category.findByIdAndUpdate(
            categoryId,
            newCategory
        )
        return res.status(200).json({
            status: true,
            message: 'update Categorys success!',
            data: [],
        })
    } catch (error) {
        // console.log(error)
        if (error.codeName === 'DuplicateKey') {
            const msg =
                JSON.stringify(error[Object.keys(error)[4]]) +
                ' is already being used!'
            const err = new Error(msg)
            next(err)
        } else {
            next(error)
        }
    }
}
//DELETE
const deleteCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.value.params

        const category = await Category.findByIdAndDelete(categoryId)

        if (category === null) {
            return res.status(404).json({
                status: false,
                message: 'Category not found!',
                data: [],
            })
        }

        const foods = await Food.updateMany(
            { category: categoryId },
            { category: null }
        )

        return res.status(200).json({
            status: true,
            message: 'delete category success!',
            data: [],
        })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    newCategory,
    getAllCategory,
    getCategory,
    updateCategory,
    newFood,
    getAllFood,
    deleteCategory,
}
