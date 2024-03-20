import Joi from 'joi';

// Validator for adding new leave
export const addLeaveValidator = (leave) => {
    const schema = Joi.object({
        LeaveID: Joi.string().required(),
        EmployeeID: Joi.string().required(),
        BeginDate: Joi.date().iso().required(),
        EndDate: Joi.date().iso().required(),
        Reason: Joi.string().max(255).required(),
        DaysCount: Joi.number().integer().min(1).required()
    });

    return schema.validate(leave);
};

// Validator for updating leave
export const updateLeaveValidator = (leave) => {
    const schema = Joi.object({
        EmployeeID: Joi.string(),
        BeginDate: Joi.date().iso(),
        EndDate: Joi.date().iso(),
        Reason: Joi.string().max(255),
        DaysCount: Joi.number().integer().min(1)
    }).min(1); // At least one field required for update

    return schema.validate(leave);
};
