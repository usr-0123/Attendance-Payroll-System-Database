import { poolRequest, sql } from "../utilis/dbConnect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const addScheduleService = async (newSchedule) => {
    try {
        const addScheduleQuery =
            `
            INSERT INTO Schedule (ScheduleID, EmployeeID, ScheduleName, CheckIn, CheckOut, Days)
            VALUES (@ScheduleID, @EmployeeID, @ScheduleName, @CheckIn, @CheckOut, @Days)
            `;
        const getEmailIDQuery = 
        `
            SELECT EmployeeID
            FROM employees
            Where Email_address = @Email_address
        `
        const employeeIDResult = await poolRequest()
        .input("Email_address", sql.VarChar, newSchedule.EmailAddress)
        .query(getEmailIDQuery);

        const employeeID = employeeIDResult.recordset[0].EmployeeID;
        
        const result = await poolRequest()
            .input("ScheduleID", sql.VarChar, newSchedule.ScheduleID)
            .input("EmployeeID", sql.VarChar, employeeID)
            .input("ScheduleName", sql.VarChar, newSchedule.ScheduleName)
            .input("CheckIn", sql.VarChar, newSchedule.CheckIn)
            .input("CheckOut", sql.VarChar, newSchedule.CheckOut)
            .input("Days", sql.VarChar, newSchedule.Days)
            .query(addScheduleQuery);
        return result;
    } catch (error) {
        return error.message;
    }
};


export const getAllEmployeesWithSchedulesService = async () => {
    try {
        const query = `
            SELECT 
                e.EmployeeID,
                e.First_name,
                e.Last_name,
                e.Email_address,
                e.Contact_information,
                e.Gender,
                e.Admin_role,
                e.Date_of_Birth,
                e.Country,
                e.City,
                e.Street,
                e.Postal_code,
                e.Profile_url,
                s.ScheduleID,
                s.ScheduleName,
                s.CheckIn,
                s.CheckOut,
                s.DAYS
            FROM 
                employees e
            INNER JOIN 
                Schedule s ON e.EmployeeID = s.EmployeeID
        `;

        const result = await poolRequest().query(query);
        return result.recordset;
    } catch (error) {
        return error.message;
    }
};


export const getAllScheduleService = async () => {
    try {
        const result = await poolRequest().query(`SELECT * FROM Schedule`)
        return result;
    } catch ( error ) {
        return error;
    }
}

export const getScheduleByScheduleIDService = async (ScheduleID) => {
    try {
        const result = await poolRequest()
        .input("ScheduleID", sql.VarChar, ScheduleID)
        .query(`SELECT * FROM Schedule WHERE ScheduleID = @ScheduleID`)
        return result.recordset;
    } catch (error) {
        return error.message;
    }
}

export const updateScheduleService = async (schedule, ScheduleID) => {
    try {
        const updateScheduleQuery = `
            UPDATE Schedule 
            SET ScheduleName = @ScheduleName, 
                CheckIn = @CheckIn, 
                CheckOut = @CheckOut, 
                Days = @Days 
            WHERE ScheduleID = @ScheduleID`;

        const result = await poolRequest()
            .input("ScheduleID", sql.VarChar, ScheduleID)
            .input("ScheduleName", sql.VarChar, schedule.ScheduleName)
            .input("CheckIn", sql.DateTime, schedule.CheckIn)
            .input("CheckOut", sql.DateTime, schedule.CheckOut)
            .input("Days", sql.VarChar, schedule.Days)
            .query(updateScheduleQuery);

        return result;
    } catch (error) {
        return error.message;
    }
};


export const deleteScheduleService = async (ScheduleID) => {
    // console.log(ScheduleID);
    try {
        const response = await poolRequest()
        .input("ScheduleID", sql.VarChar, ScheduleID)
        .query("DELETE FROM Schedule WHERE ScheduleID = @ScheduleID");
        
        // console.log("Service",response);

        return response;
        
    } catch (error) {
        return error;
    }
};