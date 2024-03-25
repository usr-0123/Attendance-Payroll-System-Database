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
    newDeductionValidator,
    updateDeductionValidator
} from "../validators/deductionsValidator.js";

import {
    addDeductionService,
    fetchAllDeductionService,
    fetchDeductionByIdService,
    updateDeductionService,
    deleteDeductionService
} from "../services/deductionsServices.js";

// Add a new deduction entry
export const addDeductionController = async (req, res) => {
    const { DeductionName, DeductionDescription, Amount } = req.body;

    // console.log("Req.body",req.body);

    // Validate request body
    const { error } = newDeductionValidator({ DeductionName, DeductionDescription, Amount });

    // console.log("error", error);

    if (error) {
        return sendServerError(res, error.message);
    } else {
        try {// Generate unique OvertimeID
            const generatedDeductionID = v4();

            // Create new overtime object
            const newDeduction = { DeductionID: generatedDeductionID, DeductionName, DeductionDescription, Amount };

            // Call service to add deduction entry
            const response = await addDeductionService(newDeduction);

            // console.log("response", response);

            if (response.message) {
                sendServerError(res, response.message);
            } else {
                sendCreated(res, "Deduction entry created successfully");
            }
        } catch (error) {
            // console.log(error);
            sendServerError(res, error.message);
        }
    }
};

// Fetch all deduction entries
export const fetchAllDeductionController = async (req, res) => {
    try {
        const deductionEntries = await fetchAllDeductionService();
        res.json(deductionEntries);
    } catch (error) {
        sendServerError(res, error.message);
    }
};

// Fetch one deduction entry by DeductionID
export const fetchDeductionByIdController = async (req, res) => {
    const { DeductionID } = req.params;
    try {
        const deductionEntry = await fetchDeductionByIdService(DeductionID);
        if (!deductionEntry) {
            return sendNotFound(res, "Deduction entry not found");
        }
        res.json(deductionEntry);
    } catch (error) {
        sendServerError(res, error.message);
    }
};

// Update an existing deduction entry by DeductionID
export const updateDeductionController = async (req, res) => {
    const { DeductionID } = req.params;
    const { DeductionName, DeductionDescription, Amount } = req.body;

    // Validate request body
    const { error } = updateDeductionValidator({ DeductionID, DeductionName, DeductionDescription, Amount });

    if (error) {
        return sendBadRequest(res, error.message);
    }

    try {
        // Call service to update deduction entry
        const updatedDeduction = { DeductionID, DeductionName, DeductionDescription, Amount };
        const response = await updateDeductionService(updatedDeduction);

        if (response.message) {
            return sendNotFound(res, "Deduction entry not found");
        }

        successMessage(res, "Deduction entry updated successfully");
    } catch (error) {
        sendServerError(res, error.message);
    }
};

// Delete a deduction entry by DeductionID
export const deleteDeductionController = async (req, res) => {
    const { DeductionID } = req.params;
    try {
        const response = await deleteDeductionService(DeductionID);
        if (response.rowsAffected && response.rowsAffected[0] > 0) {
            sendDeleteSuccess(res, "Deduction entry deleted successfully");
        } else {
            sendNotFound(res, "Deduction entry not found");
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};
