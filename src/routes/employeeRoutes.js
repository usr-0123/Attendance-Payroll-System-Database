import {Router} from 'express'

import {VerifyTokenMiddleware} from '../middlewares/userAuthMiddleware.js'

import {
    registerNewEmployeeController,
    getAllEmployeesController,
    getEmployeeByEmailController
} from '../controllers/employeesControllers.js'

const employeeRouter = Router();

employeeRouter.post('/employee/register', registerNewEmployeeController)
employeeRouter.get('/employee/fetchall', getAllEmployeesController)
employeeRouter.get('/employee/fetchByEmail/:Email_address', getEmployeeByEmailController)

export default employeeRouter;