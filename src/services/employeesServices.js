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

// Log in employee
export const authenticateloginEmployeeService = async (employee) => {
  try {
    const employeeFoundResponse = await poolRequest()
      .input("Email_address", sql.VarChar, employee.Email_address)
      .query("SELECT * FROM employee WHERE Email_address=@Email_address");

      
    //   console.log("found employee", employeeFoundResponse);

    if (employeeFoundResponse.recordset.length = 1) {
        // console.log(employeeFoundResponse);

      const storedPassword = employeeFoundResponse.recordset[0].Password;
      const isPasswordValid = await bcrypt.compare(employee.Password, storedPassword);

      if (isPasswordValid) {
        const token = jwt.sign({
          EmployeeID: employeeFoundResponse.recordset[0].EmployeeID,
          Email_address: employeeFoundResponse.recordset[0].Email_address
        }, process.env.JWT_SECRET, { expiresIn: "24h" });

        console.log("Token is", token);
        const { Password, ...employeeData } = employeeFoundResponse.recordset[0];
        return { employee: employeeData, token: `JWT ${token}` };
      } else {
        return error.message ;
      }
    } else {
      return error.message ;
    }
  } catch (error) {
    // logger.error("Login Error", error);
    return error.message ;
  }
};


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

// Delete an employee by email
export const deleteEmployeeServices=async(Email_address)=>{
    try {
        const response= await poolRequest()
        .input('Email_address', sql.VarChar,Email_address)
        .query(`DELETE FROM employees WHERE Email_address = @Email_address `)
        return response;
    } catch (error) {
        return error;
    }
  }