import { catchAsyncError,AppError } from "../../../../utils/asyncErrorHandler.js";
import jwt from 'jsonwebtoken'
import { reviewModel } from "./reviewModel.js";
import { productModel } from "../models/productModel.js";
export const reviewChecker=catchAsyncError(async(req,res,next)=>{
    const{productSlug}=req.params
    const{_id:productID}=await productModel.findOne({slug:productSlug})
    const token=req.header('token')
    const{_id:userID}=jwt.decode(token)
    const data=await reviewModel.find().where({productID,userID})
    if(data.length>0){
        throw new AppError("u rated this product before",400)
    }
    next()
})