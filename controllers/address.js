const addressService = require('../services/address')

//CREATE
const newAddress = async (req, res, next) => {
    // console.log(req.body)
    try {
        const user = req.user
        const newAddress = req.value.body

        await addressService.newAddress(newAddress, user)

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

        const addresses = await addressService.getAllAddress()
        return res.status(200).json({
            status: true,
            message: 'get all address success!',
            data: addresses,
        })
    } catch (error) {
        next(error)
    }
}
const getAddress = async (req, res, next) => {
    try {
        const user = req.user
        const { addressId } = req.value.params
        const address = await addressService.getAddress(addressId, user)
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

        const address = await addressService.updateAddress(
            addressId,
            newAddress,
            user
        )
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

        const address = await addressService.deleteAddress(addressId, user)
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
