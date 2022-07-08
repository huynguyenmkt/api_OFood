const reviewService = require('../services/review')
//CREATE
const newReview = async (req, res, next) => {
    try {
        const user = req.user
        const foodId = req.value.body.food
        const newReview = req.value.body
        const review = await reviewService.newReview(foodId, newReview, user)

        return res.status(201).json({
            status: true,
            message: 'create Review success!',
            data: review,
        })
    } catch (error) {
        next(error)
    }
}

//READ
const getAllReview = async (req, res, next) => {
    try {
        const reviews = await reviewService.getAllReview()
        return res.status(200).json({
            status: true,
            message: 'get all reviews success!',
            data: reviews,
        })
    } catch (error) {
        next(error)
    }
}
const getReview = async (req, res, next) => {
    try {
        const { reviewId } = req.value.params
        const review = await reviewService.getReview(reviewId)
        return res.status(200).json({
            status: true,
            message: 'get Reviews success!',
            data: review,
        })
    } catch (error) {
        next(error)
    }
}
//UPDATE
const updateReview = async (req, res, next) => {
    try {
        const user = req.user

        const { reviewId } = req.value.params

        const newReview = req.value.body
        await reviewService.updateReview(reviewId, newReview, user)
        return res.status(200).json({
            status: true,
            message: 'update Reviews success!',
            data: [],
        })
    } catch (error) {
        next(error)
    }
}
//DELETE
const deleteReview = async (req, res, next) => {
    try {
        const user = req.user
        const { reviewId } = req.value.params
        await reviewService.deleteReview(reviewId, user)
        return res.status(200).json({
            status: true,
            message: 'delete review success!',
            data: [],
        })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    newReview,
    getAllReview,
    getReview,
    updateReview,
    deleteReview,
}
