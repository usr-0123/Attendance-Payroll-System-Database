import Joi from "joi";

// Validator for creating a new payroll entry
export const newPayrollValidator = (payroll) => {
    const newPayrollValidatorSchema = Joi.object({
        PayrollID: Joi.string().required(),
        EmployeeID: Joi.string().required(),
        GrossPay: Joi.number().integer().min(0).required(),
        DeductionID: Joi.string().required(),
        NetPay: Joi.number().integer().min(0).required(),
        OvertimePay: Joi.number().integer().min(0).required(),
        Advance: Joi.number().integer().min(0).required()
    });

    return newPayrollValidatorSchema.validate(payroll);
}

// Validator for updating an existing payroll entry
export const updatePayrollValidator = (payroll) => {
    const updatePayrollValidatorSchema = Joi.object({
        EmployeeID: Joi.string(),
        GrossPay: Joi.number().integer().min(0),
        DeductionID: Joi.string(),
        NetPay: Joi.number().integer().min(0),
        OvertimePay: Joi.number().integer().min(0),
        Advance: Joi.number().integer().min(0)
    }).min(1); // At least one field required for update

    return updatePayrollValidatorSchema.validate(payroll);
}
