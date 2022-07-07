const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/review')

const {
    validateBody,
    validateParam,
    schemas,
} = require('../helpers/routerHelpers')
const middlewareControllers = require('../middlewares/auth')

router
    .route('/')
    .get(reviewController.getAllReview)
    .post(
        middlewareControllers.verifyToken,
        validateBody(schemas.reviewSchema),
        reviewController.newReview
    )

router
    .route('/:reviewId')
    .get(
        validateParam(schemas.idSchema, 'reviewId'),
        reviewController.getReview
    )
    .put(
        validateParam(schemas.idSchema, 'reviewId'),
        middlewareControllers.verifyToken,
        validateBody(schemas.reviewUpdateSchema),
        reviewController.updateReview
    )
    .delete(
        validateParam(schemas.idSchema, 'reviewId'),
        middlewareControllers.verifyToken,
        reviewController.deleteReview
    )

module.exports = router
