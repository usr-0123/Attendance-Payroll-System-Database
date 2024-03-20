import Joi from "joi";

// Validator for new overtime entry
export const newOvertomeValidator = (overtime) => {
    const newOvertimeValidatorSchema = Joi.object({
    OvertimeID: Joi.string().required(),
    EmployeeID: Joi.string().required(),
    Overtime_date: Joi.date().iso().required(),
    Duration: Joi.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/).required(), // Validates time format (HH:MM:SS)
    Rate: Joi.number().integer().required()
    });

return newOvertimeValidatorSchema.validate(overtime);
}

// Validator for updating existing overtime entry
export const updateOvertimeValidator = (overtime) => {
    const updateScheduleSchema = Joi.object({
        OvertimeID: Joi.string(),
        EmployeeID: Joi.string(),
        Overtime_date: Joi.date().iso(),
        Duration: Joi.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/), // Validates time format (HH:MM:SS)
        Rate: Joi.number().integer()
    });

    return updateScheduleSchema.validate(overtime);
}