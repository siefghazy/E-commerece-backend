import { Router } from "express";
import { attachAddQuery,attachDeleteQuery,attachFindQuery,attachUpdateQuery } from '../../../../middleware/attachedQuery.js'
import { filterQuery } from '../../../../middleware/filterQuery.js'
import { queryExecution } from '../../../../middleware/execQuery.js'
import {validate} from'../../../../middleware/validationMiddleware.js'
import { addProductSchema,updateProductSchema } from "../../../../validations/productValidation.js";
import { productModel } from "../models/productModel.js";
import { pagination } from "../../../../middleware/pagination.js";
import { populateQuery } from "../../../../middleware/populateMiddleware.js";
import { sorting } from "../../../../middleware/sorting.js";
import { fieldSelection } from "../../../../middleware/fieldSelectionMiddleware.js";
import { search } from "../../../../middleware/searchMiddleware.js";
import { filter } from "../../../../middleware/filterMiddlewarae.js";
import { file } from "../../../../middleware/multermiddleware.js";
import { attachCategory } from "../middlewares/categoryAttachToProduct.js";
import { productImageUploader } from "../middlewares/productImageMiddleware.js";
export const productRouter=Router()
productRouter.route('/')
.post(file.fields([{name:'cover_image',maxCount:1},{name:'image',maxCount:3}]),validate(addProductSchema),productImageUploader(),attachCategory(),attachAddQuery(productModel),queryExecution())
.get(attachFindQuery(productModel),populateQuery('category'),pagination(2),queryExecution())
productRouter.route('/:productSlug')
.delete(attachDeleteQuery(productModel),filterQuery({fieldName:'slug',paramName:'productSlug'}),queryExecution())
.put(file.fields([{name:'coverImages',maxCount:1},{name:'productImages',maxCount:3}]),validate(updateProductSchema),attachUpdateQuery(productModel),filterQuery({fieldName:'slug',paramName:'productSlug'}),queryExecution())
productRouter.route('/search')
.get(attachFindQuery(productModel),search(['title','description']),populateQuery('category'),pagination(2),queryExecution())
productRouter.route('/fitler')
.get(attachFindQuery(productModel),filter(),populateQuery('category'),pagination(2),queryExecution())
productRouter.route('/fieldselection')
.get(attachFindQuery(productModel),fieldSelection(),populateQuery('category'),pagination(2),queryExecution())
productRouter.route('/sort')
.get(attachFindQuery(productModel),sorting(),populateQuery('category'),pagination(2),queryExecution())
