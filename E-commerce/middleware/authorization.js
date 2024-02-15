import { AppError, catchAsyncError } from "../utils/asyncErrorHandler.js";
import { userModel } from "../src/modules/user/model/userModel.js";
import jwt from 'jsonwebtoken'
export const authorization=catchAsyncError(async(req,res,next)=>{
    const token=req.header('token')
    const{_id}=jwt.decode(token)
    const{role}=await userModel.findById(_id)
    if(role=='USER'){
        throw new AppError("not accessible")
    }
    if(role=='ADMIN'){
        next()
    }
}
)