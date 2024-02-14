import { productModel } from "../models/productModel.js";
import { imageModel } from "../../../../imageModel.js";
import {v2 as cloudinary} from 'cloudinary';
import { catchAsyncError } from "../../../../utils/asyncErrorHandler.js";
export const productImageUploader=()=>{
    return catchAsyncError(async(req,res,next)=>{
        let array=[]
       for(const image of req.files.cover_image){
        const{path}= image
        const{public_id,secure_url}=await cloudinary.uploader.upload(path)
        const{_id}=await imageModel.create({image_name:public_id,path:secure_url})
        req.body['coverImage']=_id
       }
       for(const image of req.files.image){
        const{path}= image
        const{public_id,secure_url}=await cloudinary.uploader.upload(path)
        const{_id}=await imageModel.create({image_name:public_id,path:secure_url})
        array.push(_id)
       }
       const modifiedArray=array.map(Element=>{
        return {
            image:Element
        }
       })
       req.body.productImages=modifiedArray
       next()
    })
}
