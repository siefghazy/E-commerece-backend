export const search=(fields)=>{
    return (req,res,next)=>{
        const{keywords}=req.query
        if(!keywords)return next()
        const regexQuery={
    $or:fields.map((field)=>{
        return {
            [field]:new RegExp(keywords,'i')
        }
    })
    }
        req.dbQuery=req.dbQuery.find(regexQuery)
        next()
    }
}