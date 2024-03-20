import { Router } from "express";

import {
    addOvertimeController,
    fetchAllOvertimeController,
    fetchOvertimeByIdController,
    updateOvertimeController,
    deleteOvertimeController
} from '../controllers/overtimeController.js'

const overtimeRouter = Router();

overtimeRouter.post("/overtime", addOvertimeController);
overtimeRouter.get("/overtime/all", fetchAllOvertimeController);
overtimeRouter.get("/overtime/:OvertimeID", fetchOvertimeByIdController);
overtimeRouter.put("/overtime/:OvertimeID", updateOvertimeController);
overtimeRouter.delete("/overtime/:OvertimeID", deleteOvertimeController);

export default overtimeRouter;