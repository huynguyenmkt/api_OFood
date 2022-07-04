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
        image: Joi.string(),
        role: Joi.number(),
    }),
}

module.exports = {
    validateParam,
    schemas,
    validateBody,
}
