import { poolRequest, sql } from "../utilis/dbConnect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Add a new attendance
export const addAttendanceService = async (newAttendance) => {
    try {
        
        // Check if a similar record exists
        const checkAttendanceQuerry =
        `
        SELECT COUNT (*) AS COUNT
        FROM Attendance
        WHERE Date = @Date
        `
        const checkAttendanceResult = await poolRequest()
        .input("Date", sql.VarChar, newAttendance.Date)
        .query(checkAttendanceQuerry);

        if (checkAttendanceResult.recordset[0].count > 0) {
            throw new Error ('The attendance record already exists')
        }

        const addAttendanceQuery =
        `
        INSERT INTO Attendance (AttendanceID, EmployeeID, Date, TimeIn, TimeOut)
        VALUES (@AttendanceID, @EmployeeID, @Date, @TimeIn, @TimeOut)
        `

        const result = await poolRequest()
        .input("AttendanceID", sql.VarChar, newAttendance.AttendanceID)
        .input("EmployeeID", sql.VarChar, newAttendance.EmployeeID)
        .input("Date", sql.Date, newAttendance.Date)
        .input("TimeIn",sql.DateTime, newAttendance.TimeIn)
        .input("TimeOut", sql.DateTime, newAttendance.TimeOut)
        .query(addAttendanceQuery)

        return result;
        
    } catch (error) {
        return error;
    }
}

export const getAttendanceService = async () => {
    try {
        const result = await poolRequest().query(`SELECT * FROM Attendance`)
        return result;
    } catch (error) {
        return error;
    }
}

export const getAttendanceByIDService = async (AttendanceID) => {
    try {
        const result = await poolRequest()
            .input("AttendanceID", sql.VarChar, AttendanceID)
            .query(`SELECT * FROM Attendance WHERE AttendanceID=@AttendanceID`);
        return result.recordset;
    } catch (error) {
        return error;
    }
}

export const updateAttendanceService = async () => {
        try {
          const response = await poolRequest(attendance)
            .input("AttendanceID", sql.VarChar, AttendanceID)
            .input("EmployeeID", sql.VarChar, attendance.EmployeeID)
            .input("Date", sql.Date, Date.content)
            .input("TimeIn", sql.DateTime, attendance.TimeIn)
            .input("TimeOut", sql.DateTime, attendance.TimeOut)
            .query(
              `UPDATE Attendance SET (AttendanceID, EmployeeID, Date, TimeIn, TimeOut)
              VALUES (@AttendanceID, @EmployeeID, @Date, @TimeIn, @TimeOut)`
            );
          return response;
        } catch (error) {
          return error;
        }
      };

export const deleteAttendanceService = async (AttendanceID) => {
    try {
      const response = await poolRequest()
        .input("AttendanceID", sql.VarChar, AttendanceID)
        .query("DELETE FROM Attendance WHERE AttendanceID=@AttendanceID");
      return response;
    } catch (error) {
      return error;
    }
  };