const Food = require('../models/Food')
const Category = require('../models/Category')
//CREATE
const newFood = async (req, res, next) => {
    // console.log(req.body)
    try {
        const user = req.user
        if (user.role >= 2) {
            const err = new Error("you don't have access to this service")
            err.status = 400
            throw err
        }
        const newFood = new Food(req.value.body)
        const categoryId = newFood.category
        if (categoryId) {
            // console.log(categoryId)
            const category = await Category.findById(categoryId)
            if (category === null) {
                return res.status(404).json({
                    status: false,
                    message: 'category is not exits',
                    data: [],
                })
            }
            await newFood.save()
            category.foods.push(newFood)
            await category.save()
        } else {
            await newFood.save()
        }
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
const getAllFood = async (req, res, next) => {
    try {
        const foods = await Food.find({ status: { $gte: 1 } })
        return res.status(200).json({
            status: true,
            message: 'get all foods success!',
            data: foods,
        })
    } catch (error) {
        next(error)
    }
}
const getTopFood = async (req, res, next) => {
    try {
        const foods = await Food.find({ status: { $gte: 1 } })
            .sort({ buys: -1 })
            .limit(10)
        return res.status(200).json({
            status: true,
            message: 'get top foods success!',
            data: foods,
        })
    } catch (error) {
        next(error)
    }
}
const getFood = async (req, res, next) => {
    try {
        const { foodId } = req.value.params
        const food = await Food.findById(foodId)

        if (food === null)
            return res.status(404).json({
                status: false,
                message: 'food not found!',
                data: [],
            })

        return res.status(200).json({
            status: true,
            message: 'get food success!',
            data: food,
        })
    } catch (error) {
        next(new Error('Not found foodID'))
    }
}
// UPDATE
const updateFood = async (req, res, next) => {
    try {
        const user = req.user
        if (user.role >= 2) {
            const err = new Error("you don't have access to this service")
            err.status = 400
            throw err
        }
        const { foodId } = req.value.params
        const newFood = req.value.body
        const categoryId = req.value.body.category
        if (categoryId) {
            const category = await Category.findById(categoryId)
            if (category === null) {
                const err = new Error('category is not exits')
                err.status = 404
                throw err
            }
        }
        const food = await Food.findByIdAndUpdate(foodId, newFood)
        if (food === null) {
            const err = new Error('food is not exits')
            err.status = 404
            throw err
        }
        return res.status(200).json({
            status: true,
            message: 'update foods success!',
            data: [],
        })
    } catch (error) {
        next(error)
    }
}
const incBuysFood = async (req, res, next) => {
    try {
        const { foodId } = req.value.params
        const newFood = await Food.findById(foodId)

        if (newFood.status === 0) {
            return res.status(400).json({
                status: false,
                message: 'food was deleted!',
                data: [],
            })
        }

        if (newFood === null)
            return res.status(404).json({
                status: false,
                message: 'food not found!',
                data: [],
            })

        newFood.buys += 1
        await newFood.save()
        return res.status(200).json({
            status: true,
            message: 'increase buys foods success!',
            data: [],
        })
    } catch (error) {
        next(error)
    }
}
//DELETE
const deleteFood = async (req, res, next) => {
    try {
        const user = req.user
        if (user.role >= 2) {
            const err = new Error("you don't have access to this service")
            err.status = 400
            throw err
        }
        const { foodId } = req.value.params
        const newFood = await Food.findById(foodId)

        if (newFood === null)
            return res.status(404).json({
                status: false,
                message: 'food not found!',
                data: [],
            })

        newFood.status = 0
        await newFood.save()

        return res.status(200).json({
            status: true,
            message: 'delete food success!',
            data: [],
        })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    newFood,
    getAllFood,
    getFood,
    updateFood,
    deleteFood,
    getTopFood,
    incBuysFood,
}
