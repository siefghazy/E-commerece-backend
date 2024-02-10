export const filter=()=>{
    return(req,res,next)=>{
        const filterFields={...req.query}
        const execlusionArray=['page','sort','dir','keywords','fields']
        execlusionArray.forEach((element)=>{
            delete filterFields[element]
        })
        const filterFieldString=JSON.stringify(filterFields)
        const modifiedFilterFieldString=filterFieldString.replace(/lt||lte||gt||gte/g,(match)=>`$${match}`)
        const modifiedFilterFields=JSON.parse(modifiedFilterFieldString)
        req.dbQuery=req.dbQuery.where(modifiedFilterFields)
        next()
    }
}