const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')

const {
    validateBody,
    validateParam,
    schemas,
} = require('../helpers/routerHelpers')
const middlewareControllers = require('../middlewares/auth')

router
    .route('/')
    .get(middlewareControllers.verifyToken, cartController.getAllCart)
    .post(
        middlewareControllers.verifyToken,
        validateBody(schemas.cartSchema),
        cartController.newCart
    )

router
    .route('/:cartId')
    .get(
        validateParam(schemas.idSchema, 'cartId'),
        middlewareControllers.verifyToken,
        cartController.getCart
    )
    .put(
        validateParam(schemas.idSchema, 'cartId'),
        middlewareControllers.verifyToken,
        validateBody(schemas.cartUpdateSchema),
        cartController.updateCart
    )

module.exports = router
