import {Router} from 'express'

import {VerifyTokenMiddleware} from '../middlewares/employeeAuthMiddleware.js'

import {
    registerNewEmployeeController,
    getAllEmployeesController,
    getEmployeeByEmailController,
    deleteEmployeeController,
    loginEmployeeController,
    getAllEmployeeDetailsController
} from '../controllers/employeesControllers.js'

const employeeRouter = Router();

employeeRouter.post('/employee/register', registerNewEmployeeController)
employeeRouter.get('/employee/fetchall', getAllEmployeesController)
employeeRouter.get('/employee/fetchByEmail/:Email_address', getEmployeeByEmailController)
employeeRouter.delete('/employee/deleteByEmail/:Email_address', deleteEmployeeController)
employeeRouter.post('/employee/loginEmployee', loginEmployeeController)
employeeRouter.get('/employee/fetchall/details' ,getAllEmployeeDetailsController)

export default employeeRouter;