import { Router } from "express";

import {
    addLeaveController,
    fetchAllLeaveController,
    fetchLeaveByIdController,
    updateLeaveController,
    deleteLeaveController
} from "../controllers/leaveController.js";

const leaveRouter = Router();

leaveRouter.post("/leave", addLeaveController)
leaveRouter.get("/leave/all", fetchAllLeaveController)
leaveRouter.get("/leave/:LeaveID", fetchLeaveByIdController)
leaveRouter.put("/leave/:LeaveID", updateLeaveController)
leaveRouter.delete("/leave/:LeaveID", deleteLeaveController)

export default leaveRouter;