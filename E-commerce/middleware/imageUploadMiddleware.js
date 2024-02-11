import {v2 as cloudinary} from 'cloudinary';
import { catchAsyncError } from '../utils/asyncErrorHandler.js';
import { imageModel } from '../imageModel.js';
export const upload=({modelImage})=>{
    return catchAsyncError(async(req,res,next)=>{
        if(!req.file)return next()
        const{path}=req.file
        const{public_id,secure_url}=await cloudinary.uploader.upload(path);
        const{_id:image_ID}=await imageModel.create({image_name:public_id,path:secure_url})
        req.body[modelImage]=image_ID
        next()
    })
}
export const deleteImage=()=>{
    return catchAsyncError(async (req,res,next)=>{
        const{image_name}=req.body
        await cloudinary.uploader.destroy(image_name)
        await imageModel.findOneAndDelete({image_name})
        next()
    })
}
