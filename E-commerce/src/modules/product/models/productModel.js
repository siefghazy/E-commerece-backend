import mongoose from "mongoose";
import slugify from "slugify";
import { imageModel } from "../../../../imageModel.js";
const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        min:1,
        max:30
    },
    slug:{
        type:String,
        unique:true,
        min:1,
    },
    description:{
        type:String,
    },
    stock:{
        type:Number,
        required:true,
    },
    features:[
        {
            key:{
                type:String,
                min:1,
                max:30
            },
            value:{
                type:String,
                min:1,
                max:30
            }
        }
    ],
    price:{
        type:Number,
        required:true
    },
    discountedPrice:{
        type:Number,
    },
    discountVal:{
        type:Number,
    },
    coverImage:{
        type:mongoose.Schema.ObjectId,
        ref:'image',
        required:true
    },
    productImages:[
        {
            image:{
                type:mongoose.Schema.ObjectId,
                ref:'image',
            }
        }
    ],
    category:{
        type:mongoose.Schema.ObjectId,
        ref:"category",
       required:true
    },
    subcategory:{
        type:mongoose.Schema.ObjectId,
        ref:"subcategory",
    }
},{timestamps:true})
productSchema.pre('save',function(next){
    this.slug=slugify(this.title)
    if(this.discountedPrice){
    this.discountVal=this.price-this.discountedPrice
    }
    next()
})
productSchema.pre(/find/i,function(next){
    this.populate('subcategory')
    next()
})
productSchema.pre(/delete/i,async function(next){
    const productToBeDeleted =await productModel.findOne(this._conditions)
    const images=productToBeDeleted.productImages
    await imageModel.findByIdAndDelete(productToBeDeleted.coverImage)
    for(const image of images){
        const{image:_id}=image
        await imageModel.findByIdAndDelete(_id)
    }
    next()
})

export const productModel=mongoose.model('product',productSchema)
