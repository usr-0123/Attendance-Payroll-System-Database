import bcrypt from "bcrypt";
import { v4 } from "uuid";
import nodemailer from 'nodemailer';
import logger from "../utilis/logger.js";

import {
    successMessage,
    sendDeleteSuccess,
    validationError,
    sendBadRequest,
    sendServerError,
    sendCreated,
    notAuthorized,
    sendNotFound,
    paginate,
    orderData,
    checkIfValuesIsEmptyNullUndefined
} from "../helpers/helperFunctions.js";

import {
    addScheduleService,
    getAllEmployeesWithSchedulesService,
    getAllScheduleService,
    getScheduleByScheduleIDService,
    updateScheduleService,
    deleteScheduleService
} from "../services/scheduleServices.js"

import {
    scheduleValidator,
    updateScheduleValidator
} from "../validators/scheduleValidators.js"

// Add a new schedule
export const addScheduleController = async (req, res) => {

    const { EmailAddress, EmployeeID, ScheduleName, CheckIn, CheckOut, Days } = req.body;

    const { error } = scheduleValidator ({EmailAddress, ScheduleName, CheckIn, CheckOut, Days })

    if (error) {
        return sendServerError(res, error.message)
    } else {
        try {
            const ScheduleID = v4();
            const newSchedule = { ScheduleID, EmailAddress, ScheduleName, CheckIn, CheckOut, Days }
            const response = await addScheduleService (newSchedule)
            if (response.message) {
                sendServerError(res, response.message)
            } else {
                sendCreated(res, "Schedule created successfully")
            }
        } catch (error) {
            sendServerError(res, error.message);
        }
    }
}

// Fetch all employees with schedules
export const getAllEmployeesWithSchedulesController = async (req, res) => {
    try {
        const employeesWithSchedules = await getAllEmployeesWithSchedulesService();
        if (employeesWithSchedules.length !== 0) {
            return res.status(200).json(employeesWithSchedules);
        } else {
            sendNotFound(res, 'No employees with schedules found');
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};


// Fetch all schedule
export const getScheduleController = async (req, res) => {
    try {
        const result = await getAllScheduleService();
        const schedules = result.recordset;
        return res.status(200).json(schedules);
    } catch (error) {
        sendServerError(res, error.message);
    }
}

// Fetch schedule by scheduleid
export const getScheduleByIDController = async (req, res) => {
    try {
        const { ScheduleID } = req.params
        const singleSchedule = await getScheduleByScheduleIDService(ScheduleID)
        if (singleSchedule.length !== 0) {
            return res.status(200).json(singleSchedule[0])
        } else {
            sendNotFound(res, 'Schedule not found')
        }
    } catch (error) {
        return error.message;
    }
}

// Update schedule
export const updateScheduleController = async (req, res) => {
    try {
        const { ScheduleID } = req.params;
        const { ScheduleName, CheckIn, CheckOut, Days } = req.body;
        const { error } = updateScheduleValidator({ ScheduleName, CheckIn, CheckOut, Days });
        if (error) {
            return sendServerError(res, error.message);
        }

        const updateDetails = { ScheduleName, CheckIn, CheckOut, Days };

        const response = await updateScheduleService(updateDetails, ScheduleID);

        if (response.rowsAffected[0] === 1) {
            return res.status(201).json({ message: "Schedule updated successfully" });
        } else {
            sendNotFound(res, "Schedule not updated");
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};


//Delete Schedule
export const deleteScheduleController = async (req, res) => {
    try {
        const { ScheduleID } = req.params;
        const response = await deleteScheduleService(ScheduleID);
        
        if (response.rowsAffected == 1) {
            console.log(res.message);
            sendDeleteSuccess(res.message)
        }
    } catch (error) {
        console.log("error", error);
        sendServerError(res, error.message);
    }
}