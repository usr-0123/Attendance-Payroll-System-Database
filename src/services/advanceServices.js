import { poolRequest, sql } from "../utilis/dbConnect.js";
import dotenv from "dotenv";

dotenv.config();

export const addAdvanceService = async (newAdvance) => {
    try {
        const addAdvanceQuery =
            `
            INSERT INTO Advance (AdvanceID, EmployeeID, RequestDate, Amount, Approval_Status, Approval_Date)
            VALUES (@AdvanceID, @EmployeeID, @RequestDate, @Amount, @Approval_Status, @Approval_Date)
            `;

        const result = await poolRequest()
            .input("AdvanceID", sql.VarChar, newAdvance.AdvanceID)
            .input("EmployeeID", sql.VarChar, newAdvance.EmployeeID)
            .input("RequestDate", sql.DateTime, newAdvance.RequestDate)
            .input("Amount", sql.Int, newAdvance.Amount)
            .input("Approval_Status", sql.Bit, newAdvance.Approval_Status)
            .input("Approval_Date", sql.DateTime, newAdvance.Approval_Date)
            .query(addAdvanceQuery);

            // console.log("addAdvanceQuery", addAdvanceQuery);

        return result;
    } catch (error) {
        // console.log("error", error);
        return error.message;
    }
};

// Service to fetch all advance entries
export const fetchAllAdvanceService = async () => {
    try {
        const query = `
            SELECT * FROM Advance
        `;

        const result = await poolRequest().query(query);
        return result.recordset;
    } catch (error) {
        return error.message;
    }
};

// Service to fetch one advance entry by AdvanceID
export const fetchAdvanceByIdService = async (AdvanceID) => {
    try {
        const query = `
            SELECT * FROM Advance WHERE AdvanceID = @AdvanceID
        `;
        const result = await poolRequest()
            .input("AdvanceID", sql.VarChar, AdvanceID)
            .query(query);
        return result.recordset[0];
    } catch (error) {
        return error.message;
    }
};

// Service to update an existing advance entry by AdvanceID
export const updateAdvanceService = async (updatedAdvance) => {
    try {
        const updateAdvanceQuery =
            `
            UPDATE Advance
            SET EmployeeID = @EmployeeID,
                RequestDate = @RequestDate,
                Amount = @Amount,
                Approval_Status = @Approval_Status,
                Approval_Date = @Approval_Date
            WHERE AdvanceID = @AdvanceID
            `;

        const result = await poolRequest()
            .input("AdvanceID", sql.VarChar, updatedAdvance.AdvanceID)
            .input("EmployeeID", sql.VarChar, updatedAdvance.EmployeeID)
            .input("RequestDate", sql.DateTime, updatedAdvance.RequestDate)
            .input("Amount", sql.Int, updatedAdvance.Amount)
            .input("Approval_Status", sql.Bit, updatedAdvance.Approval_Status)
            .input("Approval_Date", sql.DateTime, updatedAdvance.Approval_Date)
            .query(updateAdvanceQuery);

        return result;
    } catch (error) {
        return error.message;
    }
};

// Service to delete an advance entry by AdvanceID
export const deleteAdvanceService = async (AdvanceID) => {
    try {
        const deleteAdvanceQuery =
            `
            DELETE FROM Advance WHERE AdvanceID = @AdvanceID
            `;

        const result = await poolRequest()
            .input("AdvanceID", sql.VarChar, AdvanceID)
            .query(deleteAdvanceQuery);

        return result;
    } catch (error) {
        return error.message;
    }
};
