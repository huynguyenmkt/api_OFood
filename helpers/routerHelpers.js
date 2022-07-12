const Joi = require('joi')

const validateBody = (schema) => {
    return (req, res, next) => {
        const validatorResult = schema.validate(req.body)

        if (validatorResult.error) {
            return res.status(400).json({
                status: false,
                message: validatorResult.error.details[0].message,
                data: [],
            })
        } else {
            if (!req.value) req.value = {}
            if (!req.value['body']) req.value.body = {}

            req.value.body = validatorResult.value
            next()
        }
    }
}

const validateParam = (schema, name) => {
    return (req, res, next) => {
        const validatorResult = schema.validate({ param: req.params[name] })

        if (validatorResult.error) {
            return res.status(400).json({
                status: false,
                message: `${name} is invalid!`,
                data: [],
            })
        } else {
            if (!req.value) req.value = {}
            if (!req.value['params']) req.value.params = {}

            req.value.params[name] = req.params[name]
            next()
        }
    }
}

const schemas = {
    idSchema: Joi.object({
        param: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
    }),
    userSchema: Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        userName: Joi.string().required(),
        password: Joi.string().required(),
        image: Joi.string().allow(''),
        birthday: Joi.string(),
    }),
    userUpdateSchema: Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        userName: Joi.string().required(),
        password: Joi.string(),
        image: Joi.string().allow(''),
        birthday: Joi.string(),
    }),
    userUpdateRoleSchema: Joi.object({
        role: Joi.number().required().min(0).max(3),
    }),
    loginSchema: Joi.object({
        userName: Joi.string().required(),
        password: Joi.string().required(),
    }),
    foodSchema: Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        sale: Joi.number(),
        image: Joi.string().allow(''),
        status: Joi.number(),
        category: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
    foodUpdateSchema: Joi.object({
        name: Joi.string(),
        description: Joi.string(),
        price: Joi.number(),
        quantity: Joi.number(),
        sale: Joi.number(),
        image: Joi.string(),
        status: Joi.number(),
        category: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
    categorySchema: Joi.object({
        name: Joi.string().required(),
    }),
    cartSchema: Joi.object({
        quantity: Joi.number().required(),
        food: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
    }),
    cartUpdateSchema: Joi.object({
        quantity: Joi.number().required(),
        food: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
    addressSchema: Joi.object({
        houseNumber: Joi.string(),
        street: Joi.string().required(),
        district: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
        status: Joi.number(),
    }),
    billSchema: Joi.object({
        status: Joi.number(),
        address: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
    }),
    billUpdateSchema: Joi.object({
        status: Joi.number(),
        user: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        address: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
    reviewSchema: Joi.object({
        rate: Joi.number().required(),
        comment: Joi.string().allow(''),
        user: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        food: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
    }),
    reviewUpdateSchema: Joi.object({
        rate: Joi.number().required(),
        comment: Joi.string().allow(''),
        user: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        food: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
}

module.exports = {
    validateParam,
    schemas,
    validateBody,
}
