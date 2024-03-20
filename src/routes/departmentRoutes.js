import { Router } from "express";

import {
    addDepartmentController,
    fetchAllDepartmentsController,
    fetchDepartmentByIdController,
    updateDepartmentController,
    deleteDepartmentController
} from "../controllers/departmentController.js";

const departmentRouter = Router();

departmentRouter.post("/department", addDepartmentController)
departmentRouter.get("/department/all", fetchAllDepartmentsController)
departmentRouter.get("/department/:DepartmentID", fetchDepartmentByIdController)
departmentRouter.put("/department/:DepartmentID", updateDepartmentController)
departmentRouter.delete("/department/:DepartmentID", deleteDepartmentController)

export default departmentRouter;