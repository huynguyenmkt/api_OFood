const express = require('express')
const router = express.Router()
const billController = require('../controllers/bill')

const {
    validateBody,
    validateParam,
    schemas,
} = require('../helpers/routerHelpers')
const middlewareControllers = require('../middlewares/auth')

router
    .route('/')
    .get(middlewareControllers.verifyStaffToken, billController.getAllBill)
    .post(
        middlewareControllers.verifyToken,
        validateBody(schemas.billSchema),
        billController.newBill
    )

router
    .route('/:billId')
    .get(
        validateParam(schemas.idSchema, 'billId'),
        middlewareControllers.verifyToken,
        billController.getBill
    )
    .put(
        validateParam(schemas.idSchema, 'billId'),
        middlewareControllers.verifyStaffToken,
        validateBody(schemas.billUpdateSchema),
        billController.updateBill
    )
module.exports = router
