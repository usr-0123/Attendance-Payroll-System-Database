import { v4 } from "uuid";
import { poolRequest, sql } from "../utilis/dbConnect.js";

// Create a new position entry
export const addPositionService = async (newPosition) => {
    try {
        const addPositionQuery =
            `
            INSERT INTO Positions (PositionID, Title, DepartmentID, Salary)
            VALUES (@PositionID, @Title, @DepartmentID, @Salary)
            `;

        const result = await poolRequest()
            .input("PositionID", sql.VarChar, newPosition.PositionID)
            .input("Title", sql.VarChar, newPosition.Title)
            .input("DepartmentID", sql.VarChar, newPosition.DepartmentID)
            .input("Salary", sql.VarChar, newPosition.Salary)
            .query(addPositionQuery);

        return result;
    } catch (error) {
        return error.message;
    }
};

// Fetch all position entries
export const fetchAllPositionsService = async () => {
    try {
        const query = `
            SELECT * FROM Positions
        `;

        const result = await poolRequest().query(query);
        return result.recordset;
    } catch (error) {
        return error;
    }
};

// Fetch one position entry by PositionID
export const fetchPositionByIdService = async (PositionID) => {
    try {
        const query = `
            SELECT * FROM Positions WHERE PositionID = @PositionID
        `;
        const result = await poolRequest()
            .input("PositionID", sql.VarChar, PositionID)
            .query(query);
        return result.recordset[0];
    } catch (error) {
        return error;
    }
};

// Update an existing position entry by PositionID
export const updatePositionService = async (updatedPosition) => {
    try {
        const updatePositionQuery =
            `
            UPDATE Positions
            SET Title = @Title, DepartmentID = @DepartmentID, Salary = @Salary
            WHERE PositionID = @PositionID
            `;

        const result = await poolRequest()
            .input("PositionID", sql.VarChar, updatedPosition.PositionID)
            .input("Title", sql.VarChar, updatedPosition.Title)
            .input("DepartmentID", sql.VarChar, updatedPosition.DepartmentID)
            .input("Salary", sql.VarChar, updatedPosition.Salary)
            .query(updatePositionQuery);

        return result;
    } catch (error) {
        return error.message;
    }
};

// Delete a position entry by PositionID
export const deletePositionService = async (PositionID) => {
    try {
        const deletePositionQuery =
            `
            DELETE FROM Positions WHERE PositionID = @PositionID
            `;

        const result = await poolRequest()
            .input("PositionID", sql.VarChar, PositionID)
            .query(deletePositionQuery);

        return result;
    } catch (error) {
        return error.message;
    }
};
