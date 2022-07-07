const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
//CREATE
const newUser = async (req, res, next) => {
    // console.log(req.body)
    try {
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(req.value.body.password, salt)

        const newUser = new User(req.value.body)
        newUser.password = hashed
        await newUser.save()
        newUser.password = undefined
        const token = encodedToken(newUser._id)
        res.setHeader('Authorization', token)
        return res.status(201).json({
            status: true,
            message: 'create user success!',
            data: newUser,
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

//READ
const loginUser = async (req, res, next) => {
    try {
        const userName = req.value.body.userName
        const password = req.value.body.password
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
        const token = encodedToken(user._id)
        return res.status(200).json({
            status: true,
            message: 'login success!',
            data: user,
            accessToken: token,
        })
    } catch (error) {
        next(error)
    }
}
const secret = async (req, res, next) => {
    res.status(200).json({
        status: true,
        message: 'secret success',
        data: req.user,
    })
}
const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find({})
        return res.status(200).json({
            status: true,
            message: 'get all users success!',
            data: users,
        })
    } catch (error) {
        next(error)
    }
}
const getUser = async (req, res, next) => {
    try {
        const user = req.user
        const { password, role, ...filterUser } = user._doc
        return res.status(200).json({
            status: true,
            message: 'get users success!',
            data: filterUser,
        })
    } catch (error) {
        next(error)
    }
}
const getAllCart = async (req, res, next) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId).populate('cart')
        if (user === null)
            return res.status(404).json({
                status: false,
                message: 'user not found!',
                data: [],
            })
        return res.status(200).json({
            status: true,
            message: 'get carts success!',
            data: user.cart,
        })
    } catch (error) {
        next(error)
    }
}
const getAllAddress = async (req, res, next) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId).populate(
            'address',
            '-user -status'
        )
        if (user === null)
            return res.status(404).json({
                status: false,
                message: 'user not found!',
                data: [],
            })
        return res.status(200).json({
            status: true,
            message: 'get address success!',
            data: user.address,
        })
    } catch (error) {
        next(error)
    }
}
const getAllBills = async (req, res, next) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId).populate({
            path: 'bills',
            populate: { path: 'billInfos' },
        })
        if (user === null)
            return res.status(404).json({
                status: false,
                message: 'user not found!',
                data: [],
            })
        return res.status(200).json({
            status: true,
            message: 'get bills success!',
            data: user.bills,
        })
    } catch (error) {
        next(error)
    }
}
//UPDATE
const updateUser = async (req, res, next) => {
    try {
        const userId = req.user._id
        console.log(userId)
        const newUser = req.value.body
        const user = await User.findByIdAndUpdate(userId, newUser)
        if (user === null) {
            const err = new Error('user is not exits')
            err.status = 404
            throw err
        }
        return res.status(200).json({
            status: true,
            message: 'update users success!',
            data: [],
        })
    } catch (error) {
        // console.log(error)
        if (error.codeName === 'DuplicateKey') {
            // console.log(JSON.stringify(error[Object.keys(error)[4]]))
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

module.exports = {
    getAllUser,
    newUser,
    loginUser,
    secret,
    getUser,
    getAllCart,
    getAllAddress,
    getAllBills,
    updateUser,
}
