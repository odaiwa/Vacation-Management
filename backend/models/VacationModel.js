const Joi = require("joi");

class VacationModel {

    constructor(vacation) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.description = vacation.description;
        this.img = vacation.img;
    }
    
    static #postValidationSchema = Joi.object({
        vacationId: Joi.forbidden(),
        destination: Joi.string().required().min(2).max(100),
        startDate: Joi.string().required().min(2).max(100),
        endDate: Joi.string().required().min(2).max(100),
        price: Joi.number().required(),
        description: Joi.string().required().min(2).max(300),
        img: Joi.string().optional().max(36)
    });

    static #putValidationSchema = Joi.object({
        vacationId: Joi.number().optional().integer(),
        destination: Joi.string().required().min(2).max(100),
        startDate: Joi.string().required().min(2).max(100),
        endDate: Joi.string().required().min(2).max(100),
        price: Joi.number().required(),
        description: Joi.string().required().min(2).max(300),
        img: Joi.string().optional().max(36)
    });


    validatePost() {
        console.log("Validate "+this.img);
        const result = VacationModel.#postValidationSchema.validate(this, { abortEarly: false }); //return all validation errors.
        return result.error ? result.error.message : null;
    }

    validatePut() {
        const result = VacationModel.#putValidationSchema.validate(this, { abortEarly: false }); //return all validation errors.
        return result.error ? result.error.message : null;
    }

}

module.exports = VacationModel;
