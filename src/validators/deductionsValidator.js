import Joi from "joi";

// Validator for new deduction entry
export const newDeductionValidator = (deduction) => {
    const newDeductionValidatorSchema = Joi.object({
        DeductionID: Joi.string().required(),
        DeductionName: Joi.string().required(),
        DeductionDescription: Joi.string().required(),
        Amount: Joi.number().integer().required()
    });

    return newDeductionValidatorSchema.validate(deduction);
}

// Validator for updating existing deduction entry
export const updateDeductionValidator = (deduction) => {
    const updateDeductionSchema = Joi.object({
        DeductionID: Joi.string(),
        DeductionName: Joi.string(),
        DeductionDescription: Joi.string(),
        Amount: Joi.number().integer()
    });

    return updateDeductionSchema.validate(deduction);
}
