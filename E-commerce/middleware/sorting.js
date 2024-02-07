export const sorting=()=>{
    return(req,res,next)=>{
        const{sort,dir}=req.query
        req.dbQuery=req.dbQuery.sort({[sort]:dir})
        next()
    }
}