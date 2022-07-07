const Cart = require('../models/Cart')
const Food = require('../models/Food')
const User = require('../models/User')

//CREATE
const newCart = async (req, res, next) => {
    // console.log(req.body)
    try {
        const user = req.user

        const foodId = req.value.body.food
        const food = await Food.findById(foodId)

        if (food === null) {
            return res.status(404).json({
                status: false,
                message: 'food is not exits',
                data: [],
            })
        }

        const newCart = new Cart(req.value.body)
        // newCart.food = food._id
        newCart.user = user._id
        await newCart.save()

        user.cart.push(newCart._id)
        await user.save()

        return res.status(201).json({
            status: true,
            message: 'create Cart success!',
            data: newCart,
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
        const carts = await Cart.find({}).populate('food').populate('user')
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
        const cart = await Cart.findById(cartId).populate('food')
        // .populate('user')
        if (cart === null)
            return res.status(404).json({
                status: false,
                message: 'Cart not found!',
                data: [],
            })
        if (cart.user.toString() != user._id.toString()) {
            const err = new Error("you don't have this cart")
            err.status = 400
            throw err
        }
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
        const cart = await Cart.findById(cartId)

        if (cart === null) {
            return res.status(404).json({
                status: false,
                message: 'CartID is not exits',
                data: [],
            })
        }
        if (cart.user.toString() != user._id.toString()) {
            const err = new Error("you don't have this cart")
            err.status = 400
            throw err
        }
        if (newCart.quantity <= 0) {
            await cart.deleteOne()
            user.cart.pull(cart)
            await user.save()
        } else {
            await cart.updateOne(newCart)
        }
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
