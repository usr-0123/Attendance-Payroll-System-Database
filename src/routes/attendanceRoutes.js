import {Router} from 'express'

import {
    addAttendanceController,
    getAttendanceController,
    getAttendanceByIDController,
    updateAttendanceController,
    deleteAttendanceController
} from '../controllers/attendanceController.js'

const attendanceRouter = Router();

attendanceRouter.post("/attendance/new", addAttendanceController);
attendanceRouter.get("/attendance/all", getAttendanceController);
attendanceRouter.get("/attendance/:AttendanceID", getAttendanceByIDController);
attendanceRouter.put("/attendance/:AttendanceID", updateAttendanceController);
attendanceRouter.delete("/attendance/:AttendanceID", deleteAttendanceController);

export default attendanceRouter;