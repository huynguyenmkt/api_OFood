const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')

const {
    validateBody,
    validateParam,
    schemas,
} = require('../helpers/routerHelpers')

router
    .route('/')
    .get(cartController.getAllCart)
    .post(validateBody(schemas.cartSchema), cartController.newCart)

router
    .route('/:cartId')
    .get(validateParam(schemas.idSchema, 'cartId'), cartController.getCart)
    .put(
        validateParam(schemas.idSchema, 'cartId'),
        validateBody(schemas.cartSchema),
        cartController.updateCart
    )

module.exports = router
