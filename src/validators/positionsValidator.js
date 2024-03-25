import Joi from "joi";

// Validator for new position entry
export const newPositionValidator = (position) => {
    const newPositionValidatorSchema = Joi.object({
        EmployeeID: Joi.string().required(),
        Title: Joi.string().required(),
        DepartmentID: Joi.string().required(),
        Salary: Joi.string().required()
    });

    return newPositionValidatorSchema.validate(position);
}

// Validator for updating existing position entry
export const updatePositionValidator = (position) => {
    const updatePositionSchema = Joi.object({
        Title: Joi.string(),
        DepartmentID: Joi.string(),
        Salary: Joi.string()
    });

    return updatePositionSchema.validate(position);
}
