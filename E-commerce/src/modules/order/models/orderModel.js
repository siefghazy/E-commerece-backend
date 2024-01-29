import mongoose from "mongoose"
const orderSchema=new mongoose.Schema({
    userID:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        unique:true,
        required:true
    },
    products:
    [
    {
        productID:{
            type:mongoose.Schema.ObjectId,
            ref:'product'
        },
        quantity:{
            type:Number,
            min:1
        }
    }
    ]
})
export const orderModel=mongoose.model('order',orderSchema)