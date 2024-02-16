import { catchAsyncError,AppError } from "../../../../utils/asyncErrorHandler.js";
import { userModel } from "../model/userModel.js";
import { ApiFeatures } from "../../../../utils/apiFeatures.js";
import  jwt  from "jsonwebtoken";
export const getUser=catchAsyncError(async(req,res,next)=>{
    const token=req.header('token')
    const {_id}=jwt.decode(token)
    const data= await userModel.findById(_id)
    res.status(200).json(data)
})
export const getAlluser=catchAsyncError(async(req,res,next)=>{
    const features=new ApiFeatures(userModel.find(),req.query).paginate(2)
    const data = await features.query
    res.status(200).json(data)
})
export const updateUser=catchAsyncError(async(req,res,next)=>{
    const token=req.header('token')
    const {_id}=jwt.decode(token)
    await userModel.findByIdAndUpdate(_id,req.body)
    res.status(200).json({message:"user updated"})
})
export const deleteUser=catchAsyncError(async(req,res,next)=>{
    const token=req.header('token')
    const {_id}=jwt.decode(token)
    await userModel.findByIdAndDelete(_id,req.body)
    res.status(200).json({message:"user deleted"})
})
