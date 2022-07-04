const Food = require('../models/Food')

//CREATE
const newFood = async (req, res, next) => {
    // console.log(req.body)
    try {
        const newFood = new Food(req.value.body)
        await newFood.save()
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
        const { foodId } = req.value.params
        const newFood = req.value.body
        const food = await Food.findByIdAndUpdate(foodId, newFood)
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
        const food = await Food.findByIdAndUpdate(foodId, newFood)
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
        const { foodId } = req.value.params
        const newFood = await Food.findById(foodId)

        if (newFood === null)
            return res.status(404).json({
                status: false,
                message: 'food not found!',
                data: [],
            })

        newFood.status = 0
        const food = await Food.findByIdAndUpdate(foodId, newFood)

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
