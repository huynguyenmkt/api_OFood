const Cart = require('../models/Cart')
const Food = require('../models/Food')
const User = require('../models/User')

//CREATE
const newCart = async (req, res, next) => {
    // console.log(req.body)
    try {
        const foodId = req.value.body.food
        const userId = req.value.body.user

        const food = await Food.findById(foodId)
        const user = await User.findById(userId)
        if (user === null) {
            return res.status(404).json({
                status: false,
                message: 'user is not exits',
                data: [],
            })
        }
        if (food === null) {
            return res.status(404).json({
                status: false,
                message: 'food is not exits',
                data: [],
            })
        }

        const newCart = new Cart(req.value.body)
        newCart.food = food._id
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
        const { cartId } = req.value.params
        const cart = await Cart.findById(cartId)
            .populate('food')
            .populate('user')
        if (cart === null)
            return res.status(404).json({
                status: false,
                message: 'Cart not found!',
                data: [],
            })
        return res.status(200).json({
            status: true,
            message: 'get carts success!',
            data: cart,
        })
    } catch (error) {
        next(new Error('Not found CartID'))
    }
}
//UPDATE
const updateCart = async (req, res, next) => {
    try {
        const { cartId } = req.value.params
        const foodId = req.value.body.food
        const userId = req.value.body.user

        const food = await Food.findById(foodId)
        const user = await User.findById(userId)
        if (user === null) {
            return res.status(404).json({
                status: false,
                message: 'user is not exits',
                data: [],
            })
        }
        if (food === null) {
            return res.status(404).json({
                status: false,
                message: 'food is not exits',
                data: [],
            })
        }

        const newCart = req.value.body
        const cart = await Cart.findByIdAndUpdate(cartId, newCart)

        if (cart === null) {
            return res.status(404).json({
                status: false,
                message: 'CartID is not exits',
                data: [],
            })
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
