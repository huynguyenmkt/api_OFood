const Address = require('../models/Address')
const User = require('../models/User')

//CREATE
const newAddress = async (req, res, next) => {
    // console.log(req.body)
    try {
        const user = req.user
        const newAddress = new Address(req.value.body)
        newAddress.user = user._id
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
        const user = req.user
        if (user.role !== 0) {
            const err = new Error("you don't have access to this service")
            err.status = 400
            throw err
        }
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
        const user = req.user
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
        if (address.user.toString() != user._id.toString()) {
            const err = new Error("you don't have this address")
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
        const user = req.user
        const { addressId } = req.value.params
        const newAddress = req.value.body
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
        if (address.user.toString() != user._id.toString()) {
            const err = new Error(
                "you don't have access to change this address"
            )
            err.status = 500
            throw err
        }
        await address.updateOne(newAddress)
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
        const user = req.user
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
        if (address.user.toString() != user._id.toString()) {
            const err = new Error(
                "you don't have access to delete this address"
            )
            err.status = 500
            throw err
        }
        address.status = 0
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
