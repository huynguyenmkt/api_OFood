const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category')

const {
    validateBody,
    validateParam,
    schemas,
} = require('../helpers/routerHelpers')
const middlewareControllers = require('../middlewares/auth')

router
    .route('/')
    .get(categoryController.getAllCategory)
    .post(
        middlewareControllers.verifyToken,
        validateBody(schemas.categorySchema),
        categoryController.newCategory
    )

router
    .route('/:categoryId')
    .get(
        validateParam(schemas.idSchema, 'categoryId'),
        categoryController.getCategory
    )
    .put(
        validateParam(schemas.idSchema, 'categoryId'),
        middlewareControllers.verifyToken,
        validateBody(schemas.categorySchema),
        categoryController.updateCategory
    )
    .delete(
        validateParam(schemas.idSchema, 'categoryId'),
        middlewareControllers.verifyToken,
        categoryController.deleteCategory
    )

router
    .route('/:categoryId/food')
    .get(
        validateParam(schemas.idSchema, 'categoryId'),
        categoryController.getAllFood
    )
    .post(
        validateParam(schemas.idSchema, 'categoryId'),
        middlewareControllers.verifyToken,
        validateBody(schemas.foodSchema),
        categoryController.newFood
    )

module.exports = router
