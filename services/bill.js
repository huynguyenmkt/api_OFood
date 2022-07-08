const Address = require('../models/Address')
const Bill = require('../models/Bill')
const BillInfo = require('../models/BillInfo')
const Cart = require('../models/Cart')
const Food = require('../models/Food')
const User = require('../models/User')

const newBill = async (addressId, bill, userId) => {
    //get user and address
    const user = await User.findById(userId).populate('cart')
    const address = await Address.findById(addressId)

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
    const newBill = new Bill(bill)
    newBill.user = user._id
    for (const item of user.cart) {
        const food = await Food.findById(item.food)
        if (food.quantity < item.quantity) {
            const err = new Error(
                `quantity of ${food.name} not enough, please check again!`
            )
            err.status = 400
            throw err
        }
        const priceOrder = food.price - food.price * (food.sale / 100)
        const newBillInfo = new BillInfo({
            bill: newBill._id,
            food: food._id,
            quantity: item.quantity,
            priceOrder,
        })
        food.buys += item.quantity
        food.quantity -= item.quantity
        if (food.quantity <= 0) {
            food.status = 0
        }
        await food.save()
        await newBillInfo.save()
        newBill.billInfos.push(newBillInfo._id)
    }

    await newBill.save()
    user.bills.push(newBill._id)
    user.cart = []

    await Cart.deleteMany({ user: user._id })
    await user.save()

    return newBill
}

const getAllBill = async () => {
    const bills = await Bill.find({}).populate('billInfos')
    return bills
}

const getBill = async (billId, user) => {
    const bill = await Bill.findById(billId).populate('billInfos')

    if (bill === null) {
        const err = new Error('bill is not exits')
        err.status = 404
        throw err
    }
    if (bill.status === 3) {
        const err = new Error('bill was cancel')
        err.status = 400
        throw err
    }
    if (bill.user.toString() != user._id.toString()) {
        const err = new Error("you don't have this bill")
        err.status = 400
        throw err
    }
    return bill
}

const updateBill = async (billId, newBill) => {
    const bill = await Bill.findByIdAndUpdate(billId, newBill).populate(
        'billInfos'
    )
    if (bill === null) {
        const err = new Error('bill is not exits')
        err.status = 404
        throw err
    }
    if (bill.status === 3) {
        const err = new Error('bill was cancel')
        err.status = 400
        throw err
    }
    if (newBill.status === 3) {
        for (const billInfo of bill.billInfos) {
            const food = await Food.findById(billInfo.food)
            food.buys -= billInfo.quantity
            food.quantity += billInfo.quantity
            if (food.status === 0) {
                food.status = 1
            }
            await food.save()
        }
    }
}

module.exports = {
    newBill,
    getAllBill,
    getBill,
    updateBill,
}
