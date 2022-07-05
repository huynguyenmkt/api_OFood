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
        const userId = req.value.body.user
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
        if (user.cart.length <= 0) {
            const err = new Error('cart is empty!')
            err.status = 500
            throw err
        }
        const newBill = new Bill(req.value.body)

        for (const item of user.cart) {
            const food = await Food.findById(item.food)
            const priceOrder = food.price * (food.sale / 100)
            const newBillInfo = new BillInfo({
                bill: newBill._id,
                food: food._id,
                quantity: item.quantity,
                priceOrder,
            })
            await newBillInfo.save()
            newBill.billInfos.push(newBillInfo._id)
        }

        await newBill.save()
        user.bills.push(newBill._id)
        user.cart = []
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
        const { billId } = req.value.params
        const bill = await Bill.findById(billId).populate('billInfos')
        if (bill === null) {
            const err = new Error('bill is not exits')
            err.status = 404
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
        const { billId } = req.value.params
        const newBill = req.value.body
        const userId = req.value.body.user
        const addressId = req.value.body.address
        //get user and address
        const user = await User.findById(userId).populate('cart')
        const address = await Address.findById(addressId)

        const bill = await Bill.findById(billId)
        if (bill === null) {
            const err = new Error('Bill is not exits')
            err.status = 404
            throw err
        }
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
        await bill.updateOne(newBill)
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
