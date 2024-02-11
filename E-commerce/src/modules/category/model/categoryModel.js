import mongoose from "mongoose"
import slugify from "slugify"
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
export const categoryModel= mongoose.model('category',categorySchema)

