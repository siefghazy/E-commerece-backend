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
import { file } from "../../../../middleware/multermiddleware.js";
import { upload } from "../../../../middleware/imageUploadMiddleware.js";
import { deleteImage } from "../../../../middleware/imageUploadMiddleware.js";
export const categoryRouter=Router()
categoryRouter.route('/')
.post(file,validate(addCategorySchema),upload({modelImage:'categoryImage'}),attachAddQuery(categoryModel),queryExecution())
.get(attachFindQuery(categoryModel),queryExecution())
categoryRouter.route('/:categorySlug')
.post(file,validate(addCategorySchema),upload({modelImage:'categoryImage'}),attachAddQuery(categoryModel),queryExecution())
.get(attachFindQuery(categoryModel),filterQuery({fieldName:'slug',paramName:'categorySlug'}),queryExecution())
.delete(attachDeleteQuery(categoryModel),deleteImage(),filterQuery({fieldName:'slug',paramName:'categorySlug'}),queryExecution())
.put(file,validate(updateCategorySchema),upload({modelImage:'categoryImage'}),attachUpdateQuery(categoryModel),filterQuery({fieldName:'slug',paramName:'categorySlug'}),queryExecution())
categoryRouter.use('/:categorySlug/subCategory',subCatRouter)
