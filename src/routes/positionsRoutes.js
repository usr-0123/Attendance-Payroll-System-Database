import { Router } from "express";

import {
    addPositionController,
    fetchAllPositionsController,
    fetchPositionByIdController,
    updatePositionController,
    deletePositionController
} from "../controllers/positionsController.js";

const positionRoutes = Router()

positionRoutes.post("/position", addPositionController);
positionRoutes.get("/position/all", fetchAllPositionsController);
positionRoutes.get("/position/:PositionID", fetchPositionByIdController);
positionRoutes.put("/position/:PositionID", updatePositionController);
positionRoutes.delete("/position/:PositionID", deletePositionController);

export default positionRoutes;