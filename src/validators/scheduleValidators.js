import joi from "joi";

export const scheduleValidator = (schedule) => {
    const scheduleValidatorSchema = joi.object({
        EmailAddress: joi.string().required(),
        ScheduleName: joi.string().required(),
        Days: joi.string().required(),
        CheckIn: joi.string().required(),
        CheckOut: joi.string().required(),
    });
    return scheduleValidatorSchema.validate(schedule);
};


export const updateScheduleValidator = (schedule) => {

    const updateScheduleSchema = joi.object({
        ScheduleName: joi.string(),
        Days: joi.string(),
        CheckIn: joi.string(),
        CheckOut: joi.string(),
    });
    
    return updateScheduleSchema.validate(schedule);
}