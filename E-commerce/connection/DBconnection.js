import mongoose from "mongoose";
import env from 'dotenv'
env.config()
const con=mongoose.connect(process.env.CONNECTION_STRING).then(()=>{console.log("Data base connected..GG")})
export default con