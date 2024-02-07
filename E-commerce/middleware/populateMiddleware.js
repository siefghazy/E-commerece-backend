export const populateQuery=(fieldName)=>{
    return (req,res,next)=>{
        req.dbQuery=req.dbQuery.populate(fieldName)
        next()
    }
}