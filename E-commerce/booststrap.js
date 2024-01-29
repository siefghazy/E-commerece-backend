import  Express  from "express";
import env from 'dotenv'
import v1Router from "./src/routers/v1Router.js";
import { AppError } from "./utils/asyncErrorHandler.js";
env.config()
export const bootstrap=(app)=>{
app.use(Express.json())
app.use('/api/v1',v1Router)
app.all('*', (req, res, next) => {
    throw new AppError('Route not found', 404)
})
app.use((err, req, res, next) => {
    const { message, status, stack } = err
    res.status(status || 500).json({
        message,
        ...(process.env.MODE === 'development' && { stack }),
    })
})
app.listen(process.env.PORT_NUMBER,()=>{console.log("server is running")})
}