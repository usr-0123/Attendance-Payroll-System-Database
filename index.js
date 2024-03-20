import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'

import employeeRouter from './src/routes/employeeRoutes.js'
import attendanceRouter from './src/routes/attendanceRoutes.js'
import scheduleRouter from './src/routes/scheduleRoutes.js'
import overtimeRouter from './src/routes/overtimeRoutes.js'

dotenv.config()

const app=express()

var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 
}
const PORT=process.env.API_PORT || 3500

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors(corsOptions));

app.use('/api', employeeRouter)
app.use('/api', attendanceRouter)
app.use('/api', scheduleRouter)
app.use('/api', overtimeRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})