import { poolRequest, sql } from "../utilis/dbConnect.js";
import dotenv from "dotenv";

dotenv.config();

// Create a new leave entry
export const addLeaveService = async (newLeave) => {
    try {
        const addLeaveQuery =
            `
            INSERT INTO Leave (LeaveID, EmployeeID, BeginDate, EndDate, Reason, DaysCount)
            VALUES (@LeaveID, @EmployeeID, @BeginDate, @EndDate, @Reason, @DaysCount)
            `;

        const result = await poolRequest()
            .input("LeaveID", sql.VarChar, newLeave.LeaveID)
            .input("EmployeeID", sql.VarChar, newLeave.EmployeeID)
            .input("BeginDate", sql.DateTime, newLeave.BeginDate)
            .input("EndDate", sql.DateTime, newLeave.EndDate)
            .input("Reason", sql.VarChar, newLeave.Reason)
            .input("DaysCount", sql.Int, newLeave.DaysCount)
            .query(addLeaveQuery);

        return result;
    } catch (error) {
        return error.message;
    }
};

// Fetch all leave entries
export const fetchAllLeaveService = async () => {
    try {
        const query = `
            SELECT * FROM Leave
        `;

        const result = await poolRequest().query(query);
        return result.recordset;
    } catch (error) {
        return error;
    }
};

// Fetch one leave entry by LeaveID
export const fetchLeaveByIdService = async (LeaveID) => {
    try {
        const query = `
            SELECT * FROM Leave WHERE LeaveID = @LeaveID
        `;
        const result = await poolRequest()
            .input("LeaveID", sql.VarChar, LeaveID)
            .query(query);
        return result.recordset[0];
    } catch (error) {
        return error;
    }
};

// Update an existing leave entry
export const updateLeaveService = async (updatedLeave) => {
    try {
        const updateLeaveQuery =
            `
            UPDATE Leave
            SET EmployeeID = @EmployeeID, BeginDate = @BeginDate, EndDate = @EndDate, Reason = @Reason, DaysCount = @DaysCount
            WHERE LeaveID = @LeaveID
            `;

        const result = await poolRequest()
            .input("LeaveID", sql.VarChar, updatedLeave.LeaveID)
            .input("EmployeeID", sql.VarChar, updatedLeave.EmployeeID)
            .input("BeginDate", sql.DateTime, updatedLeave.BeginDate)
            .input("EndDate", sql.DateTime, updatedLeave.EndDate)
            .input("Reason", sql.VarChar, updatedLeave.Reason)
            .input("DaysCount", sql.Int, updatedLeave.DaysCount)
            .query(updateLeaveQuery);

        return result;
    } catch (error) {
        return error.message;
    }
};

// Delete a leave entry by LeaveID
export const deleteLeaveService = async (LeaveID) => {
    try {
        const deleteLeaveQuery =
            `
            DELETE FROM Leave WHERE LeaveID = @LeaveID
            `;

        const result = await poolRequest()
            .input("LeaveID", sql.VarChar, LeaveID)
            .query(deleteLeaveQuery);

        return result;
    } catch (error) {
        return error.message;
    }
};
