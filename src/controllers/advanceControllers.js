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
    newAdvanceValidator,
    updateAdvanceValidator
} from "../validators/advanceValidator.js";

import {
    addAdvanceService,
    fetchAllAdvanceService,
    fetchAdvanceByIdService,
    updateAdvanceService,
    deleteAdvanceService
} from "../services/advanceServices.js";

// Add a new advance entry
export const addAdvanceController = async (req, res) => {
    const { AdvanceID, EmployeeID, RequestDate, Amount, Approval_Status, Approval_Date } = req.body;

    // Validate request body
    const { error } = newAdvanceValidator({ AdvanceID, EmployeeID, RequestDate, Amount, Approval_Status, Approval_Date });

    if (error) {
        return sendServerError(res, error.message);
    } else {
        try {
            // Generate unique AdvanceID
            const generatedAdvanceID = v4();

            // Create new advance object
            const newAdvance = { AdvanceID: generatedAdvanceID, EmployeeID, RequestDate, Amount, Approval_Status, Approval_Date };

            // Call service to add advance entry
            const response = await addAdvanceService(newAdvance);

            console.log(response);

            if (response.message) {
                sendServerError(res, response.message);
            } else {
                sendCreated(res, "Advance entry created successfully");
            }
        } catch (error) {
            sendServerError(res, error.message);
        }
    }
};

// Fetch all advance entries
export const fetchAllAdvanceController = async (req, res) => {
    try {
        const advanceEntries = await fetchAllAdvanceService();
        res.json(advanceEntries);
    } catch (error) {
        sendServerError(res, error.message);
    }
};

// Fetch one advance entry by AdvanceID
export const fetchAdvanceByIdController = async (req, res) => {
    const { AdvanceID } = req.params;
    try {
        const advanceEntry = await fetchAdvanceByIdService(AdvanceID);
        if (!advanceEntry) {
            return sendNotFound(res, "Advance entry not found");
        }
        res.json(advanceEntry);
    } catch (error) {
        sendServerError(res, error.message);
    }
};

// Update an existing advance entry by AdvanceID
export const updateAdvanceController = async (req, res) => {
    const { AdvanceID } = req.params;
    const { EmployeeID, RequestDate, Amount, Approval_Status, Approval_Date } = req.body;

    // Validate request body
    const { error } = updateAdvanceValidator({ AdvanceID, EmployeeID, RequestDate, Amount, Approval_Status, Approval_Date });

    if (error) {
        return sendBadRequest(res, error.message);
    }

    try {
        // Call service to update advance entry
        const updatedAdvance = { AdvanceID, EmployeeID, RequestDate, Amount, Approval_Status, Approval_Date };
        const response = await updateAdvanceService(updatedAdvance);

        if (response.message) {
            return sendNotFound(res, "Advance entry not found");
        }

        successMessage(res, "Advance entry updated successfully");
    } catch (error) {
        sendServerError(res, error.message);
    }
};

// Delete an existing advance entry by AdvanceID
export const deleteAdvanceController = async (req, res) => {
    const { AdvanceID } = req.params;
    try {
        // Call service to delete advance entry
        const response = await deleteAdvanceService(AdvanceID);

        if (response.message) {
            return sendNotFound(res, "Advance entry not found");
        }

        sendDeleteSuccess(res, "Advance entry deleted successfully");
    } catch (error) {
        sendServerError(res, error.message);
    }
};
