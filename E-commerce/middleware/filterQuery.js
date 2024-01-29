export const filterQuery=()=>{
    return(req,res,next)=>{
        req.query=req.query.where({_id:req.params.id})
        next()
    }
}