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
import { subCatRouter } from "../../subcategory/routes/subcatRouter.js";
export const categoryRouter=Router()
categoryRouter.route('/')
.post(validate(addCategorySchema),attachAddQuery(categoryModel),queryExecution())
.get(attachFindQuery(categoryModel),queryExecution())
categoryRouter.route('/:categorySlug')
.post(validate(addCategorySchema),attachAddQuery(categoryModel),queryExecution())
.get(attachFindQuery(categoryModel),filterQuery({fieldName:'slug',paramName:'categorySlug'}),queryExecution())
.delete(attachDeleteQuery(categoryModel),filterQuery({fieldName:'slug',paramName:'categorySlug'}),queryExecution())
.put(validate(updateCategorySchema),attachUpdateQuery(categoryModel),filterQuery({fieldName:'slug',paramName:'categorySlug'}),queryExecution())
categoryRouter.use('/:categorySlug/subCategory',subCatRouter)
