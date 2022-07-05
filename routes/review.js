const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/review')

const {
    validateBody,
    validateParam,
    schemas,
} = require('../helpers/routerHelpers')

router
    .route('/')
    .get(reviewController.getAllReview)
    .post(validateBody(schemas.reviewSchema), reviewController.newReview)

router
    .route('/:reviewId')
    .get(
        validateParam(schemas.idSchema, 'reviewId'),
        reviewController.getReview
    )
    .put(
        validateParam(schemas.idSchema, 'reviewId'),
        validateBody(schemas.reviewSchema),
        reviewController.updateReview
    )
    .delete(
        validateParam(schemas.idSchema, 'reviewId'),
        reviewController.deleteReview
    )

module.exports = router
