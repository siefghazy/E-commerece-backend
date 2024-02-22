import { Router } from "express";
import {validate} from'../../../../middleware/validationMiddleware.js'
import { addOrderSchema } from "../../../../validations/orderValidation.js";
import { auth } from "../../../../middleware/auth.js";
import { getOrders,makeCODorder,makePaymentSession } from "../controllers/orderController.js";
import { assertCart } from "../../cart/controllers/cartController.js";
export const orderRouter=Router()
orderRouter.route('/')
.get(auth,getOrders)
orderRouter.route('/cash')
.post(auth,validate(addOrderSchema),assertCart,makeCODorder)
orderRouter.route('/card')
.post(auth,validate(addOrderSchema),assertCart,makePaymentSession)
