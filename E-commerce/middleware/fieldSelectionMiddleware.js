export const fieldSelection=()=>{
    return(req,res,next)=>{
        const{fields}=req.query
        req.dbQuery=req.dbQuery.select(fields.split(' '))
        next()
    }
}