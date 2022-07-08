const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

const {
    validateBody,
    validateParam,
    schemas,
} = require('../helpers/routerHelpers')

const middlewareControllers = require('../middlewares/auth')

router
    .route('/')
    .get(middlewareControllers.verifyToken, userController.getAllUser)
    .post(validateBody(schemas.userSchema), userController.newUser)
router
    .route('/login')
    .post(validateBody(schemas.loginSchema), userController.loginUser)
router
    .route('/singup')
    .post(validateBody(schemas.userSchema), userController.newUser)
router
    .route('/secret')
    .get(middlewareControllers.verifyToken, userController.secret)
router
    .route('/info')
    .get(middlewareControllers.verifyToken, userController.getUser)
    .put(
        middlewareControllers.verifyToken,
        validateBody(schemas.userUpdateSchema),
        userController.updateUser
    )
router
    .route('/cart')
    .get(middlewareControllers.verifyToken, userController.getAllCart)

router
    .route('/address')
    .get(middlewareControllers.verifyToken, userController.getAllAddress)
router
    .route('/bills')
    .get(middlewareControllers.verifyToken, userController.getAllBills)

module.exports = router
