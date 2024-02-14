import mongoose from "mongoose"
import slugify from "slugify"
import { imageModel } from "../../../../imageModel.js"
const brandSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    brandImage:{
        type:mongoose.Schema.ObjectId,
        ref:'image',
        unique:true
    },
    slug:{
        type:String,
        unique:true,
    }
})
brandSchema.pre('save',function(next){
    this.slug=slugify(this.title)
    next()
})
brandSchema.pre(/update/i,async function(next){
    if(this._update.title){
        this._update.slug=slugify(this._update.title)
    }
    if(this._update.brandImage){
        const brandImageToBeDeleted=await brandModel.findOne(this._conditions)
        await imageModel.findByIdAndDelete(brandImageToBeDeleted.brandImage)
    }
    next()
})
brandSchema.pre(/delete/i,async function(next){
    const brandImageToBeDeleted=await brandModel.findOne(this._conditions)
    await imageModel.findByIdAndDelete(brandImageToBeDeleted.brandImage)
})
 const brandModel=mongoose.model('brand',brandSchema)
 export default brandModel
