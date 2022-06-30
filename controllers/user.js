const User = require('../models/User')

const getAllUser = async (req, res)=>{
    User.find({}, (err, users)=>{
        console.log(users)
    })
    // console.log(users)
    // return res.status(200).json({
    //         saveUser
    //     })
}

const newUser = (req, res, next)=>{
    // console.log(req.body)
    const newUser = new User(req.body)
    newUser.save((err, user)=>{
        console.log(err)

        console.log('User saved', user)
    })
}

module.exports = {
    getAllUser,
    newUser
}