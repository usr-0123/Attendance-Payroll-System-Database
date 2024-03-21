import joi from "joi";

export const attendanceValidator = (attendance) => {
    const attendanceValidatorSchema = joi.object({
        AttendanceID: joi.string().required(),
        EmployeeID: joi.string().required(),
        CheckIn: joi.date().required(),
        CheckOut: joi.date().required(),
        Date: joi.date().required(),
    });
    return attendanceValidatorSchema.validate(attendance);
  };

export const updateEntryValidator = (attendance) => {
    const updateEntryValidatorSchema = joi.object({
        AttendanceID:joi.string(),
        EmployeeID: joi.string(),
        CheckIn: joi.date(),
        CheckOut: joi.date(),
        Date: joi.date(),
    });
    return updateEntryValidatorSchema.validate(attendance);
};
