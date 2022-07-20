const foodService = require('../services/food')
//CREATE
const newFood = async (req, res, next) => {
    try {
        const user = req.user
        const newFood = req.value.body
        const food = await foodService.newFood(newFood)
        return res.status(201).json({
            status: true,
            message: 'create food success!',
            data: food,
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

//READ
const getAllFood = async (req, res, next) => {
    try {
        // console.log(req.query)
        const { page, limit, sortPrice, name, underPrice } = req.query
        const foods = await foodService.getAllFood(page, limit, sortPrice, name, underPrice)
        // console.log(foods)
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
        const foods = await foodService.getTopFood()
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
        const food = await foodService.getFood(foodId)

        return res.status(200).json({
            status: true,
            message: 'get food success!',
            data: food,
        })
    } catch (error) {
        next(error)
    }
}
// UPDATE
const updateFood = async (req, res, next) => {
    try {
        const user = req.user
        const { foodId } = req.value.params
        const newFood = req.value.body
        await foodService.updateFood(foodId, newFood)
        return res.status(200).json({
            status: true,
            message: 'update foods success!',
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
const deleteFood = async (req, res, next) => {
    try {
        const user = req.user
        const { foodId } = req.value.params
        await foodService.deleteFood(foodId)

        return res.status(200).json({
            status: true,
            message: 'sold out!',
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
    getTopFood,
    updateFood,
    deleteFood,
}
