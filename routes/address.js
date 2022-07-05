const express = require('express')
const router = express.Router()
const addressController = require('../controllers/address')

const {
    validateBody,
    validateParam,
    schemas,
} = require('../helpers/routerHelpers')

router
    .route('/')
    .get(addressController.getAllAddress)
    .post(validateBody(schemas.addressSchema), addressController.newAddress)

router
    .route('/:addressId')
    .get(
        validateParam(schemas.idSchema, 'addressId'),
        addressController.getAddress
    )
    .put(
        validateParam(schemas.idSchema, 'addressId'),
        validateBody(schemas.addressSchema),
        addressController.updateAddress
    )
    .delete(
        validateParam(schemas.idSchema, 'addressId'),
        addressController.deleteAddress
    )

module.exports = router
