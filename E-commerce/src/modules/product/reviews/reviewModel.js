import mongoose from "mongoose";
const reviewSchema=new mongoose.Schema({
    text:{
        type:String,
        minLength:3,
        maxLength:3000,
        required:true,
        trim:true
    },
    rating:{
        type:Number,
        required:true,
        enum:[1,2,3,4,5]
    },
    productID:{
        type:mongoose.Schema.ObjectId,
        ref:'product',
        required:true
    },
    userID:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:true
    }
},{timestamps:true})
export const reviewModel=mongoose.model('review',reviewSchema)