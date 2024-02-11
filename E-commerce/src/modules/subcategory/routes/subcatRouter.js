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
import { file } from "../../../../middleware/multermiddleware.js";
import { upload } from "../../../../middleware/imageUploadMiddleware.js";
export const subCatRouter=Router({mergeParams:true})
subCatRouter.route('/')
.get(attachFindQuery(subCatModel),queryExecution())
subCatRouter.route('/:subcategorySlug')
.post(file,validate(addsubCategorySchema),upload({modelImage:'subCatImage'}),addSubCategory,queryExecution())
.get(attachFindQuery(subCatModel),subcatFilter,queryExecution())
.put(file,validate(updateSubCatSchema),upload({modelImage:'subCatImage'}),attachUpdateQuery(subCatModel),subcatFilter,queryExecution())
.delete(attachDeleteQuery(subCatModel),subcatFilter,queryExecution())
