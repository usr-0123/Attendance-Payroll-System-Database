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
    addDepartmentService,
    fetchAllDepartmentsService,
    fetchDepartmentByIdService,
    updateDepartmentService,
    deleteDepartmentService
} from "../services/departmentService.js";

import {
    newDepartmentValidator,
    updateDepartmentValidator
} from "../validators/departmentValidator.js";

// Add a new department entry
export const addDepartmentController = async (req, res) => {
    const { DepartmentID, DepartmentName, MaximumOvertime } = req.body;

    // console.log("req.body", req.body);

    // Validate request body
    const { error } = newDepartmentValidator({ DepartmentID, DepartmentName, MaximumOvertime });

    // console.log("error", error);

    if (error) {
        return sendBadRequest(res, error.message);
    } else {
    try {
        // Generate unique DepartmentID
        const generatedDepartmentID = v4();

        // Create new department object
        const newDepartment = { DepartmentID: generatedDepartmentID, DepartmentName, MaximumOvertime };

        // console.log("newDepartment", newDepartment);

        // Call service to add department entry
        const response = await addDepartmentService(newDepartment);

        // console.log("response", response);

        if (response.message) {
            return sendServerError(res, response.message);
        } else {
            sendCreated(res, "Department entry created successfully");
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
}
};

// Fetch all department entries
export const fetchAllDepartmentsController = async (req, res) => {
    try {
        const departmentEntries = await fetchAllDepartmentsService();
        res.json(departmentEntries);
    } catch (error) {
        sendServerError(res, error.message);
    }
};

// Fetch one department entry by DepartmentID
export const fetchDepartmentByIdController = async (req, res) => {
    const { DepartmentID } = req.params;
    try {
        const departmentEntry = await fetchDepartmentByIdService(DepartmentID);
        if (!departmentEntry) {
            return sendNotFound(res, "Department entry not found");
        }
        res.json(departmentEntry);
    } catch (error) {
        sendServerError(res, error.message);
    }
};

// Update an existing department entry by DepartmentID
export const updateDepartmentController = async (req, res) => {
    const { DepartmentID } = req.params;
    const { DepartmentName, MaximumOvertime } = req.body;

    const updatedDepartment = { DepartmentName, MaximumOvertime };

    // Validate request body
    const { error } = updateDepartmentValidator({ ...updatedDepartment });

    if (error) {
        return sendBadRequest(res, error.message);
    } else {

    try {
        // Update the department entry
        const response = await updateDepartmentService({ ...updatedDepartment, DepartmentID });
        if (response.message) {
            return sendNotFound(res, "Department entry not found");
        }
        successMessage(res, "Department entry updated successfully");
    } catch (error) {
        sendServerError(res, error.message);
    }
}
};

// Delete an existing department entry by DepartmentID
export const deleteDepartmentController = async (req, res) => {
    const { DepartmentID } = req.params;
    try {
        // Delete the department entry
        const response = await deleteDepartmentService(DepartmentID);
        if (response.message) {
            return sendNotFound(res, "Department entry not found");
        }
        sendDeleteSuccess(res, "Department entry deleted successfully");
    } catch (error) {
        sendServerError(res, error.message);
    }
};
