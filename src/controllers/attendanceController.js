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
    addAttendanceService,
    getAttendanceService,
    getAttendanceByIDService,
    updateAttendanceService,
    deleteAttendanceService
} from "../services/attendanceServices.js";

import {attendanceValidator} from "../validators/attendanceValidators.js";

// Add a new attendance
export const addAttendanceController = async (req, res) => {
    const {AttendanceID,EmployeeID,Date,TimeIn,TimeOut} = req.body;
    const {error} = attendanceValidator({AttendanceID,EmployeeID,Date,TimeIn,TimeOut});

    if (error) {
        return sendServerError(res, error.message);
    } else {
        try {
            const AttendanceID = v4();
            const Date = new Date();
            const newAttendance = {AttendanceID, EmployeeID, Date, TimeIn, TimeOut}
            const response = await addAttendanceService(newAttendance)
            if (response.message) {
                sendServerError(res, response.message)
            } else {
                sendCreated(res, "Attendance created successfully")
            }
        } catch (error) {
            sendServerError(res, error.message);
        }
    }
}

// Fetch all the attendance
export const getAttendanceController = async (req, res) => {
    try {
        const data = await getAttendanceService();

        if(data.length === 0) {
            sendNotFound(res, 'No employees found');
        } else {
            if(!req.query.page || !req.query.limit) {
                if (req.query.order) {} else {
                    res.status(200).json(data);
                }
            } else {
                if (res.querry.order) {
                    paginate(orderData(data, req.query.order), req, res);
                } else {
                    paginate(data, req, res);
                }
            }
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
}

// Fetch the attendance by atendance id
export const getAttendanceByIDController = async (req, res) => {
    try {
        const AttendanceID = req.params.AttendanceID;
        const attendance = await getAttendanceByIDService (AttendanceID);
            
        if (attendance) {
            return res.status(200).json({ attendance });
        } else {
            return res.status(404).json({ error: 'Attendance not found' });
        }
    } catch (error) {
            
        // Handle any unexpected errors
        return res.status(500).json({ error: error.message });
    }
}

// Update an attendance
export const updateAttendanceController = async (req, res) => {
    try {
        const { AttendanceID } = req.params;
        const { EmployeeID,Date,TimeIn,TimeOut } = req.body;
        const { error } = attendanceValidator({AttendanceID,EmployeeID,Date,TimeIn,TimeOut});
            if (error) {
                return sendServerError(res, error.message);
            }
      
        const response = await updateAttendanceService(AttendanceID, {AttendanceID,EmployeeID,Date,TimeIn,TimeOut});
          // console.log(response);
            if (response.rowsAffected == 1) {
                return res.status(201).json({ message: "Attendance updated successfully" });
          } else {
            sendNotFound(res, "Attendance not found or not updated");
          }
        } catch (error) {
          sendServerError(res, error.message);
        }
      };

// Delete an attendance
export const deleteAttendanceController = async (req, res) => {
    try {
        const { AttendanceID } = req.params;
        const response = await deleteAttendanceService(AttendanceID);
            if (response.rowsAffected == 1) {
            sendDeleteSuccess(res, "Attendance deleted successfully");
            }
    } catch (error) {
          sendServerError(res, error);
    }
};