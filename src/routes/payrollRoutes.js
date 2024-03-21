import { Router } from "express";

import {
    addPayrollController,
    fetchAllPayrollController,
    fetchPayrollByIdController,
    updatePayrollController,
    deletePayrollController
} from "../controllers/payrollController.js";

const payrollRoutes = Router();

payrollRoutes.post("/payroll", addPayrollController);
payrollRoutes.get("/payroll/all", fetchAllPayrollController);
payrollRoutes.get("/payroll/:PayrollID", fetchPayrollByIdController);
payrollRoutes.put("/payroll/:PayrollID", updatePayrollController);
payrollRoutes.delete("/payroll/:PayrollID", deletePayrollController);

export default payrollRoutes;