import mongoose from "mongoose"
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        max:30,
        min:1,
        required:true
    },
    password:{
        type:String,
        max:100,
        min:5,
        required:true
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        required:true,
        default:'USER'
    },
    email_verificatiion:{
        type:String,
        enum:['verified','not verified'],
        required:true,
        default:'not verified'
    }
})
export const userModel=mongoose.model('user',userSchema)