import { catchAsyncError,AppError } from "../../../../utils/asyncErrorHandler.js";
import { couponModel } from "../models/couponModel.js";
import { ApiFeatures } from "../../../../utils/apiFeatures.js";
export const addCoupon=catchAsyncError(async(req,res,next)=>{
    await couponModel.create(req.body)
    res.status(200).json({message:"coupon added"})
})
export const updateCoupon=catchAsyncError(async(req,res,next)=>{
    const{id}=req.params
    await couponModel.findByIdAndUpdate(id,req.body)
    res.status(200).json({message:"coupon updated"})
})
export const deleteCoupon=catchAsyncError(async(req,res,next)=>{
    const{id}=req.params
    await couponModel.findByIdAndDelete(id)
    res.status(200).json({message:"coupon deleted"})
})
export const getCoupons=catchAsyncError(async(req,res,next)=>{
    const feature=new ApiFeatures(couponModel.find(),req.query).paginate(2)
    const data=await feature.query
    res.status(200).json(data)
})
export const getCoupon=catchAsyncError(async(req,res,next)=>{
    const{id}=req.params
    const data= await couponModel.findById(id)
    res.status(200).json(data)
})