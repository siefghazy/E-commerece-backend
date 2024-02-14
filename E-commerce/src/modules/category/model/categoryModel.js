import mongoose from "mongoose"
import slugify from "slugify"
import { imageModel } from "../../../../imageModel.js"
const categorySchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        unique:true
    },
    categoryImage:{
        type:mongoose.Schema.ObjectId,
        ref:'image',
        required:true
    }
},{timestamps:true})
categorySchema.pre('save',function(next){
    this.slug=slugify(this.name)
    next()
})
categorySchema.pre(/find/,function(next){
    this.populate('categoryImage',['path'])
    next()
})
categorySchema.pre(/delete/i,async function(next){
    const documentToBeDeleted=await categoryModel.findOne(this._conditions)
   await imageModel.findByIdAndDelete(documentToBeDeleted.categoryImage)
   next()
})
categorySchema.pre(/update/i,async function(next){
    if(this._update.categoryImage){
        const documentToBeDeleted=await categoryModel.findOne(this._conditions)
        await imageModel.findByIdAndDelete(documentToBeDeleted.categoryImage)
    }
    next()
})
export const categoryModel= mongoose.model('category',categorySchema)

