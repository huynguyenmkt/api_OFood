const express = require('express')
const router = express.Router()
const foodController = require('../controllers/food')

const {
    validateBody,
    validateParam,
    schemas,
} = require('../helpers/routerHelpers')

router
    .route('/')
    .get(foodController.getAllFood)
    .post(validateBody(schemas.foodSchema), foodController.newFood)

router.route('/topFood').get(foodController.getTopFood)

router
    .route('/:foodId')
    .get(validateParam(schemas.idSchema, 'foodId'), foodController.getFood)
    .put(
        validateParam(schemas.idSchema, 'foodId'),
        validateBody(schemas.foodSchema),
        foodController.updateFood
    )
    .delete(
        validateParam(schemas.idSchema, 'foodId'),
        foodController.deleteFood
    )
router
    .route('/:foodId/increaseBuys')
    .post(validateParam(schemas.idSchema, 'foodId'), foodController.incBuysFood)

module.exports = router
