import { poolRequest, sql } from "../utilis/dbConnect.js";
import dotenv from "dotenv";

dotenv.config();

// Create a new overtime
export const addOvertimeService = async (newOvertime) => {
    try {
        const addOvertimeQuery =
            `
            INSERT INTO Overtime (OvertimeID, EmployeeID, Overtime_date, Duration, Rate)
            VALUES (@OvertimeID, @EmployeeID, @Overtime_date, @Duration, @Rate)
            `;

        const result = await poolRequest()
            .input("OvertimeID", sql.VarChar, newOvertime.OvertimeID)
            .input("EmployeeID", sql.VarChar, newOvertime.EmployeeID)
            .input("Overtime_date", sql.DateTime, newOvertime.Overtime_date)
            .input("Duration", sql.VarChar, newOvertime.Duration)
            .input("Rate", sql.Int, newOvertime.Rate)
            .query(addOvertimeQuery);

        return result;
    } catch (error) {
        return error.message;
    }
};

// Fetch all overtime entries
export const fetchAllOvertimeService = async () => {
    try {
        const query = `
            SELECT * FROM Overtime
        `;

        const result = await poolRequest().query(query);
        return result.recordset;
    } catch (error) {
        return error;
    }
};

// Fetch one overtime entry by OvertimeID
export const fetchOvertimeByIdService = async (OvertimeID) => {
    try {
        const query = `
            SELECT * FROM Overtime WHERE OvertimeID = @OvertimeID
        `;
        const result = await poolRequest()
            .input("OvertimeID", sql.VarChar, OvertimeID)
            .query(query);
        return result.recordset[0];
    } catch (error) {
        return error;
    }
};

// Update an existing overtime entry
export const updateOvertimeService = async (updatedOvertime) => {
    try {
        const updateOvertimeQuery =
            `
            UPDATE Overtime
            SET EmployeeID = @EmployeeID, Overtime_date = @Overtime_date, Duration = @Duration, Rate = @Rate
            WHERE OvertimeID = @OvertimeID
            `;

        const result = await poolRequest()
            .input("OvertimeID", sql.VarChar, OvertimeID)
            .input("EmployeeID", sql.VarChar, updatedOvertime.EmployeeID)
            .input("Overtime_date", sql.DateTime, updatedOvertime.Overtime_date)
            .input("Duration", sql.VarChar, updatedOvertime.Duration)
            .input("Rate", sql.Int, updatedOvertime.Rate)
            .query(updateOvertimeQuery);

            console.log(result);

        return result;
    } catch (error) {
        return error.message;
    }
};

// Delete an overtime entry by OvertimeID
export const deleteOvertimeService = async (OvertimeID) => {
    try {
        const deleteOvertimeQuery =
            `
            DELETE FROM Overtime WHERE OvertimeID = @OvertimeID
            `;

        const result = await poolRequest()
            .input("OvertimeID", sql.VarChar, OvertimeID)
            .query(deleteOvertimeQuery);

        return result;
    } catch (error) {
        return error.message;
    }
};
