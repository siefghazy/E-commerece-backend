import { Router } from "express";
import { attachAddQuery,attachDeleteQuery,attachFindQuery,attachUpdateQuery } from '../../../../middleware/attachedQuery.js'
import { filterQuery } from '../../../../middleware/filterQuery.js'
import { queryExecution } from '../../../../middleware/execQuery.js'
import {validate} from'../../../../middleware/validationMiddleware.js'
import { addProductSchema,updateProductSchema } from "../../../../validations/productValidation.js";
import { productModel } from "../models/productModel.js";
export const productRouter=Router()
productRouter.route('/')
.post(validate(addProductSchema),attachAddQuery(productModel),queryExecution())
.get(attachFindQuery(productModel),queryExecution())
productRouter.route('/:id')
.delete(attachDeleteQuery(productModel),filterQuery(),queryExecution())
.put(validate(updateProductSchema),attachUpdateQuery(productModel),filterQuery(),queryExecution())