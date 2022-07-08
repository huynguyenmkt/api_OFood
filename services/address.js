const Address = require('../models/Address')

const newAddress = async (address, user) => {
    const newAddress = new Address(address)
    newAddress.user = user._id
    await newAddress.save()
    user.address.push(newAddress._id)
    await user.save()
}

const getAllAddress = async () => {
    const addresses = await Address.find({ status: { $gte: 1 } })
    return addresses
}

const getAddress = async (addressId, user) => {
    const address = await Address.findById(addressId)
    if (address === null) {
        const err = new Error('address is not exits')
        err.status = 404
        throw err
    }
    if (address.status === 0) {
        const err = new Error('address was deleted')
        err.status = 400
        throw err
    }
    if (address.user.toString() != user._id.toString()) {
        const err = new Error("you don't have this address")
        err.status = 400
        throw err
    }
    return address
}

const updateAddress = async (addressId, newAddress, user) => {
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
        const err = new Error("you don't have access to change this address")
        err.status = 500
        throw err
    }
    await address.updateOne(newAddress)
}

const deleteAddress = async (addressId, user) => {
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
        const err = new Error("you don't have access to delete this address")
        err.status = 500
        throw err
    }
    address.status = 0
    await address.save()
    user.address.pull(address)
    await user.save()
}

module.exports = {
    newAddress,
    getAllAddress,
    getAddress,
    updateAddress,
    deleteAddress,
}
