import {Router} from'express'
import { attachAddQuery
    ,attachDeleteQuery
    ,attachFindQuery
    ,attachUpdateQuery } from '../../../../middleware/attachedQuery.js'
import { filterQuery } from '../../../../middleware/filterQuery.js'
import { queryExecution } from '../../../../middleware/execQuery.js'
import {validate} from'../../../../middleware/validationMiddleware.js'
import { addUserSchema,updateUserSchema } from '../../../../validations/userValidation.js'
import { userModel } from '../model/userModel.js'
export const userRouter=Router()
userRouter.route('/')
.get(attachFindQuery(userModel),queryExecution())
.post(validate(addUserSchema),attachAddQuery(userModel),queryExecution())
userRouter.route('/:id')
.delete(attachDeleteQuery(userModel),filterQuery(),queryExecution())
.put(validate(updateUserSchema),attachUpdateQuery(userModel),filterQuery(),queryExecution())