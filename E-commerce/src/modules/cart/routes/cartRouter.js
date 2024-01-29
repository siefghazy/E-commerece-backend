import {Router} from'express'
import { attachAddQuery
    ,attachDeleteQuery
    ,attachFindQuery
    ,attachUpdateQuery } from '../../../../middleware/attachedQuery.js'
import { filterQuery } from '../../../../middleware/filterQuery.js'
import { queryExecution } from '../../../../middleware/execQuery.js'
import {validate} from'../../../../middleware/validationMiddleware.js'
import { cartModel } from '../models/cartModel.js'
import { addCartSchema,updateCartSchema } from '../../../../validations/cartValidation.js'
export const cartRouter=Router()
cartRouter.route('/')
.post(validate(addCartSchema),attachAddQuery(cartModel),queryExecution())
.get(attachFindQuery(cartModel),queryExecution())
cartRouter.route('/:id')
.put(validate(updateCartSchema),attachUpdateQuery(cartModel),filterQuery(),queryExecution())
.delete(attachDeleteQuery(cartModel),filterQuery(),queryExecution())