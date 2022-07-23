const Cart = require('../models/Cart')
const Food = require('../models/Food')

const newCart = async (foodId, cart, user) => {
    const food = await Food.findById(foodId)

    if (food === null) {
        const err = new Error('food is not exits')
        err.status = 404
        throw err
    }
    if (food.quantity < cart.quantity) {
        const err = new Error(
            `quantity of ${food.name} is not enough, please check again`
        )
        err.status = 400
        throw err
    }
    const cartTemp = await Cart.find({ food: foodId, user: user._id })
    // console.log(cartTemp)
    if (cartTemp.length > 0) {
        const err = new Error(
            `${food.name} is already in your cart, please check again`
        )
        err.status = 400
        throw err
    }
    const newCart = new Cart(cart)
    // newCart.food = food._id
    newCart.user = user._id
    await newCart.save()

    user.cart.push(newCart._id)
    await user.save()

    return newCart.populate('food')
}

const getAllCart = async () => {
    const carts = await Cart.find({}).populate('food').populate('user')
    return carts
}

const getCart = async (cartId, user) => {
    const cart = await Cart.findById(cartId).populate('food')
    // .populate('user')
    if (cart === null) {
        const err = new Error('cart is not exits')
        err.status = 404
        throw err
    }
    if (cart.user.toString() != user._id.toString()) {
        const err = new Error("you don't have this cart")
        err.status = 400
        throw err
    }
    return cart
}

const updateCart = async (cartId, newCart, user) => {
    const cart = await Cart.findById(cartId)

    if (cart === null) {
        const err = new Error('cart is not exits')
        err.status = 404
        throw err
    }
    if (cart.user.toString() != user._id.toString()) {
        const err = new Error("you don't have this cart")
        err.status = 400
        throw err
    }
    if (newCart.quantity <= 0) {
        try {
            await cart.deleteOne()
            user.cart.pull(cart)
            await user.save()
        } catch (error) {
            throw error
        }
    } else {
        try {
            await cart.updateOne(newCart)
        } catch (error) {
            throw error
        }
    }
}

module.exports = {
    newCart,
    getAllCart,
    getCart,
    updateCart,
}
