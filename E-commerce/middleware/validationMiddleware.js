import {AppError} from '../../E-commerce/utils/asyncErrorHandler.js'
export const validate=(schema)=>{
    return(req,res,next)=>{
    const{error}=schema.validate({
        body:req.body,
        file:req.file
    },{abortEarly: false})
    if(error){
        throw new AppError(error,400)
    }
    next()
}}
