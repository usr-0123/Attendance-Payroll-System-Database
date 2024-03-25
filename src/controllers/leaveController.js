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
    // countLeaveEntriesService, // Import the new service function
    addLeaveValidator,
    updateLeaveValidator
} from "../validators/leavesValidator.js";

import {
    addLeaveService,
    fetchAllLeaveService,
    fetchLeaveByIdService,
    updateLeaveService,
    countLeaveEntriesService,
    deleteLeaveService
} from "../services/leavesService.js";

// Add a new leave entry
export const addLeaveController = async (req, res) => {
    const { LeaveID, EmployeeID, BeginDate, EndDate, Reason, DaysCount } = req.body;

    // Validate request body
    const { error } = addLeaveValidator({ LeaveID, EmployeeID, BeginDate, EndDate, Reason, DaysCount });

    if (error) {
        return sendBadRequest(res, error.message);
    } else {
        try {
            // Create new leave object
            const newLeave = { LeaveID: v4(), EmployeeID, BeginDate, EndDate, Reason, DaysCount };

            // Call service to add leave entry
            const response = await addLeaveService(newLeave);

            if (response.message) {
                sendServerError(res, response.message);
            } else {
                sendCreated(res, "Leave entry created successfully");
            }
        } catch (error) {
            sendServerError(res, error.message);
        }
    }
};

// Fetch all leave entries
export const fetchAllLeaveController = async (req, res) => {
    try {
        const leaveEntries = await fetchAllLeaveService();
        res.json(leaveEntries);
    } catch (error) {
        sendServerError(res, error.message);
    }
};

// Fetch one leave entry by LeaveID
export const fetchLeaveByIdController = async (req, res) => {
    const { LeaveID } = req.params;
    try {
        const leaveEntry = await fetchLeaveByIdService(LeaveID);
        if (!leaveEntry) {
            return sendNotFound(res, "Fetch leaves service  says: Leave entry not found");
        }
        res.json(leaveEntry);
    } catch (error) {
        sendServerError(res, error.message);
    }
};

// Update an existing leave entry by LeaveID
export const updateLeaveController = async (req, res) => {
    const { LeaveID } = req.params;
    const { EmployeeID, BeginDate, EndDate, Reason, DaysCount } = req.body;

    // Validate request body
    const { error } = updateLeaveValidator({ EmployeeID, BeginDate, EndDate, Reason, DaysCount });

    if (error) {
        return sendBadRequest(res, error.message);
    }

    try {
        // Update the leave entry
        const response = await updateLeaveService({ LeaveID, EmployeeID, BeginDate, EndDate, Reason, DaysCount });
        if (response.message) {
            return sendNotFound(res, "Update leave service says: Leave entry not found");
        }
        successMessage(res, "Leave entry updated successfully");
    } catch (error) {
        sendServerError(res, error.message);
    }
};

// Delete an existing leave entry by LeaveID
export const deleteLeaveController = async (req, res) => {
    const { LeaveID } = req.params;
    try {
        // Delete the leave entry
        const response = await deleteLeaveService(LeaveID);
        if (response.message) {
            return sendNotFound(res, "Leave entry not found");
        }
        sendDeleteSuccess(res, "Leave entry deleted successfully");
    } catch (error) {
        sendServerError(res, error.message);
    }
};

// Controller to count leave entries
export const countLeaveEntriesController = async (req, res) => {
    try {
        const leaveCount = await countLeaveEntriesService();
        res.json({ leaveCount });
    } catch (error) {
        sendServerError(res, error.message);
    }
};
