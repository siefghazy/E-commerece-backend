import mongoose from "mongoose"
const brandSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    brandImage:{
        type:mongoose.Schema.ObjectId,
        ref:'image',
        unique:true
    }
})
 const brandModel=mongoose.model('brand',brandSchema)
 export default brandModel