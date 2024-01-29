import { Router } from "express";
import { attachAddQuery,attachDeleteQuery,attachFindQuery,attachUpdateQuery } from '../../../../middleware/attachedQuery.js'
import { filterQuery } from '../../../../middleware/filterQuery.js'
import { queryExecution } from '../../../../middleware/execQuery.js'
import {validate} from'../../../../middleware/validationMiddleware.js'
import { couponModel } from "../models/couponModel.js";
import { addCouponScehma,updateCouponScehma } from "../../../../validations/couponValidation.js";
export const couponRouter=Router()
couponRouter.route('/')
.post(validate(addCouponScehma),attachAddQuery(couponModel),queryExecution())
.get(attachFindQuery(couponModel),queryExecution())
couponRouter.route('/:id').put(validate(updateCouponScehma),attachUpdateQuery(couponModel),filterQuery(),queryExecution())
.delete(attachDeleteQuery(couponModel),filterQuery(),queryExecution())
