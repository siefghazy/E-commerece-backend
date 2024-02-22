import { Router } from "express";
import {validate} from'../../../../middleware/validationMiddleware.js'
import { addCouponScehma,updateCouponScehma } from "../../../../validations/couponValidation.js";
import { addCoupon,getCoupons,deleteCoupon,updateCoupon,getCoupon } from "../controllers/couponController.js";
import { auth } from "../../../../middleware/auth.js";
import { authorization } from "../../../../middleware/authorization.js";
export const couponRouter=Router()
couponRouter.route('/')
.post(auth,authorization,validate(addCouponScehma),addCoupon)
.get(auth,authorization,getCoupons)
couponRouter.route('/:id')
.put(auth,authorization,validate(updateCouponScehma),updateCoupon)
.delete(auth,authorization,deleteCoupon)
.get(auth,authorization,getCoupon)
