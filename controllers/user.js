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
        return res.status(200).json({
            status: true,
            message: 'get users success!',
            data: [user],
        })
    } catch (error) {
        next(new Error('Not found userID'))
    }
}
//UPDATE
const updateUser = async (req, res, next) => {
    try {
        const { userId } = req.value.params
        const newUser = req.value.body
        const user = await User.findByIdAndUpdate(userId, newUser)
        return res.status(200).json({
            status: true,
            message: 'update users success!',
            data: [],
        })
    } catch (error) {
        console.log(error)
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
    updateUser,
}
