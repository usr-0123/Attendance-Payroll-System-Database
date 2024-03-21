import joi from "joi";

export const employeeValidator = (employee) => {
    const employeeValidationSchema = joi.object({
        First_name: joi.string().required(),
        Last_name: joi.string().required(),
        Email_address: joi.string().email().required(),
        Password: joi
            .string()
            .min(4)
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/, 'password')
            .message(
                'Password must be at least 4 characters long, contain at least one lowercase letter, one uppercase letter, one digit, and one special character.')
            .required(),
            Contact_information: joi.string().allow(""),
            Gender: joi.string().allow(""),
            Admin_role: joi.string().required(),
            Date_of_Birth: joi.date().iso().allow(""),
            Country: joi.string().allow(""),
            City: joi.string().allow(""),
            Street: joi.string().allow(""),
            Postal_code: joi.string().allow(""),
            Profile_url: joi.string().allow(""),
    })

    return employeeValidationSchema.validate(employee)
};

export const employeeLoginValidator = (employee) => {
    const employeeLoginSchema = joi.object({
      Email_address: joi.string().email().required(),
      Password: joi.string().required(),
    });
  
    return employeeLoginSchema.validate(employee);
  };