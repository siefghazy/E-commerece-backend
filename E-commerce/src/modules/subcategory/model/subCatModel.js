import mongoose from "mongoose"
import slugify from "slugify"
import { imageModel } from "../../../../imageModel.js"
const subcatSchema=new mongoose.Schema({
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'category',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        unique:true
    },
    subCatImage:{
        type:mongoose.Schema.ObjectId,
        ref:'image',
        required:true
    }
})
subcatSchema.pre('save',function(next){
    this.slug=slugify(this.name)
    next()
})
subcatSchema.pre(/delete/i,async function(next){
    const subCatToBeDeleted=await subCatModel.findOne(this._conditions)
    await imageModel.findByIdAndDelete(subCatToBeDeleted.subCatImage)
    next()
})
subcatSchema.pre(/find/i,function(next){
    this.populate('category')
    next()
})
export const subCatModel=mongoose.model('subcategory',subcatSchema)
