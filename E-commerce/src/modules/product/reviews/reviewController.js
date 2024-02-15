import { catchAsyncError,AppError } from "../../../../utils/asyncErrorHandler.js";
import { productModel } from "../models/productModel.js";
import { reviewModel } from "./reviewModel.js";
import { ApiFeatures } from "../../../../utils/apiFeatures.js";
import jwt from 'jsonwebtoken'
export const addReview=catchAsyncError(async (req,res,next)=>{
    const{productSlug}=req.params
    const{text,rating}=req.body
    const token =req.header('token')
    const{_id:userID}=jwt.decode(token)
    const{_id:productID}=await productModel.findOne({slug:productSlug})
    await reviewModel.create({text,rating,userID,productID})
    res.status(200).json({message:"review added succ.."})
})
export const getReviews=catchAsyncError(async(req,res,next)=>{
    const{productSlug}=req.params
    const{_id:productID}=await productModel.findOne({slug:productSlug})
    const features= new ApiFeatures(reviewModel.find().where({productID}),req.query).paginate(2)
    const data= await features.query
    res.status(200).json(data)
})
export const updateReview=catchAsyncError(async(req,res,next)=>{
    const{productSlug}=req.params
    const token=req.header('token')
    const{_id:userID}=jwt.decode(token)
    const{_id:productID}=await productModel.findOne({slug:productSlug})
    await reviewModel.findOneAndUpdate({userID,productID},req.body)
    res.status(200).json({message:"data updated succ.."})
})
export const deleteReview=catchAsyncError(async(req,res,next)=>{
    const token=req.header('token')
    const{_id:userID}=jwt.decode(token)
    const{productSlug}=req.params
    const{_id:productID}=await productModel.findOne({slug:productSlug})
    await reviewModel.findOneAndDelete({userID,productID})
    res.status(200).json({message:"review deleted"})
})
