const Bill = require('../models/Bill')
const Food = require('../models/Food')
const Review = require('../models/Review')
const User = require('../models/User')

//CREATE
const newReview = async (req, res, next) => {
    // console.log(req.body)
    try {
        const foodId = req.value.body.food
        const userId = req.value.body.user

        const food = await Food.findById(foodId)
        const user = await User.findById(userId)
        if (user === null) {
            const err = new Error('user is not exits')
            err.status = 404
            throw err
        }
        if (food === null) {
            const err = new Error('food is not exits')
            err.status = 404
            throw err
        }
        // const bill = await Bill.find({ user: user }).populate('billInfos')
        // const hasFoodInBillInfos = bill.billInfos.find(bill=> bill.food === foodId)? true : false
        // if (!hasFoodInBillInfos){

        // }
        // console.log(bill)
        const newReview = new Review(req.value.body)
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
        const { reviewId } = req.value.params
        const foodId = req.value.body.food
        const userId = req.value.body.user

        const food = await Food.findById(foodId)
        const user = await User.findById(userId)
        if (user === null) {
            const err = new Error('user is not exits')
            err.status = 404
            throw err
        }
        if (food === null) {
            const err = new Error('food is not exits')
            err.status = 404
            throw err
        }
        const newReview = req.value.body
        const review = await Review.findByIdAndUpdate(reviewId, newReview)
        if (review === null) {
            const err = new Error('review is not exits')
            err.status = 404
            throw err
        }
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
        const { reviewId } = req.value.params
        const review = await Review.findByIdAndDelete(reviewId)
        if (review === null) {
            const err = new Error('review is not exits')
            err.status = 404
            throw err
        }
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
