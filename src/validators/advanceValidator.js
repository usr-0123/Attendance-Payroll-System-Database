import Joi from "joi";

// Validator for new advance entry
export const newAdvanceValidator = (advance) => {
    const newAdvanceValidatorSchema = Joi.object({
        AdvanceID: Joi.string().required(),
        EmployeeID: Joi.string().required(),
        RequestDate: Joi.date().iso().required(),
        Amount: Joi.number().integer().required(),
        Approval_Status: Joi.boolean().default(false),
        Approval_Date: Joi.date().iso().default("")
    });

    return newAdvanceValidatorSchema.validate(advance);
}

// Validator for updating existing advance entry
export const updateAdvanceValidator = (advance) => {
    const updateAdvanceSchema = Joi.object({
        AdvanceID: Joi.string(),
        EmployeeID: Joi.string(),
        RequestDate: Joi.date().iso(),
        Amount: Joi.number().integer(),
        Approval_Status: Joi.boolean(),
        Approval_Date: Joi.date().iso().allow("")
    });

    return updateAdvanceSchema.validate(advance);
}
