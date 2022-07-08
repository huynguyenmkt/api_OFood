const Cart = require('../models/Cart')
const Food = require('../models/Food')
const User = require('../models/User')
const cartService = require('../services/cart')
//CREATE
const newCart = async (req, res, next) => {
    // console.log(req.body)
    try {
        const user = req.user

        const foodId = req.value.body.food
        const newCart = req.value.body

        const cart = await cartService.newCart(foodId, newCart, user)

        return res.status(201).json({
            status: true,
            message: 'create Cart success!',
            data: cart,
        })
    } catch (error) {
        next(error)
    }
}

//READ
const getAllCart = async (req, res, next) => {
    try {
        const user = req.user
        if (user.role !== 0) {
            const err = new Error("you don't have access to this service")
            err.status = 400
            throw err
        }
        const carts = await cartService.getAllCart()
        return res.status(200).json({
            status: true,
            message: 'get all carts success!',
            data: carts,
        })
    } catch (error) {
        next(error)
    }
}
const getCart = async (req, res, next) => {
    try {
        const user = req.user
        const { cartId } = req.value.params
        const cart = await cartService.getCart(cartId, user)
        return res.status(200).json({
            status: true,
            message: 'get cart success!',
            data: cart,
        })
    } catch (error) {
        next(error)
    }
}
//UPDATE
const updateCart = async (req, res, next) => {
    try {
        const user = req.user
        const { cartId } = req.value.params

        const newCart = req.value.body

        const cart = await cartService.updateCart(cartId, newCart, user)
        return res.status(200).json({
            status: true,
            message: 'update Carts success!',
            data: [],
        })
    } catch (error) {
        next(error)
    }
}
//DELETE

module.exports = {
    newCart,
    getAllCart,
    getCart,
    updateCart,
}
