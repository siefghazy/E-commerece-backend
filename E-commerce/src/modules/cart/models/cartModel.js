import mongoose from "mongoose";
const cartSchema=new mongoose.Schema({
    userID:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    },
    ordersOnCart:[
        {
            productID:{
                type:mongoose.Schema.ObjectId,
                ref:'product',
                required:true,
                unique:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ],
},{timestamps:true})
export const cartModel=mongoose.model('cart',cartSchema)