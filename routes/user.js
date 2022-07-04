const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

const {
    validateBody,
    validateParam,
    schemas,
} = require('../helpers/routerHelpers')

router
    .route('/')
    .get(userController.getAllUser)
    .post(validateBody(schemas.userSchema), userController.newUser)

router
    .route('/:userId')
    .get(validateParam(schemas.idSchema, 'userId'), userController.getUser)
    .put(
        validateParam(schemas.idSchema, 'userId'),
        validateBody(schemas.userSchema),
        userController.updateUser
    )

module.exports = router
