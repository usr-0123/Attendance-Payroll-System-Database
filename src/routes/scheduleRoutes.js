import { Router } from "express";

import {
    addScheduleController,
    getScheduleController,
    getScheduleByIDController,
    updateScheduleController,
    deleteScheduleController
} from '../controllers/scheduleController.js'

const scheduleRouter = Router();

scheduleRouter.post("/schedule", addScheduleController);
scheduleRouter.get("/schedule/all", getScheduleController);
scheduleRouter.get("/schedule/:ScheduleID", getScheduleByIDController);
scheduleRouter.put("/schedule/:ScheduleID", updateScheduleController);
scheduleRouter.delete("/schedule/:ScheduleID", deleteScheduleController);

export default scheduleRouter;