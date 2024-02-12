import mongoose from "mongoose"
import { deleteImage } from "./middleware/imageUploadMiddleware.js"
const imageSchema= new mongoose.Schema({
    image_name:String,
    path:String
})
imageSchema.pre(/delete/i,async function(next){
    const imageToBeDeleted=await imageModel.findOne(this._condition)
    await  deleteImage(imageToBeDeleted.image_name)
     next()
})
export const imageModel=mongoose.model('image',imageSchema)
