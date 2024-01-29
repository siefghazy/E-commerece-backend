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
        ref:'image'
    }
})
categorySchema.pre('save',function(next){
    this.slug=slugify(this.name)
    next()
})
export const categoryModel= mongoose.model('category',categorySchema)

