import { v4 } from "uuid";

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

import {
    newPayrollValidator,
    updatePayrollValidator
} from "../validators/payrollValidator.js";

import {
    addPayrollService,
    fetchAllPayrollService,
    fetchPayrollByIdService,
    updatePayrollService,
    deletePayrollService
} from "../services/payrollServices.js";

// Add a new payroll entry
export const addPayrollController = async (req, res) => {
    const {PayrollID, EmployeeID, GrossPay, DeductionID, NetPay, OvertimePay, Advance } = req.body;

    // Validate request body
    const { error } = newPayrollValidator({ PayrollID, EmployeeID, GrossPay, DeductionID, NetPay, OvertimePay, Advance });

    // console.log(error);
    if (error) {
        return sendServerError(res, error.message);
    } else {
        try {
            // Generate unique PayrollID
            const generatedPayrollID = v4();

            // Create new payroll object
            const newPayroll = { PayrollID: generatedPayrollID, EmployeeID, GrossPay, DeductionID, NetPay, OvertimePay, Advance };

            // Call service to add payroll entry
            const response = await addPayrollService(newPayroll);

            // console.log(response);

            if (response.message) {
                sendServerError(res, response.message);
            } else {
                sendCreated(res, "Payroll entry created successfully");
            }
        } catch (error) {
            sendServerError(res, error.message);
        }
    }
};

// Fetch all payroll entries
export const fetchAllPayrollController = async (req, res) => {
    try {
        const payrollEntries = await fetchAllPayrollService();
        res.json(payrollEntries);
    } catch (error) {
        sendServerError(res, error.message);
    }
};

// Fetch one payroll entry by PayrollID
export const fetchPayrollByIdController = async (req, res) => {
    const { PayrollID } = req.params;
    try {
        const payrollEntry = await fetchPayrollByIdService(PayrollID);
        if (!payrollEntry) {
            return sendNotFound(res, "Payroll entry not found");
        }
        res.json(payrollEntry);
    } catch (error) {
        sendServerError(res, error.message);
    }
};

// Update an existing payroll entry by PayrollID
export const updatePayrollController = async (req, res) => {
    const { PayrollID } = req.params;
    const { EmployeeID, GrossPay, DeductionID, NetPay, OvertimePay, Advance } = req.body;

    const updatedPayroll = { EmployeeID, GrossPay, DeductionID, NetPay, OvertimePay, Advance };

    // Validate request body
    const { error } = updatePayrollValidator(updatedPayroll);

    if (error) {
        return sendBadRequest(res, error.message);
    }

    try {
        // Update the payroll entry
        const response = await updatePayrollService({ ...updatedPayroll, PayrollID });
        if (response.message) {
            return sendNotFound(res, "Payroll entry not found");
        }
        successMessage(res, "Payroll entry updated successfully");
    } catch (error) {
        sendServerError(res, error.message);
    }
};

// Delete an existing payroll entry by PayrollID
export const deletePayrollController = async (req, res) => {
    const { PayrollID } = req.params;
    try {
        // Delete the payroll entry
        const response = await deletePayrollService(PayrollID);
        if (response.message) {
            return sendNotFound(res, "Payroll entry not found");
        }
        sendDeleteSuccess(res, "Payroll entry deleted successfully");
    } catch (error) {
        sendServerError(res, error.message);
    }
};
