export const filterQuery=({fieldName,paramName})=>{
    return(req,res,next)=>{
        req.dbQuery=req.dbQuery.where({ [fieldName]:req.params[paramName] })
        next()
    }
}
