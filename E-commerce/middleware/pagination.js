export const pagination=(pageSize=5)=>(req,res,next)=>{
    const page =req.query.page
    if(page<1)page=1
    req.dbQuery=req.dbQuery.skip((page-1)*pageSize).limit(pageSize)
    next()
}