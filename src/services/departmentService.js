import { v4 } from "uuid";
import { poolRequest, sql } from "../utilis/dbConnect.js";
import dotenv from "dotenv";

dotenv.config();

// Create a new department entry
export const addDepartmentService = async (newDepartment) => {
    try {
        const addDepartmentQuery =
            `
            INSERT INTO Departments (DepartmentID, DepartmentName, MaximumOvertime)
            VALUES (@DepartmentID, @DepartmentName, @MaximumOvertime)
            `;

        const result = await poolRequest()
            .input("DepartmentID", sql.VarChar, newDepartment.DepartmentID)
            .input("DepartmentName", sql.VarChar, newDepartment.DepartmentName)
            .input("MaximumOvertime", sql.VarChar, newDepartment.MaximumOvertime)
            .query(addDepartmentQuery);

            // console.log("result", result);

        return result;
    } catch (error) {
        return error.message;
    }
};

// Fetch all department entries
export const fetchAllDepartmentsService = async () => {
    try {
        const query = `
            SELECT * FROM Departments
        `;

        const result = await poolRequest().query(query);
        return result.recordset;
    } catch (error) {
        return error;
    }
};

// Fetch one department entry by DepartmentID
export const fetchDepartmentByIdService = async (DepartmentID) => {
    try {
        const query = `
            SELECT * FROM Departments WHERE DepartmentID = @DepartmentID
        `;
        const result = await poolRequest()
            .input("DepartmentID", sql.VarChar, DepartmentID)
            .query(query);
        return result.recordset[0];
    } catch (error) {
        return error;
    }
};

// Update an existing department entry by DepartmentID
export const updateDepartmentService = async (updatedDepartment) => {
    try {
        const updateDepartmentQuery =
            `
            UPDATE Departments
            SET DepartmentName = @DepartmentName, MaximumOvertime = @MaximumOvertime
            WHERE DepartmentID = @DepartmentID
            `;

        const result = await poolRequest()
            .input("DepartmentID", sql.VarChar, updatedDepartment.DepartmentID)
            .input("DepartmentName", sql.VarChar, updatedDepartment.DepartmentName)
            .input("MaximumOvertime", sql.VarChar, updatedDepartment.MaximumOvertime)
            .query(updateDepartmentQuery);

            // console.log("result", result);

        return result;
    } catch (error) {
        return error.message;
    }
};

// Delete a department entry by DepartmentID
export const deleteDepartmentService = async (DepartmentID) => {
    try {
        const deleteDepartmentQuery =
            `
            DELETE FROM Departments WHERE DepartmentID = @DepartmentID
            `;

        const result = await poolRequest()
            .input("DepartmentID", sql.VarChar, DepartmentID)
            .query(deleteDepartmentQuery);

        return result;
    } catch (error) {
        return error.message;
    }
};
