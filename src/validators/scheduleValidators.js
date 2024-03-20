import joi from "joi";

export const scheduleValidator = (schedule) => {
    const scheduleValidatorSchema = joi.object({
        ScheduleID: joi.string().required(),
        ScheduleID: joi.string().required(),ScheduleName: joi.string().required(),
        Days: joi.string().required(),
        CheckIn: joi.date().required(),
        CheckOut: joi.date().required(),
    });
    return scheduleValidatorSchema.validate(schedule);
};

export const updateScheduleValidator = (schedule) => {

    const updateScheduleSchema = joi.object({
        ScheduleName: joi.string(),
        Days: joi.string(),
        CheckIn: joi.date(),
        CheckOut: joi.date(),
    });
    
    return updateScheduleSchema.validate(schedule);
}