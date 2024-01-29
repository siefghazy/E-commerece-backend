import mongoose from "mongoose"
const imageSchema= new mongoose.Schema({
    name:String,
    path:String
})
export const imageModel=mongoose.model('image',imageSchema)