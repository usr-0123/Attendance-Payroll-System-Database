import joi from "joi";

export const scheduleValidator = (schedule) => {
    const scheduleValidatorSchema = joi.object({
        ScheduleID: joi.string().required(),
        Days: joi.string().required(),
        CheckIn: joi.dateTime().required(),
        CheckOut: joi.dateTime().required(),
    });
    return scheduleValidatorSchema.validate(schedule);
  };