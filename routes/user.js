const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

const {
    validateBody,
    validateParam,
    schemas,
} = require('../helpers/routerHelpers')

const passport = require('passport')
const passportConfig = require('../middlewares/passport')

router
    .route('/')
    .get(userController.getAllUser)
    .post(validateBody(schemas.userSchema), userController.newUser)
router
    .route('/login')
    .post(validateBody(schemas.loginSchema), userController.loginUser)
router
    .route('/secret')
    .get(
        passport.authenticate('jwt', { session: false }),
        userController.secret
    )
router
    .route('/:userId')
    .get(validateParam(schemas.idSchema, 'userId'), userController.getUser)
    .put(
        validateParam(schemas.idSchema, 'userId'),
        validateBody(schemas.userSchema),
        userController.updateUser
    )
router
    .route('/:userId/cart')
    .get(validateParam(schemas.idSchema, 'userId'), userController.getAllCart)

router
    .route('/:userId/address')
    .get(
        validateParam(schemas.idSchema, 'userId'),
        userController.getAllAddress
    )
router
    .route('/:userId/bills')
    .get(validateParam(schemas.idSchema, 'userId'), userController.getAllBills)

module.exports = router
