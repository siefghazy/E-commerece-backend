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
export const productRouter=Router()
productRouter.route('/')
.post(validate(addProductSchema),attachAddQuery(productModel),queryExecution())
.get(attachFindQuery(productModel),populateQuery('subcategory'),pagination(2),sorting(),fieldSelection(),queryExecution())
productRouter.route('/:productSlug')
.delete(attachDeleteQuery(productModel),filterQuery({fieldName:'slug',paramName:'productSlug'}),queryExecution())
.put(validate(updateProductSchema),attachUpdateQuery(productModel),filterQuery({fieldName:'slug',paramName:'productSlug'}),queryExecution())
productRouter.route('/search')
.get(attachFindQuery(productModel),search(['title','description']),populateQuery('category'),pagination(2),queryExecution())
productRouter.route('/fitler')
.get(attachFindQuery(productModel),filter(),populateQuery('category'),pagination(2),queryExecution())
productRouter.route('/fieldselection')
.get(attachFindQuery(productModel),fieldSelection(),populateQuery('category'),pagination(2),queryExecution())
productRouter.route('/sort')
.get(attachFindQuery(productModel),sorting(),populateQuery('category'),pagination(2),queryExecution())
