import express from 'express';
import dotenv from 'dotenv'
import userRoutes from './Routes/userRoutes.js'
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import {notFound,errorHandler} from './Middleware/errorMiddleware.js'
import adminRouter from './Routes/adminRoutes.js';
dotenv.config()

connectDB();

const port = process.env.PORT

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/users',userRoutes)
app.use('/api/admin',adminRouter)

app.get('/',(req,res)=> res.send('Hello'))

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>{
  console.log(`http://localhost:${port}`);
})