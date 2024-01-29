import { Router } from "express";
import { attachAddQuery,
    attachDeleteQuery,
    attachFindQuery,
    attachUpdateQuery } from '../../../../middleware/attachedQuery.js'
import { filterQuery } from '../../../../middleware/filterQuery.js'
import { queryExecution } from '../../../../middleware/execQuery.js'
import {validate} from'../../../../middleware/validationMiddleware.js'
import { addCategorySchema,updateCategorySchema } from "../../../../validations/categoryValidation.js";
import { categoryModel } from "../model/categoryModel.js";
export const categoryRouter=Router()
categoryRouter.route('/')
.post(validate(addCategorySchema),attachAddQuery(categoryModel),queryExecution())
.get(attachAddQuery(categoryModel),queryExecution())
categoryRouter.route('/:id')
.delete(attachDeleteQuery(categoryModel),queryExecution())
.put(validate(updateCategorySchema),attachUpdateQuery(categoryModel),filterQuery(),queryExecution())