import { poolRequest, sql } from "../utilis/dbConnect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Register new employee service
export const addEmployeeService = async (newEmployee) => {
    try {
        
        // check if the employee exists in the database to prevent duplicates
        const checkEmployeeQuery = 
        `
        SELECT COUNT(*) AS Count
        FROM employees
        WHERE Email_address = @Email_address
        `

        const checkEmployeeResult = await poolRequest()
        .input('Email_address', sql.VarChar, newEmployee.Email_address)
        .query(checkEmployeeQuery)

        if (checkEmployeeResult.recordset[0].count > 0) {
            throw new Error('There is an employee with the Email address already existing')
        }

        // if the details are unique, proceed with the registration
        const insertEmployeeQuerry =
        `
        INSERT INTO employees (EmployeeID, First_name, Last_name, Email_address, Password, Contact_information, Gender, Admin_role, Date_of_Birth, Country, City, Street, Postal_code, Profile_url)
        VALUES (@EmployeeID, @First_name, @Last_name, @Email_address, @Password, @Contact_information, @Gender, @Admin_role, @Date_of_Birth, @Country, @City, @Street, @Postal_code, @Profile_url)
        `

        const result = await poolRequest()
        .input("EmployeeID", sql.VarChar, newEmployee.EmployeeID)
        .input("First_name", sql.VarChar, newEmployee.First_name)
        .input("Last_name", sql.VarChar, newEmployee.Last_name)
        .input("Email_address", sql.VarChar, newEmployee.Email_address)
        .input("Password", sql.VarChar, newEmployee.Password)
        .input("Contact_information", sql.VarChar, newEmployee.Contact_information)
        .input("Gender", sql.VarChar, newEmployee.Gender)
        .input("Admin_role", sql.VarChar, newEmployee.Admin_role)
        .input("Date_of_Birth", sql.VarChar, newEmployee.Date_of_Birth)
        .input("Country", sql.VarChar, newEmployee.Country)
        .input("City", sql.VarChar, newEmployee.City)
        .input("Street", sql.VarChar, newEmployee.Street)
        .input("Postal_code", sql.VarChar, newEmployee.Postal_code)
        .input("Profile_url", sql.VarChar, newEmployee.Profile_url)
        .query(insertEmployeeQuerry)

        return result;

    } catch (error) {
        return error
        
    }
}

// Fetch employees service
export const getAllEmployeeService = async () => {
    try {
        const allEmployees = await poolRequest().query(`SELECT * from employees`)
        return allEmployees;
    } catch (error) {
        return {error: "Invalid Credentials"};
    }
};

// Fetch employee by employee email
export const getEmployeeByEmailService = async (Email_address) => {
    try {
        const result = await poolRequest()
        .input("Email_address", sql.VarChar(255), Email_address)
        .query(`
            SELECT * FROM employees WHERE Email_address = @Email_address
            `)
        return result.recordset;
    } catch (error) {
        return error;
    }
}