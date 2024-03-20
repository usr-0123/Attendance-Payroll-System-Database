import { Router } from "express";

import {
    addAdvanceController,
    fetchAllAdvanceController,
    fetchAdvanceByIdController,
    updateAdvanceController,
    deleteAdvanceController
} from "../controllers/advanceControllers.js";

const advanceRouter = Router();

advanceRouter.post("/advance", addAdvanceController);
advanceRouter.get("/advance/all", fetchAllAdvanceController);
advanceRouter.get("/advance/:AdvanceID", fetchAdvanceByIdController);
advanceRouter.put("/advance/:AdvanceID", updateAdvanceController);
advanceRouter.delete("/advance/:AdvanceID", deleteAdvanceController);

export default advanceRouter;