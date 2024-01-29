import { Router } from "express";
import { attachAddQuery,
    attachDeleteQuery,
    attachFindQuery,
    attachUpdateQuery } from '../../../../middleware/attachedQuery.js'
import { filterQuery } from '../../../../middleware/filterQuery.js'
import { queryExecution } from '../../../../middleware/execQuery.js'
import {validate} from'../../../../middleware/validationMiddleware.js'
import { subCatModel } from "../model/subCatModel.js";
import { addsubCategorySchema,updateSubCatSchema } from "../../../../validations/subcateValidation.js";
export const subCatRouter=Router()
subCatRouter.route('/')
.get(attachFindQuery(subCatModel),queryExecution())
.post(validate(addsubCategorySchema),attachAddQuery(subCatModel),queryExecution())
subCatRouter.route('/:id')
.put(validate(updateSubCatSchema),attachUpdateQuery(subCatModel),filterQuery(),queryExecution())
.delete(attachDeleteQuery(subCatModel),filterQuery(),queryExecution())
