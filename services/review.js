const Food = require('../models/Food')
const Review = require('../models/Review')

const newReview = async (foodId, review, user) => {
    try {
        const food = await Food.findById(foodId)
        if (food === null) {
            const err = new Error('food is not exits')
            err.status = 404
            throw err
        }
        const newReview = new Review(review)
        newReview.user = user._id
        await newReview.save()
        food.reviews.push(newReview._id)
        await food.save()

        return newReview
    } catch (error) {
        throw error
    }
}

const getAllReview = async () => {
    try {
        const reviews = await Review.find({})
        return reviews
    } catch (error) {
        throw error
    }
}

const getReview = async (reviewId) => {
    try {
        const review = await Review.findById(reviewId)
        if (review === null) {
            const err = new Error('review is not exits')
            err.status = 404
            throw err
        }
        return review
    } catch (error) {
        throw error
    }
}

const updateReview = async (reviewId, newReview, user) => {
    try {
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
    } catch (error) {
        throw error
    }
}

const deleteReview = async (reviewId, user) => {
    try {
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
    } catch (error) {
        throw error
    }
}

module.exports = {
    newReview,
    getAllReview,
    getReview,
    updateReview,
    deleteReview,
}
