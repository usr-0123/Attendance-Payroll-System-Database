import {Router} from 'express'

import {VerifyTokenMiddleware} from '../middlewares/employeeAuthMiddleware.js'

import {
    registerNewEmployeeController,
    getAllEmployeesController,
    getEmployeeByEmailController,
    deleteEmployeeController,
    loginEmployeeController,
    countEmployeesController,
    getAllEmployeeDetailsController,
    getAttendanceEmployeeDetailsController
} from '../controllers/employeesControllers.js'

const employeeRouter = Router();

// Controller function to fetch employee details including leave, departments, and position information

employeeRouter.post('/employee/register', registerNewEmployeeController)
employeeRouter.get('/employee/fetchall', getAllEmployeesController)
employeeRouter.get('/employee/fetchByEmail/:Email_address', getEmployeeByEmailController)
employeeRouter.get('/employee/count', countEmployeesController)
employeeRouter.delete('/employee/deleteByEmail/:Email_address', deleteEmployeeController)
employeeRouter.post('/employee/loginEmployee', loginEmployeeController)
employeeRouter.get('/employee/fetchall/details' ,getAllEmployeeDetailsController)
employeeRouter.get("/employee/leave/position/department" ,getAttendanceEmployeeDetailsController)

export default employeeRouter;