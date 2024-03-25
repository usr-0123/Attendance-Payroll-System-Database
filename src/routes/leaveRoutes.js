import { Router } from "express";

import {
    addLeaveController,
    fetchAllLeaveController,
    fetchLeaveByIdController,
    updateLeaveController,
    countLeaveEntriesController,
    deleteLeaveController
} from "../controllers/leaveController.js";

const leaveRouter = Router();

leaveRouter.post("/leave", addLeaveController)
leaveRouter.get("/leave/all", fetchAllLeaveController)
leaveRouter.get("/leave/:LeaveID", fetchLeaveByIdController)
leaveRouter.put("/leave/:LeaveID", updateLeaveController)
leaveRouter.delete("/leave/:LeaveID", deleteLeaveController)
leaveRouter.get("/leave/count/entries", countLeaveEntriesController)

export default leaveRouter;