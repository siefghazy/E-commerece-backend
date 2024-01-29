import mongoose from "mongoose";
const couponSchema=new mongoose.Schema({
    code:{
        type:String,
        unique:true,
        required:true
    },
    expiry:{
        type:Date,
        required:true
    },
    discount:{
        type:Number,
        required:true
    }
},{timestamps:true})
export const couponModel=mongoose.model('coupon',couponSchema)