import bcrypt from "bcrypt";
import { v4 } from "uuid";
import nodemailer from 'nodemailer';
import logger from "../utilis/logger.js";
// import emailTemp from "../../../MailActivities/emailTemp.js";

import {
    successMessage,
    sendDeleteSuccess,
    validationError,
    sendBadRequest,
    sendServerError,
    sendCreated,
    notAuthorized,
    sendNotFound,
    paginate,
    orderData,
    checkIfValuesIsEmptyNullUndefined
} from "../helpers/helperFunctions.js";

// import services
import {
    addEmployeeService,
    getAllEmployeeService,
    getEmployeeByEmailService,
    deleteEmployeeServices,
    authenticateloginEmployeeService
} from '../services/employeesServices.js'

// import validators
import {
    employeeValidator,
    employeeLoginValidator
} from '../validators/employeeValidators.js'

// Register new employee
export const registerNewEmployeeController = async (req, res) => {
    try {
        const {First_name,Last_name,Email_address,Password,Contact_information,Gender,Admin_role,Date_of_Birth,Country,City,Street,Postal_code,Profile_url} = req.body;
        // console.log(req.body);

        const existingEmployee = await getEmployeeByEmailService(Email_address)

        console.log('Existing employee', existingEmployee);

        if (existingEmployee == [1]) {
            return res.status(400).send({message: 'Controller says: Employee with the provided email already existing'})
        } else {
            const EmployeeID = v4();
            const hashedPassword = await bcrypt.hash(Password, 8);

            const registerEmployee = {
                EmployeeID:EmployeeID.toLowerCase(),
                First_name,
                Last_name,
                Email_address:Email_address.toLowerCase(),
                Password: hashedPassword,
                Contact_information: Contact_information.toLowerCase(),
                Gender,
                Admin_role: Admin_role.toLowerCase(),
                Date_of_Birth,
                Country,
                City,
                Street,
                Postal_code,
                Profile_url
            }
            // console.log("created employee", registerEmployee);

            const result = await addEmployeeService(registerEmployee)

            if (result.message) {
                sendServerError(res, result.message)
            } else {
                sendCreated(res, 'Employee created successfully');
            }
        }

    } catch (error) {
        sendServerError(res, error.message)
    }
}

// Login employee
export const loginEmployeeController=async(req,res)=>{
    try {
        // console.log("I am reached here at the try section");

      const { Email_address, Password } = req.body;

        const { error } = employeeLoginValidator(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const employee = await getEmployeeByEmailService(Email_address);
      console.log("employee", employee);
      if (!employee) {
        return sendNotFound(res, "Employee not found");
      }else{
        // console.log("I am reached at the else");


      const loggedInmployee = await authenticateloginEmployeeService({ Email_address, Password });
      console.log("Logged in", loggedInmployee);

      // Successful login
      res.status(200).json({ employee ,message:"Logged In successfully!" });
      }
    } catch (error) {
        
    // console.log("I am reached here at the catch section");

      return sendServerError(res, "Internal server error");
    }
}

// Get all employees
export const getAllEmployeesController = async (req, res) => {
    try {
        const results = await getAllEmployeeService();
        const employees = results.recordset;
        return res.status(200).json(employees);
    } catch (error) {
        console.error("Error fetching all employees", error);
        return res.status(500).json("Internal server error");
    }
}

// Get employee by email address
export const getEmployeeByEmailController=async(req,res)=>{
    try {
      const {Email_address}=req.params
      const singleEmployeeByEmail=await getEmployeeByEmailService(Email_address)
      if(singleEmployeeByEmail.length !==0){
        return res.status(200).json(singleEmployeeByEmail[0])
    }else{
        sendNotFound(res, 'Employee not found')
    } 
      
    } catch (error) {
      return error
    }
  }

  // Delete an employee by email
  // Fix the bug, unable to check if user exists before deleting

  export const deleteEmployeeController=async(req,res)=>{
    try {
      const {Email_address}=req.params
      const singleEmployeeByEmail =await getEmployeeByEmailService(Email_address)
      if(singleEmployeeByEmail.rowsAffected == 0){
        sendServerError(res, "Employee not found")
    }else{
        const response = await deleteEmployeeServices(Email_address)
        
        if (response.message) {
            sendServerError(res, response.message)
        } else {
            sendDeleteSuccess(res, `Employee with email address ${Email_address} was deleted successfully`);
        }
    }
    } catch (error) {
      sendServerError(res, error.message);
    }
  }
