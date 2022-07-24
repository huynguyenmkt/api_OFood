const userService = require('../services/user')
//CREATE
const newUser = async (req, res, next) => {
    try {
        const newUser = req.value.body
        const result = await userService.newUser(newUser)
        return res.status(201).json({
            status: true,
            message: 'create user success!',
            data: result.newUser,
            accessToken: result.token,
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
const loginUser = async (req, res, next) => {
    try {
        const userName = req.value.body.userName
        const password = req.value.body.password
        const result = await userService.loginUser(userName, password)
        return res.status(200).json({
            status: true,
            message: 'login success!',
            data: result.user,
            accessToken: result.token,
        })
    } catch (error) {
        next(error)
    }
}
const secret = async (req, res, next) => {
    res.status(200).json({
        status: true,
        message: 'secret success',
        data: req.user.role,
    })
}
const getAllUser = async (req, res, next) => {
    try {
        const user = req.user
        const users = await userService.getAllUser()
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
        const result = await userService.getUser(user)
        return res.status(200).json({
            status: true,
            message: 'get users success!',
            data: result.filterUser,
            accessToken: result.token
        })
    } catch (error) {
        next(error)
    }
}
const getAllCart = async (req, res, next) => {
    try {
        const userId = req.user._id
        const carts = await userService.getAllCart(userId)
        return res.status(200).json({
            status: true,
            message: 'get carts success!',
            data: carts,
        })
    } catch (error) {
        next(error)
    }
}
const getAllAddress = async (req, res, next) => {
    try {
        const userId = req.user._id
        const address = await userService.getAllAddress(userId)
        return res.status(200).json({
            status: true,
            message: 'get address success!',
            data: address,
        })
    } catch (error) {
        next(error)
    }
}
const getAllBills = async (req, res, next) => {
    try {
        const { page, limit, sortdate } = req.query
        const userId = req.user._id
        const bills = await userService.getAllBills(
            userId,
            page,
            limit,
            sortdate
        )
        return res.status(200).json({
            status: true,
            message: 'get bills success!',
            data: bills,
        })
    } catch (error) {
        next(error)
    }
}
//UPDATE
const updateUser = async (req, res, next) => {
    try {
        const userId = req.user._id
        const newUser = req.value.body

        await userService.updateUser(userId, newUser)
        return res.status(200).json({
            status: true,
            message: 'update users success!',
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
const updateRoleUser = async (req, res, next) => {
    try {
        const { userId } = req.value.params
        const newUser = req.value.body

        console.log(userId)

        await userService.updateRoleUser(userId, newUser)
        return res.status(200).json({
            status: true,
            message: 'update role success!',
            data: [],
        })
    } catch (error) {
        next(error)
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
    updateRoleUser,
}
