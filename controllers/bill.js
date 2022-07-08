const billService = require('../services/bill')

//CREATE
const newBill = async (req, res, next) => {
    // console.log(req.body)
    try {
        const userId = req.user._id
        const addressId = req.value.body.address
        const newBill = req.value.body

        const bill = await billService.newBill(addressId, newBill, userId)

        return res.status(201).json({
            status: true,
            message: 'create bill success!',
            data: bill,
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
        const bills = await billService.getAllBill()
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
        const bill = await billService.getBill(billId, user)
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

        const bill = await billService.updateBill(billId, newBill)
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
