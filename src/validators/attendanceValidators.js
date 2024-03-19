import joi from "joi";

export const attendanceValidator = (attendance) => {
    const attendanceValidatorSchema = joi.object({
        AttendanceID: joi.string().required(),
        EmployeeID: joi.string().required(),
        TimeIn: joi.date().required(),
        TimeOut: joi.date().required(),
        Date: joi.date().required(),
    });
    return attendanceValidatorSchema.validate(attendance);
  };