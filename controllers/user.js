const User = require('../models/User')

//CREATE
const newUser = async (req, res, next) => {
    // console.log(req.body)
    try {
        const newUser = new User(req.value.body)
        await newUser.save()
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
        const { userId } = req.value.params
        const user = await User.findById(userId)
        if (user === null)
            return res.status(404).json({
                status: false,
                message: 'user not found!',
                data: [],
            })
        return res.status(200).json({
            status: true,
            message: 'get users success!',
            data: user,
        })
    } catch (error) {
        next(new Error('Not found userID'))
    }
}
const getAllCart = async (req, res, next) => {
    try {
        const { userId } = req.value.params
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
        const { userId } = req.value.params
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
        const { userId } = req.value.params
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
        const { userId } = req.value.params
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
    getUser,
    getAllCart,
    getAllAddress,
    getAllBills,
    updateUser,
}
