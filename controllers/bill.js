const Address = require('../models/Address')
const Bill = require('../models/Bill')
const BillInfo = require('../models/BillInfo')
const Cart = require('../models/Cart')
const Food = require('../models/Food')
const User = require('../models/User')
//CREATE
const newBill = async (req, res, next) => {
    // console.log(req.body)
    try {
        const userId = req.user._id
        const addressId = req.value.body.address
        //get user and address
        const user = await User.findById(userId).populate('cart')
        const address = await Address.findById(addressId)

        if (user === null) {
            const err = new Error('user is not exits')
            err.status = 404
            throw err
        }
        if (address === null) {
            const err = new Error('address is not exits')
            err.status = 404
            throw err
        }
        if (address.user.toString() != user._id.toString()) {
            const err = new Error("you don't have this address")
            err.status = 400
            throw err
        }
        if (user.cart.length <= 0) {
            const err = new Error('cart is empty!')
            err.status = 500
            throw err
        }
        const newBill = new Bill(req.value.body)
        newBill.user = user._id
        for (const item of user.cart) {
            const food = await Food.findById(item.food)
            const priceOrder = food.price * (food.sale / 100)
            const newBillInfo = new BillInfo({
                bill: newBill._id,
                food: food._id,
                quantity: item.quantity,
                priceOrder,
            })
            food.buys += item.quantity
            await food.save()
            await newBillInfo.save()
            newBill.billInfos.push(newBillInfo._id)
        }

        await newBill.save()
        user.bills.push(newBill._id)
        user.cart = []
        await Cart.deleteMany({ user: user._id })
        await user.save()
        return res.status(201).json({
            status: true,
            message: 'create bill success!',
            data: newBill,
        })
    } catch (error) {
        next(error)
    }
}

//READ
const getAllBill = async (req, res, next) => {
    try {
        const user = req.user
        if (user.role !== 0) {
            const err = new Error("you don't have access to this service")
            err.status = 400
            throw err
        }
        const bills = await Bill.find({}).populate('billInfos')
        return res.status(200).json({
            status: true,
            message: 'get all bills success!',
            data: bills,
        })
    } catch (error) {
        next(error)
    }
}
const getBill = async (req, res, next) => {
    try {
        const user = req.user
        const { billId } = req.value.params
        const bill = await Bill.findById(billId).populate('billInfos')

        if (bill === null) {
            const err = new Error('bill is not exits')
            err.status = 404
            throw err
        }
        if (bill.user.toString() != user._id.toString()) {
            const err = new Error("you don't have this bill")
            err.status = 400
            throw err
        }
        return res.status(200).json({
            status: true,
            message: 'get Bills success!',
            data: bill,
        })
    } catch (error) {
        next(error)
    }
}
//UPDATE
const updateBill = async (req, res, next) => {
    try {
        const userAdmin = req.user
        if (userAdmin.role >= 2) {
            const err = new Error("you don't have access to this service")
            err.status = 400
            throw err
        }
        const { billId } = req.value.params
        const newBill = req.value.body

        const bill = await Bill.findByIdAndUpdate(billId, newBill).populate(
            'billInfos'
        )
        if (bill === null) {
            const err = new Error('bill is not exits')
            err.status = 404
            throw err
        }
        if (newBill.status === 3) {
            for (const billInfo of bill.billInfos) {
                const food = await Food.findById(billInfo.food)
                food.buys -= billInfo.quantity
                await food.save()
            }
        }
        return res.status(200).json({
            status: true,
            message: 'update Bills success!',
            data: [],
        })
    } catch (error) {
        next(error)
    }
}
//DELETE

module.exports = { newBill, getAllBill, getBill, updateBill }
