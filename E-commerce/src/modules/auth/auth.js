import jwt from 'jsonwebtoken'
import env from "dotenv"
import bcrypt from 'bcrypt'
import { userModel } from '../user/models/userModel.js';
import { catchAsyncError,AppError } from "../../../utils/asyncErrorHandler.js";
env.config()
export const signUp=catchAsyncError(async(req,res,next)=>{
    const{email}=req.body
    const data=await userModel.findOne({email})
    if(!data){
    const{firstname,lastname,email,password,recoveryemail,DOB,mobileNumber,role}=req.body
    const hashedPassword=bcrypt.hashSync(password,parseInt(process.env.SALT_NUMBER))
    await userModel.create({email,password:hashedPassword})
    return res.status(200).json({message:'sign up succ..'})
    }
    throw new AppError('email already exist',400)
})
export const signIn=catchAsyncError(async(req,res,next)=>{
    const{email,password}=req.body
    const data = await userModel.findOne({email})
    if(data&&bcrypt.compareSync(password,data.password)){
        const{_id}=data
        const token=jwt.sign({_id,email,password},process.env.SECRET_KEY)
        return res.status(200).json({message:"login succ..",token})
    }
    throw new AppError('wrong credentials',400)
})
