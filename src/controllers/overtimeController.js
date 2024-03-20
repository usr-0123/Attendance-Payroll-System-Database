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
    updateOvertimeValidator,
    newOvertomeValidator
} from "../validators/overtimeValidators.js";

import {
    addOvertimeService,
    fetchAllOvertimeService,
    fetchOvertimeByIdService,
    updateOvertimeService,
    deleteOvertimeService
} from "../services/overtimeServices.js";

// Add a new overtime entry
export const addOvertimeController = async (req, res) => {
    const { OvertimeID, EmployeeID, Overtime_date, Duration, Rate } = req.body;

    // Validate request body
    const { error } = newOvertomeValidator({ OvertimeID, EmployeeID, Overtime_date, Duration, Rate });

    if (error) {
        return sendServerError(res, error.message);
    } else {
        try {
            // Generate unique OvertimeID
            const generatedOvertimeID = v4();

            // Create new overtime object
            const newOvertime = { OvertimeID: generatedOvertimeID, EmployeeID, Overtime_date, Duration, Rate };

            // Call service to add overtime entry
            const response = await addOvertimeService(newOvertime);

            console.log(response);

            if (response.message) {
                sendServerError(res, response.message);
            } else {
                sendCreated(res, "Overtime entry created successfully");
            }
        } catch (error) {
            sendServerError(res, error.message);
        }
    }
};

// Fetch all overtime entries
export const fetchAllOvertimeController = async (req, res) => {
    try {
        const overtimeEntries = await fetchAllOvertimeService();
        res.json(overtimeEntries);
    } catch (error) {
        sendServerError(res, error.message);
    }
};

// Fetch one overtime entry by OvertimeID
export const fetchOvertimeByIdController = async (req, res) => {
    const { OvertimeID } = req.params;
    try {
        const overtimeEntry = await fetchOvertimeByIdService(OvertimeID);
        if (!overtimeEntry) {
            return sendNotFound(res, "Overtime entry not found");
        }
        res.json(overtimeEntry);
    } catch (error) {
        sendServerError(res, error.message);
    }
};

// Update an existing overtime entry by OvertimeID
export const updateOvertimeController = async (req, res) => {
    const { OvertimeID } = req.params;
    const {EmployeeID, Overtime_date, Duration, Rate} = req.body;

    const updatedOvertime = {EmployeeID, Overtime_date, Duration, Rate}

    // Validate request body
    const { error } = updateOvertimeValidator({ ...updatedOvertime });

    if (error) {
        return sendBadRequest(res, error.message);
    }

    try {
        // Update the overtime entry
        const response = await updateOvertimeService({ ...updatedOvertime, OvertimeID });
        if (response.message) {
            return sendNotFound(res, "Overtime entry not found");
        }
        successMessage(res, "Overtime entry updated successfully");
    } catch (error) {
        sendServerError(res, error.message);
    }
};

// Delete an existing overtime entry by OvertimeID
export const deleteOvertimeController = async (req, res) => {
    const { OvertimeID } = req.params;
    try {
        // Delete the overtime entry
        const response = await deleteOvertimeService( OvertimeID );
        if (response.message) {
            return sendNotFound(res, "Overtime entry not found");
        }
        sendDeleteSuccess(res, "Overtime entry deleted successfully");
    } catch (error) {
        sendServerError(res, error.message);
    }
};
