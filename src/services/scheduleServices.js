import { poolRequest, sql } from "../utilis/dbConnect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const addScheduleService = async (newSchedule) => {
    try {
        const addScheduleQuerry =
        `
        INSERT INTO Schedule (ScheduleID, ScheduleName, CheckIn, CheckOut, Date)
        VALUES ( @ScheduleID, @ScheduleName, @CheckIn, @CheckOut, @Date )
        `

        const result = await poolRequest()
        .input("ScheduleID", sql.VarChar, newSchedule.ScheduleID)
        .input("ScheduleName", sql.VarChar, newSchedule.ScheduleName)
        .input("CheckIn", sql.DateTime, newSchedule.CheckIn)
        .input("CheckOut", sql.DateTime, newSchedule.DateTime)
        .input("Date", sql.VarChar, newSchedule.Date)
        .query(addScheduleQuerry)

        return result;

    } catch (error) {
        return error.message;
    }
}

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

export const updateScheduleService = async () => {
    try {
        const result = await poolRequest(schedule)
        .input("ScheduleID", sql.VarChar, schedule.ScheduleID)
        .input("ScheduleName", sql.VarChar, schedule.ScheduleName)
        .input("CheckIn", sql.DateTime, schedule.CheckIn)
        .input("CheckOut", sql.DateTime, schedule.DateTime)
        .input("Date", sql.VarChar, schedule.Date)
        .query(
            `
            UPDATE Schedule SET (ScheduleID, ScheduleName, CheckIn, CheckOut, Date)
            VALUES ( @ScheduleID, @ScheduleName, @CheckIn, @CheckOut, @Date )
            `
            )
            return result
    } catch (error) {
        return error.message;
    }
}

export const deleteScheduleService = async (ScheduleID) => {
    try {
        const response = await poolRequest()
        .input("ScheduleID", sql.VarChar, ScheduleID)
        .query("DELETE FROM Schedule WHERE ScheduleID=@ScheduleID");
        return response;
    } catch (error) {
        return error;
    }
};