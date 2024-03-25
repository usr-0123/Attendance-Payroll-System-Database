import { poolRequest, sql } from "../utilis/dbConnect.js";
import dotenv from "dotenv";
import jwt  from 'jsonwebtoken';
import bcrypt from "bcrypt";

dotenv.config();

// Create a new employee entry
export const addEmployeeService = async (newEmployee) => {
    try {
        // Insert new employee data
        const addEmployeeQuery = `
            INSERT INTO employees (EmployeeID, First_name, Last_name, Email_address, Password, Contact_information, Gender, Admin_role, Date_of_Birth, Country, City, Street, Postal_code, Profile_url)
            VALUES (@EmployeeID, @First_name, @Last_name, @Email_address, @Password, @Contact_information, @Gender, @Admin_role, @Date_of_Birth, @Country, @City, @Street, @Postal_code, @Profile_url)
        `;
        const result = await poolRequest()
            .input("EmployeeID", sql.VarChar, newEmployee.EmployeeID)
            .input("First_name", sql.VarChar, newEmployee.First_name)
            .input("Last_name", sql.VarChar, newEmployee.Last_name)
            .input("Email_address", sql.VarChar, newEmployee.Email_address)
            .input("Password", sql.VarChar, newEmployee.Password)
            .input("Contact_information", sql.VarChar, newEmployee.Contact_information)
            .input("Gender", sql.VarChar, newEmployee.Gender)
            .input("Admin_role", sql.VarChar, newEmployee.Admin_role)
            .input("Date_of_Birth", sql.Date, newEmployee.Date_of_Birth)
            .input("Country", sql.VarChar, newEmployee.Country)
            .input("City", sql.VarChar, newEmployee.City)
            .input("Street", sql.VarChar, newEmployee.Street)
            .input("Postal_code", sql.VarChar, newEmployee.Postal_code)
            .input("Profile_url", sql.VarChar, newEmployee.Profile_url)
            .query(addEmployeeQuery);

            console.log("result", result);

        return result;
    } catch (error) {
        return error.message;
    }
};

// Log in employee
export const authenticateloginEmployeeService = async (employee) => {
  try {
    const employeeFoundResponse = await poolRequest()
      .input("Email_address", sql.VarChar, employee.Email_address)
      .query("SELECT * FROM employee WHERE Email_address=@Email_address");

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

// Login employee
export const findByCredentialsService = async (employee) => {
  try {
      const employeeFoundResponse = await poolRequest()
          .input("Email_address", sql.VarChar, employee.Email_address)
          .query("SELECT * FROM employees WHERE Email_address=@Email_address");

      if (employeeFoundResponse.recordset[0]) {
          const storedPassword = employeeFoundResponse.recordset[0].Password;
          const isPasswordValid = await bcrypt.compare(employee.Password, storedPassword);

          if (isPasswordValid) {
              const token = jwt.sign({
                  EmployeeID: employeeFoundResponse.recordset[0].EmployeeID,
                  Email_address: employeeFoundResponse.recordset[0].Email_address
              }, process.env.JWT_SECRET, { expiresIn: "24h" });

              const { Password, Admin_role, ...employeeData } = employeeFoundResponse.recordset[0];

              return { employee: employeeData, Admin_role: Admin_role, token: `JWT ${token}` };
          } else {
              return { error: 'Invalid Credentials' };
          }
      } else {
          return { error: 'Invalid Credentials' };
      }
  } catch (error) {
      return error.message;
  }
};

// Fetch all employee details including leave and position information
export const getAllEmployeeDetails = async () => {
    try {
        const query = `
            SELECT 
                e.EmployeeID,
                e.First_name,
                e.Last_name,
                e.Email_address,
                e.Contact_information,
                e.Gender,
                e.Admin_role,
                e.Date_of_Birth,
                e.Country,
                e.City,
                e.Street,
                e.Postal_code,
                e.Profile_url,
                l.LeaveID,
                l.BeginDate,
                l.EndDate,
                l.Reason,
                l.DaysCount,
                p.PositionID,
                p.Title,
                p.DepartmentID,
                p.Salary
            FROM 
                employees e
            LEFT JOIN 
                Leave l ON e.EmployeeID = l.EmployeeID
            LEFT JOIN 
                Positions p ON e.EmployeeID = p.EmployeeID;
        `;
        const result = await poolRequest().query(query);
        return result.recordset;
    } catch (error) {
        return { error: "Error fetching employee details" };
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