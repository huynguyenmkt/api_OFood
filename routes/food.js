const express = require('express')
const router = express.Router()
const foodController = require('../controllers/food')

const {
    validateBody,
    validateParam,
    schemas,
} = require('../helpers/routerHelpers')
const middlewareControllers = require('../middlewares/auth')

router
    .route('/')
    .get(foodController.getAllFood)
    .post(
        middlewareControllers.verifyStaffToken,
        validateBody(schemas.foodSchema),
        foodController.newFood
    )

router.route('/topFood').get(foodController.getTopFood)

router
    .route('/:foodId')
    .get(validateParam(schemas.idSchema, 'foodId'), foodController.getFood)
    .put(
        validateParam(schemas.idSchema, 'foodId'),
        validateBody(schemas.foodUpdateSchema),
        middlewareControllers.verifyStaffToken,
        foodController.updateFood
    )
    .delete(
        validateParam(schemas.idSchema, 'foodId'),
        middlewareControllers.verifyStaffToken,
        foodController.deleteFood
    )

module.exports = router
