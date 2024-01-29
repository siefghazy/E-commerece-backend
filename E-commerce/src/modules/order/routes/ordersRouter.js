import { Router } from "express";
import { attachAddQuery,
    attachDeleteQuery,
    attachFindQuery,
    attachUpdateQuery } from '../../../../middleware/attachedQuery.js'
import { filterQuery } from '../../../../middleware/filterQuery.js'
import { queryExecution } from '../../../../middleware/execQuery.js'
import {validate} from'../../../../middleware/validationMiddleware.js'
import { orderModel } from "../models/orderModel.js";
import { addOrderSchema,updateOrderSchema } from "../../../../validations/orderValidation.js";
export const orderRouter=Router()
orderRouter.route('/')
.post(validate(addOrderSchema),attachAddQuery(orderModel),queryExecution())
.get(attachFindQuery(orderModel),queryExecution())
orderRouter.route('/:id')
.delete(attachDeleteQuery(orderModel),filterQuery(),queryExecution())
.put(validate(updateOrderSchema),attachUpdateQuery(orderModel),filterQuery(),queryExecution())
