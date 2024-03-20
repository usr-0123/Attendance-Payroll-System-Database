import { poolRequest, sql } from "../utilis/dbConnect.js";
import dotenv from "dotenv";

dotenv.config();

// Add a new deduction entry
export const addDeductionService = async (newDeduction) => {
    try {
        // console.log("I am reached");
        const addDeductionQuery =
            `
            INSERT INTO Deductions (DeductionID, DeductionName, DeductionDescription, Amount)
            VALUES (@DeductionID, @DeductionName, @DeductionDescription, @Amount)
            `;

        const result = await poolRequest()
            .input("DeductionID", sql.VarChar, newDeduction.DeductionID)
            .input("DeductionName", sql.VarChar, newDeduction.DeductionName)
            .input("DeductionDescription", sql.VarChar, newDeduction.DeductionDescription)
            .input("Amount", sql.Int, newDeduction.Amount)
            .query(addDeductionQuery);

        return result;

    } catch (error) {
        // console.log("service error", error);
        return error.message;
    }
};

// Fetch all deduction entries
export const fetchAllDeductionService = async () => {
    try {
        const query = `
            SELECT * FROM Deductions
        `;

        const result = await poolRequest().query(query);
        return result.recordset;
    } catch (error) {
        return error;
    }
};

// Fetch one deduction entry by DeductionID
export const fetchDeductionByIdService = async (DeductionID) => {
    try {
        const query = `
            SELECT * FROM Deductions WHERE DeductionID = @DeductionID
        `;
        const result = await poolRequest()
            .input("DeductionID", sql.VarChar, DeductionID)
            .query(query);
        return result.recordset[0];
    } catch (error) {
        return error;
    }
};

// Update an existing deduction entry by DeductionID
export const updateDeductionService = async (updatedDeduction) => {
    try {
        const updateDeductionQuery =
            `
            UPDATE Deductions
            SET DeductionName = @DeductionName, DeductionDescription = @DeductionDescription, Amount = @Amount
            WHERE DeductionID = @DeductionID
            `;

        const result = await poolRequest()
            .input("DeductionID", sql.VarChar, updatedDeduction.DeductionID)
            .input("DeductionName", sql.VarChar, updatedDeduction.DeductionName)
            .input("DeductionDescription", sql.VarChar, updatedDeduction.DeductionDescription)
            .input("Amount", sql.Int, updatedDeduction.Amount)
            .query(updateDeductionQuery);

        return result;
    } catch (error) {
        return error.message;
    }
};

// Delete a deduction entry by DeductionID
export const deleteDeductionService = async (DeductionID) => {
    try {
        const deleteDeductionQuery =
            `
            DELETE FROM Deductions WHERE DeductionID = @DeductionID
            `;

        const result = await poolRequest()
            .input("DeductionID", sql.VarChar, DeductionID)
            .query(deleteDeductionQuery);

        return result;
    } catch (error) {
        return error.message;
    }
};
