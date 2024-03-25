import Joi from "joi";

// Validator for new department entry
export const newDepartmentValidator = (department) => {
    const newDepartmentValidatorSchema = Joi.object({
        DepartmentName: Joi.string().required(),
        MaximumOvertime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/).required() // Validates time format (HH:MM:SS)
    });

    return newDepartmentValidatorSchema.validate(department);
}

// Validator for updating existing department entry
export const updateDepartmentValidator = (department) => {
    const updateDepartmentSchema = Joi.object({
        DepartmentID: Joi.string(),
        DepartmentName: Joi.string(),
        MaximumOvertime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/) // Validates time format (HH:MM:SS)
    });

    return updateDepartmentSchema.validate(department);
}
