export class ApiFeatures{
    constructor(query,reqQuery){
        this.query=query
        this.reqQuery=reqQuery
    }
    paginate(pageSize=2){
        const page=this.reqQuery.page
        this.query=this.query.skip((page-1)*pageSize).limit(2)
        return this
    }
    sort(){
        const{sort,dir}=this.reqQuery
        this.query=this.query.sort({[sort]:dir})
        return this
    }
    fieldSelection(){
        const{fields}=this.reqQuery
        req.dbQuery=req.dbQuery.select(fields.split(' '))
        return this
    }
}