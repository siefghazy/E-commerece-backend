import { catchAsyncError } from "../../../../utils/asyncErrorHandler.js";
import { ApiFeatures } from "../../../../utils/apiFeatures.js";
import brandModel from "../model/brandModel.js";
export const addBrand=catchAsyncError(async(req,res,next)=>{
    await brandModel.create(req.body)
    res.status(200).json({message:"brand added succ..."})
})
export const getBrands=catchAsyncError(async(req,res,next)=>{
    const features=new ApiFeatures(brandModel.find(),req.query).paginate(2)
    const brand=await features.query
    res.status(200).json({message:brand})
})
export const getBrand=catchAsyncError(async(req,res,next)=>{
    const{brandSlug}=req.params
    const brand=await brandModel.findOne({slug:brandSlug})
    res.status(200).json({message:brand})
})
export const updateBrand=catchAsyncError(async(req,res,next)=>{
    const{brandSlug}=req.params
    await brandModel.findOneAndUpdate({slug:brandSlug},req.body)
    res.status(200).json({message:"data updated"})
})
export const deleteBrand=catchAsyncError(async(req,res,next)=>{
    const{brandSlug}=req.params
    await brandModel.findOneAndDelete({slug:brandSlug})
    res.status(200).json({message:'data deleted'})
})
