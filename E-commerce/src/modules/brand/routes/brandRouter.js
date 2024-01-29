import {Router} from'express'
import { attachAddQuery,attachDeleteQuery,attachFindQuery,attachUpdateQuery } from '../../../../middleware/attachedQuery.js'
import { filterQuery } from '../../../../middleware/filterQuery.js'
import { queryExecution } from '../../../../middleware/execQuery.js'
import {validate} from'../../../../middleware/validationMiddleware.js'
import {addBrandSchema,updateBrandScehma} from '../../../../validations/brandValidationSchema.js'
import  brandModel  from '../model/brandModel.js'
const brandRouter=Router()
brandRouter.route('/')
.post(validate(addBrandSchema),attachAddQuery(brandModel),queryExecution())
.get(attachFindQuery(brandModel),queryExecution)
brandRouter.route('/:id').put(validate(updateBrandScehma),attachUpdateQuery(brandModel),filterQuery(),queryExecution())
.delete(attachDeleteQuery(brandModel),filterQuery(),queryExecution())
export default brandRouter