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
import { auth } from "../../../../middleware/auth.js";
import { authorization } from "../../../../middleware/authorization.js";
export const subCatRouter=Router({mergeParams:true})
subCatRouter.route('/')
.get(attachFindQuery(subCatModel),queryExecution())
subCatRouter.route('/:subcategorySlug')
.post(auth,authorization,file.single('img'),validate(addsubCategorySchema),addSubCategory,upload({modelImage:'subCatImage'}),queryExecution())
.get(attachFindQuery(subCatModel),subcatFilter,queryExecution())
.put(auth,authorization,file.single('img'),validate(updateSubCatSchema),upload({modelImage:'subCatImage'}),attachUpdateQuery(subCatModel),subcatFilter,queryExecution())
.delete(auth,authorization,attachDeleteQuery(subCatModel),subcatFilter,queryExecution())
