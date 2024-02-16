import {Router} from'express'
import {validate} from'../../../../middleware/validationMiddleware.js'
import { addCartSchema } from '../../../../validations/cartValidation.js'
import { auth } from "../../../../middleware/auth.js";
import { getCart,assertCart,removeFromCart,addToCart,applyCoupon } from '../controllers/cartController.js';
export const cartRouter=Router()
cartRouter.route('/')
.get(auth,assertCart,getCart)
cartRouter.route('/add')
.post(auth,validate(addCartSchema),assertCart,addToCart)
.put(auth,validate(addCartSchema),assertCart,removeFromCart)
cartRouter.route('/coupon')
.put(auth,assertCart,applyCoupon)
