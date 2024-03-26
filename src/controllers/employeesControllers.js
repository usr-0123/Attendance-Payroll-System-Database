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
    findByCredentialsService,
    getAllEmployeeService,
    getEmployeeByEmailService,
    deleteEmployeeServices,
    getAllEmployeeDetails,
    countEmployeesService,
    getAttendanceEmployeeDetailsService,
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

        const { error } = employeeValidator({First_name,Last_name,Email_address,Password,Contact_information,Gender,Admin_role,Date_of_Birth,Country,City,Street,Postal_code,Profile_url})

        if (error) {
          return sendServerError(res, error.message)
        } else {

        const existingEmployee = await getEmployeeByEmailService(Email_address)

        if (existingEmployee === 1) {

          console.log("existingEmployee.rowsAffected == [1]");

            return res.status(400).send({message: 'Employee with the provided email already existing'})

        } else if (existingEmployee == 0 ) {
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

            const result = await addEmployeeService(registerEmployee)

            if (result.message) {
                sendServerError(res, result.message)
            } else {
              await sendMail(Email_address, First_name, Last_name, Password)
                sendCreated(res, 'Employee created successfully');
            }
        }
      }

    } catch (error) {
      console.log("error.message",error.message);
        sendServerError(res, error.message)
    }
}

// Email upon registration
export const sendMail = async (Email_address, First_name, Last_name, Password) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.Email,
      pass: process.env.Password,
    },
  });
   
  // Generate HTML string for the email content
  const emailTemp = `
  <!DOCTYPE html>
  <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
  <head>
      <title>LOGIN CREDENTIALS, ${First_name} ${Last_name}!</title>
  </head>
  <body>
      <p>Dear ${First_name} ${Last_name},</p>
      <p>We're excited to have you as a member!</p>
      <p>Log in to your account with this email address ${Email_address}</p>
      <p>Use the password ${Password}, login and update your password.</p>
      <p>Log in to edit your personal details as needed.</p>
  </body>
  </html>
`;
   
  const mailOptions = {
    from: process.env.Email_address,
    to: Email_address,
    subject: "Welcome onboard to Luwi PLC",
    html: emailTemp,
  };
   
  try {
    logger.info("Sending mail....");
    await transporter.sendMail(mailOptions);
    logger.info("Email sent successfully!");
  } catch (error) {
    logger.error(error);
  }
  };

// Login employee
export const loginEmployeeController = async (req, res) => {
  try {
    const { Email_address, Password } = req.body;

    const { error } = employeeLoginValidator(req.body);
    if (error) {
      return sendBadRequest(res, error.details[0].message);
    }
    // Check if the user exists
    const employee = await getEmployeeByEmailService(Email_address);
    // console.log("employee", employee);
    if (!employee) {
      return sendNotFound(res, "User not found");
    } else {
      const loggedInUser = await findByCredentialsService({ Email_address, Password });
      // console.log("logged in", loggedInUser);

      res.json({ message: "Logged in successfully", loggedInUser });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

// Get all employee details including leave and position information
export const getAllEmployeeDetailsController = async (req, res) => {
    try {
        const employeeDetails = await getAllEmployeeDetails();
        return res.status(200).json(employeeDetails);
    } catch (error) {
        console.error("Error fetching all employee details", error);
        return res.status(500).json("Internal server error");
    }
}

// Controller function to fetch employee details including leave, departments, and position information
export const getAttendanceEmployeeDetailsController = async (req, res) => {
  try {
      // Call the service function to fetch employee details
      const employeeDetails = await getAttendanceEmployeeDetailsService();

      // Return the fetched employee details as a response
      res.status(200).json(employeeDetails);
  } catch (error) {
      // Handle any errors and send a server error response
      sendServerError(res, error.message);
  }
};

// Controller function to count employees
export const countEmployeesController = async (req, res) => {
  try {
      const employeeCount = await countEmployeesService();
      res.status(200).json({ employeeCount });
  } catch (error) {
      console.error("Error counting employees", error);
      res.status(500).json({ error: "Internal server error" });
  }
};

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
      return error.message;
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
