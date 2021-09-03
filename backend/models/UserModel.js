const Joi = require("joi");


class UserModel {
    constructor(user) {
        this.userId = user.userId;
        this.uuid = user.uuid;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.isAdmin = user.isAdmin;
    }

    static #putValidationSchema = Joi.object({
        userId: Joi.number().optional().integer(),
        uuid: Joi.string().optional(),
        firstName: Joi.string().required().min(2).max(100),
        lastName: Joi.string().required().min(2).max(100),
        username: Joi.string().required().min(4).max(100),
        password: Joi.string().required().min(6).max(128),
        isAdmin: Joi.boolean().optional()
    });

    static #postValidationSchema = Joi.object({
        userId: Joi.forbidden(), 
        uuid: Joi.string().optional(),
        firstName: Joi.string().required().min(2).max(100),
        lastName: Joi.string().required().min(2).max(100),
        username: Joi.string().required().min(4).max(100),
        password: Joi.string().required().min(6).max(128),
        isAdmin: Joi.boolean().optional()
    });


    validatePost() {
        const result = UserModel.#postValidationSchema.validate(this, { abortEarly: false }); //return all validation errors.
        return result.error ? result.error.message : null; // null = no errors.
    }

    validatePut() {
        const result = UserModel.#putValidationSchema.validate(this, { abortEarly: false }); //return all validation errors.
        return result.error ? result.error.message : null; // null = no errors.
    }
}

module.exports = UserModel;