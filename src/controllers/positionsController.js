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
    newPositionValidator,
    updatePositionValidator
} from "../validators/positionsValidator.js";

import {
    addPositionService,
    fetchAllPositionsService,
    fetchPositionByIdService,
    updatePositionService,
    deletePositionService
} from "../services/positionsService.js";

// Add a new position entry
export const addPositionController = async (req, res) => {
    const { PositionID, Title, DepartmentID, Salary } = req.body;

    // Validate request body
    const { error } = newPositionValidator({ PositionID, Title, DepartmentID, Salary });

    if (error) {
        return sendBadRequest(res, error.message);
    } else {
        try {
            // Generate unique PositionID
            const generatedPositionID = v4();

            // Create new position object
            const newPosition = { PositionID: generatedPositionID, Title, DepartmentID, Salary };

            // Call service to add position entry
            const response = await addPositionService(newPosition);

            if (response.message) {
                sendServerError(res, response.message);
            } else {
                sendCreated(res, "Position entry created successfully");
            }
        } catch (error) {
            sendServerError(res, error.message);
        }
    }
};

// Fetch all position entries
export const fetchAllPositionsController = async (req, res) => {
    try {
        const positionEntries = await fetchAllPositionsService();
        res.json(positionEntries);
    } catch (error) {
        sendServerError(res, error.message);
    }
};

// Fetch one position entry by PositionID
export const fetchPositionByIdController = async (req, res) => {
    const { PositionID } = req.params;
    try {
        const positionEntry = await fetchPositionByIdService(PositionID);
        if (!positionEntry) {
            return sendNotFound(res, "Position entry not found");
        }
        res.json(positionEntry);
    } catch (error) {
        sendServerError(res, error.message);
    }
};

// Update an existing position entry by PositionID
export const updatePositionController = async (req, res) => {
    const { PositionID } = req.params;
    const { Title, DepartmentID, Salary } = req.body;

    const updatedPosition = { Title, DepartmentID, Salary };

    // Validate request body
    const { error } = updatePositionValidator({ ...updatedPosition });

    if (error) {
        return sendBadRequest(res, error.message);
    }

    try {
        // Update the position entry
        const response = await updatePositionService({ ...updatedPosition, PositionID });
        if (response.message) {
            return sendNotFound(res, "Position entry not found");
        }
        successMessage(res, "Position entry updated successfully");
    } catch (error) {
        sendServerError(res, error.message);
    }
};

// Delete an existing position entry by PositionID
export const deletePositionController = async (req, res) => {
    const { PositionID } = req.params;
    try {
        // Delete the position entry
        const response = await deletePositionService(PositionID);
        if (response.message) {
            return sendNotFound(res, "Position entry not found");
        }
        sendDeleteSuccess(res, "Position entry deleted successfully");
    } catch (error) {
        sendServerError(res, error.message);
    }
};
