const jwt = require('jsonwebtoken')
const User = require('../models/User')

const secretString = process.env.JWT_SECRET

const middlewareControllers = {
    verifyToken: (req, res, next) => {
        const token = req.headers.authorization
        if (token) {
            const accessToken = token.split(' ')[1]
            jwt.verify(accessToken, secretString, async (err, payload) => {
                if (err) {
                    return res.status(403).json({
                        status: false,
                        message: 'Token is not valid!',
                        refresh: true,
                    })
                }
                const user = await User.findById(payload.sub)
                if (!user) {
                    return res.status(404).json({
                        status: false,
                        message: 'User is not exits',
                        refresh: true,
                    })
                }
                req.user = user
                next()
            })
        } else {
            return res.status(401).json({
                status: false,
                message: "You're not authentication!",
                refresh: true,
            })
        }
    },
    verifyStaffToken: (req, res, next) => {
        const token = req.headers.authorization
        if (token) {
            const accessToken = token.split(' ')[1]
            jwt.verify(accessToken, secretString, async (err, payload) => {
                if (err) {
                    return res.status(403).json({
                        status: false,
                        message: 'Token is not valid!',
                        refresh: true,
                    })
                }
                const user = await User.findById(payload.sub)
                if (!user) {
                    return res.status(404).json({
                        status: false,
                        message: 'User is not exits',
                        refresh: true,
                    })
                }
                //magic number
                if (user.role !== 0 && user.role !== 1) {
                    return res.status(404).json({
                        status: false,
                        message: "you don't have access to this service",
                        refresh: true,
                    })
                }
                req.user = user
                next()
            })
        } else {
            return res.status(401).json({
                status: false,
                message: "You're not authentication!",
                refresh: true,
            })
        }
    },
    verifyAdminToken: (req, res, next) => {
        const token = req.headers.authorization
        if (token) {
            const accessToken = token.split(' ')[1]
            jwt.verify(accessToken, secretString, async (err, payload) => {
                if (err) {
                    return res.status(403).json({
                        status: false,
                        message: 'Token is not valid!',
                        refresh: true,
                    })
                }
                const user = await User.findById(payload.sub)
                if (!user) {
                    return res.status(404).json({
                        status: false,
                        message: 'User is not exits',
                        refresh: true,
                    })
                }
                if (user.role != 0) {
                    return res.status(404).json({
                        status: false,
                        message: "you don't have access to this service",
                        refresh: true,
                    })
                }
                req.user = user
                next()
            })
        } else {
            return res.status(401).json({
                status: false,
                message: "You're not authentication!",
                refresh: true,
            })
        }
    },
}

module.exports = middlewareControllers
