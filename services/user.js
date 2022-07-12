const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const secretString = process.env.JWT_SECRET

const encodedToken = (userId) => {
    return jwt.sign(
        {
            sub: userId,
        },
        secretString,
        {
            expiresIn: '10d',
        }
    )
}

const newUser = async (user) => {
    try {
        const newUser = new User(user)
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(newUser.password, salt)

        newUser.password = hashed
        await newUser.save()
        newUser.password = undefined
        newUser.role = undefined
        const token = encodedToken(newUser._id)
        return { newUser, token }
    } catch (error) {
        throw error
    }
}

const loginUser = async (userName, password) => {
    try {
        const user = await User.findOne({ userName: userName })
        if (user === null) {
            const err = new Error('user name or password is wrong')
            err.status = 404
            throw err
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            const err = new Error('user name or password is wrong')
            err.status = 404
            throw err
        }

        user.password = undefined
        user.role = undefined
        const token = encodedToken(user._id)
        return { user, token }
    } catch (error) {
        throw error
    }
}

const getAllUser = async () => {
    try {
        const users = await User.find({})
        return users
    } catch (error) {
        throw error
    }
}

const getUser = async (user) => {
    try {
        const { password, role, ...filterUser } = user._doc
        return filterUser
    } catch (error) {
        throw error
    }
}

const getAllCart = async (userId) => {
    try {
        const user = await User.findById(userId).populate('cart')
        if (user === null) {
            const err = new Error('user is not exits')
            err.status = 404
            throw err
        }
        return user.cart
    } catch (error) {
        throw error
    }
}

const getAllAddress = async (userId) => {
    try {
        const user = await User.findById(userId).populate(
            'address',
            '-user -status'
        )
        return user.address
    } catch (error) {
        throw error
    }
}

const getAllBills = async (userId) => {
    try {
        const user = await User.findById(userId).populate({
            path: 'bills',
            populate: { path: 'billInfos' },
        })
        return user.bills
    } catch (error) {
        throw error
    }
}

const updateUser = async (userId, newUser) => {
    try {
        const user = await User.findByIdAndUpdate(userId, newUser)
    } catch (error) {
        throw error
    }
}

const updateRoleUser = async (userId, newUser) => {
    try {
        const user = await User.findByIdAndUpdate(userId, newUser)
        if (user === null) {
            const err = new Error('user is not exits')
            err.status = 404
            throw err
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    newUser,
    loginUser,
    getAllUser,
    getUser,
    getAllCart,
    getAllAddress,
    getAllBills,
    updateUser,
    updateRoleUser,
}
