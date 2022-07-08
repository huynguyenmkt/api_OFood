const categoryService = require('../services/category')
//CREATE
const newCategory = async (req, res, next) => {
    try {
        const user = req.user
        if (user.role >= 2) {
            const err = new Error("you don't have access to this service")
            err.status = 400
            throw err
        }
        const newCategory = req.value.body
        const category = await categoryService.newCategory(newCategory)
        return res.status(201).json({
            status: true,
            message: 'create category success!',
            data: category,
        })
    } catch (error) {
        if (error.keyValue) {
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
        const user = req.user
        if (user.role >= 2) {
            const err = new Error("you don't have access to this service")
            err.status = 400
            throw err
        }
        const { categoryId } = req.value.params
        const newFood = req.value.body

        const food = await categoryService.newFood(categoryId, newFood)

        return res.status(201).json({
            status: true,
            message: 'create food success!',
            data: food,
        })
    } catch (error) {
        next(error)
    }
}

//READ
const getAllCategory = async (req, res, next) => {
    try {
        const categorys = await categoryService.getAllCategory()
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
        const category = await categoryService.getCategory(categoryId)
        return res.status(200).json({
            status: true,
            message: 'get Category success!',
            data: category,
        })
    } catch (error) {
        next(error)
    }
}

const getAllFood = async (req, res, next) => {
    try {
        const { categoryId } = req.value.params
        const foods = await categoryService.getAllFood(categoryId)
        return res.status(200).json({
            status: true,
            message: 'get foods success!',
            data: foods,
        })
    } catch (error) {
        next(error)
    }
}
//UPDATE
const updateCategory = async (req, res, next) => {
    try {
        const user = req.user
        if (user.role >= 2) {
            const err = new Error("you don't have access to this service")
            err.status = 400
            throw err
        }
        const { categoryId } = req.value.params
        const newCategory = req.value.body
        await categoryService.updateCategory(categoryId, newCategory)
        return res.status(200).json({
            status: true,
            message: 'update Categorys success!',
            data: [],
        })
    } catch (error) {
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
        const user = req.user
        if (user.role >= 2) {
            const err = new Error("you don't have access to this service")
            err.status = 400
            throw err
        }
        const { categoryId } = req.value.params

        await categoryService.deleteCategory(categoryId)
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
