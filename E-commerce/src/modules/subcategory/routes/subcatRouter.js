import { Router } from "express";
import { attachAddQuery,
    attachDeleteQuery,
    attachFindQuery,
    attachUpdateQuery } from '../../../../middleware/attachedQuery.js'
import { queryExecution } from '../../../../middleware/execQuery.js'
import {validate} from'../../../../middleware/validationMiddleware.js'
import { subCatModel } from "../model/subCatModel.js";
import { addsubCategorySchema,updateSubCatSchema } from "../../../../validations/subcateValidation.js";
import {subcatFilter}from'../middlware/subcatMiddleware.js'
import { addSubCategory } from "../middlware/subcatMiddleware.js";
export const subCatRouter=Router({mergeParams:true})
subCatRouter.route('/')
.get(attachFindQuery(subCatModel),queryExecution())
.post(validate(addsubCategorySchema),attachAddQuery(subCatModel),queryExecution())
subCatRouter.route('/:subcategorySlug')
.post(validate(addsubCategorySchema),addSubCategory,queryExecution())
.get(attachFindQuery(subCatModel),subcatFilter,queryExecution())
.put(validate(updateSubCatSchema),attachUpdateQuery(subCatModel),subcatFilter,queryExecution())
.delete(attachDeleteQuery(subCatModel),subcatFilter,queryExecution())
