const joi = require('joi')

const validateSchema = async (inputs, schema) => {
    try {
        const { error, value } = schema.validate(inputs);
        if (error) throw error.details ? error.details[0].message.replace(/['"]+/g, "") : "";
        else return false;
    } catch (error) {
        throw error;
    }
};

const validateSignUp = async (req, property = "body") => {
    let schema = {};
    schema = joi.object().keys({
        name: joi.string().required(),
        password: joi.string().required(),
        phone: joi.string().optional(),
        email: joi.string().required(),
    });
    return await validateSchema(req[property], schema);
};

const validateLogIn = async (req, property = 'body') => {
    let schema = {}
    schema = joi.object().keys({
        email: joi.string().optional(),
        password: joi.string().required(),
    })
    return await validateSchema(req[property], schema);
}

const validateorder = async (req, property = 'body') => {
    let schema = {}
    schema = joi.object().keys({
        productsId: joi.string().optional(),
        userId: joi.string().required(),
        quantity: joi.string().required(),
        status: joi.string().required(),
        price: joi.string().optional(),
    })
    return await validateSchema(req[property], schema);
}

module.exports = {
    validateSignUp,
    validateLogIn,
    validateorder
}