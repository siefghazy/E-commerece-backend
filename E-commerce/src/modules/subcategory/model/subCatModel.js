import mongoose from "mongoose"
import slugify from "slugify"
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
        ref:'image'
    }
})
subcatSchema.pre('save',function(next){
    this.slug=slugify(this.name)
    next()
})
export const subCatModel=mongoose.model('subcategory',subcatSchema)