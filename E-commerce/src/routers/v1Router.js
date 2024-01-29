import  {Router} from "express";
import { couponRouter } from "../modules/coupon/routes/couponRouters.js";
import { productRouter } from "../modules/product/routes/productRouter.js";
import { categoryRouter } from "../modules/category/routes/categoryRouter.js";
import { subCatRouter } from "../modules/subcategory/routes/subcatRouter.js";
import { cartRouter } from "../modules/cart/routes/cartRouter.js";
import { userRouter } from "../modules/user/routes/userRouter.js";
import { orderRouter } from "../modules/order/routes/ordersRouter.js";
import brandRouter from "../modules/brand/routes/brandRouter.js";
const v1Router=Router()
v1Router.use('/brand',brandRouter)
v1Router.use('/coupon',couponRouter)
v1Router.use('/product',productRouter)
v1Router.use('/category',categoryRouter)
v1Router.use('/subcategory',subCatRouter)
v1Router.use('/cart',cartRouter)
v1Router.use('/user',userRouter)
v1Router.use('/order',orderRouter)
export default v1Router