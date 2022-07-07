const express = require('express')
const router = express.Router()
const addressController = require('../controllers/address')

const {
    validateBody,
    validateParam,
    schemas,
} = require('../helpers/routerHelpers')
const middlewareControllers = require('../middlewares/auth')

router
    .route('/')
    .get(middlewareControllers.verifyToken, addressController.getAllAddress)
    .post(
        middlewareControllers.verifyToken,
        validateBody(schemas.addressSchema),
        addressController.newAddress
    )

router
    .route('/:addressId')
    .get(
        validateParam(schemas.idSchema, 'addressId'),
        middlewareControllers.verifyToken,
        addressController.getAddress
    )
    .put(
        validateParam(schemas.idSchema, 'addressId'),
        middlewareControllers.verifyToken,
        validateBody(schemas.addressSchema),
        addressController.updateAddress
    )
    .delete(
        validateParam(schemas.idSchema, 'addressId'),
        middlewareControllers.verifyToken,
        addressController.deleteAddress
    )

module.exports = router
