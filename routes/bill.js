const express = require('express')
const router = express.Router()
const billController = require('../controllers/bill')

const {
    validateBody,
    validateParam,
    schemas,
} = require('../helpers/routerHelpers')

router
    .route('/')
    .get(billController.getAllBill)
    .post(validateBody(schemas.billSchema), billController.newBill)

router
    .route('/:billId')
    .get(validateParam(schemas.idSchema, 'billId'), billController.getBill)
    .put(
        validateParam(schemas.idSchema, 'billId'),
        validateBody(schemas.billSchema),
        billController.updateBill
    )
module.exports = router
