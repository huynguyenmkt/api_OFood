const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category')

const {
    validateBody,
    validateParam,
    schemas,
} = require('../helpers/routerHelpers')

router
    .route('/')
    .get(categoryController.getAllCategory)
    .post(validateBody(schemas.categorySchema), categoryController.newCategory)

router
    .route('/:categoryId')
    .get(
        validateParam(schemas.idSchema, 'categoryId'),
        categoryController.getCategory
    )
    .put(
        validateParam(schemas.idSchema, 'categoryId'),
        validateBody(schemas.categorySchema),
        categoryController.updateCategory
    )
    .delete(
        validateParam(schemas.idSchema, 'categoryId'),
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
        validateBody(schemas.foodSchema),
        categoryController.newFood
    )

module.exports = router
