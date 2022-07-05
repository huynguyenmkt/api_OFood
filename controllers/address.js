const Address = require('../models/Address')
const User = require('../models/User')

//CREATE
const newAddress = async (req, res, next) => {
    // console.log(req.body)
    try {
        const userId = req.value.body.user
        const user = await User.findById(userId)
        if (user === null) {
            return res.status(404).json({
                status: false,
                message: 'user is not exits',
                data: [],
            })
        }
        const newAddress = new Address(req.value.body)
        await newAddress.save()
        user.address.push(newAddress._id)
        await user.save()
        return res.status(201).json({
            status: true,
            message: 'create Address success!',
            data: newAddress,
        })
    } catch (error) {
        next(error)
    }
}

//READ
const getAllAddress = async (req, res, next) => {
    try {
        const address = await Address.find({ status: { $gte: 1 } })
        return res.status(200).json({
            status: true,
            message: 'get all address success!',
            data: address,
        })
    } catch (error) {
        next(error)
    }
}
const getAddress = async (req, res, next) => {
    try {
        const { addressId } = req.value.params
        const address = await Address.findById(addressId)
        if (address === null) {
            const err = new Error('address is not exits')
            err.status = 404
            throw err
        }
        if (address.status === 0) {
            const err = new Error('address was deleted')
            err.status = 500
            throw err
        }
        return res.status(200).json({
            status: true,
            message: 'get addresss success!',
            data: address,
        })
    } catch (error) {
        next(error)
    }
}
//UPDATE
const updateAddress = async (req, res, next) => {
    try {
        const { addressId } = req.value.params
        const newAddress = req.value.body
        const address = await Address.findByIdAndUpdate(addressId, newAddress)
        if (address === null) {
            const err = new Error('address is not exits')
            err.status = 404
            throw err
        }
        if (address.status === 0) {
            const err = new Error('address was deleted')
            err.status = 500
            throw err
        }
        return res.status(200).json({
            status: true,
            message: 'update addresss success!',
            data: [],
        })
    } catch (error) {
        next(error)
    }
}
//DELETE
const deleteAddress = async (req, res, next) => {
    try {
        const { addressId } = req.value.params
        const address = await Address.findById(addressId)
        if (address === null) {
            const err = new Error('address is not exits')
            err.status = 404
            throw err
        }
        if (address.status === 0) {
            const err = new Error('address was deleted')
            err.status = 500
            throw err
        }
        address.status = 0
        const user = await User.findById(address.user)
        if (user === null) {
            const err = new Error('address owner is wrong!')
            err.status = 404
            throw err
        }
        await address.save()
        user.address.pull(address)
        await user.save()
        return res.status(200).json({
            status: true,
            message: 'delete addresss success!',
            data: [],
        })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    newAddress,
    getAllAddress,
    getAddress,
    updateAddress,
    deleteAddress,
}
