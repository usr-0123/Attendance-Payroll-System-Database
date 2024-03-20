import { Router } from "express";

import {
    addDeductionController,
    fetchAllDeductionController,
    fetchDeductionByIdController,
    updateDeductionController,
    deleteDeductionController
} from "../controllers/deductionsControllers.js";

const deductionRouter = Router();

deductionRouter.post("/deduction", addDeductionController)
deductionRouter.get("/deduction/all", fetchAllDeductionController)
deductionRouter.get("/deduction/:DeductionID", fetchDeductionByIdController)
deductionRouter.put("/deduction/:DeductionID", updateDeductionController)
deductionRouter.delete("/deduction/:DeductionID", deleteDeductionController)

export default deductionRouter;