import { catchAsyncError } from "../../../../utils/asyncErrorHandler.js"
import { categoryModel } from "../../category/model/categoryModel.js"
export const attachCategory=()=>{
    return catchAsyncError(async(req,res,next)=>{
        const{category_name}=req.query
        const{_id}=await categoryModel.findOne({name:category_name})
        req.body['category']=_id
        next()
    })
}