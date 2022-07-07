const Bill = require('../models/Bill')
const Food = require('../models/Food')
const Review = require('../models/Review')
const User = require('../models/User')

//CREATE
const newReview = async (req, res, next) => {
    // console.log(req.body)
    try {
        const user = req.user
        const foodId = req.value.body.food

        const food = await Food.findById(foodId)
        if (food === null) {
            const err = new Error('food is not exits')
            err.status = 404
            throw err
        }
        const newReview = new Review(req.value.body)
        newReview.user = user._id
        await newReview.save()
        food.reviews.push(newReview._id)
        await food.save()
        return res.status(201).json({
            status: true,
            message: 'create Review success!',
            data: newReview,
        })
    } catch (error) {
        next(error)
    }
}

//READ
const getAllReview = async (req, res, next) => {
    try {
        const reviews = await Review.find({})
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
        const review = await Review.findById(reviewId)
        if (review === null) {
            const err = new Error('review is not exits')
            err.status = 404
            throw err
        }
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
        const review = await Review.findById(reviewId)
        if (review === null) {
            const err = new Error('review is not exits')
            err.status = 404
            throw err
        }
        if (review.user.toString() != user._id.toString()) {
            const err = new Error('you are not review owner')
            err.status = 400
            throw err
        }
        await review.updateOne(newReview)
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
        const review = await Review.findById(reviewId)
        if (review === null) {
            const err = new Error('review is not exits')
            err.status = 404
            throw err
        }
        if (review.user.toString() != user._id.toString()) {
            const err = new Error('you are not review owner')
            err.status = 400
            throw err
        }
        await review.deleteOne()
        await Food.updateMany(
            { reviews: reviewId },
            {
                $pull: { reviews: reviewId },
            }
        )
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
