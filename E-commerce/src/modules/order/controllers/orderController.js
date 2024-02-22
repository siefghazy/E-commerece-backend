import Stripe from "stripe"
import env from'dotenv'
import jwt from 'jsonwebtoken'
import { catchAsyncError,AppError } from "../../../../utils/asyncErrorHandler.js";
import { ApiFeatures } from "../../../../utils/apiFeatures.js";
import { orderModel } from "../models/orderModel.js";
import { cartModel } from "../../cart/models/cartModel.js";
import { userModel } from "../../user/model/userModel.js";
import { productModel } from "../../product/models/productModel.js";
env.config()
const strip=new Stripe(process.env.STRIPE_SECRET_KEY)
export const getOrders=catchAsyncError(async(req,res,next)=>{
    const token= req.header('token')
    const{_id:userID}=jwt.decode(token)
    const features=new ApiFeatures(orderModel.find({userID}),req.query).paginate(2)
    const data = await features.query
    res.status(200).json(data)
})
export const makeCODorder=catchAsyncError(async(req,res,next)=>{
    const token= req.header('token')
    const{_id:userID}=jwt.decode(token)
    const cart =await cartModel.findOne({userID})
    cart.ordersOnCart.forEach((entery)=>{
        if(entery.productID.stock<entery.quantity) throw new AppError("no stock for the quantity ",400)
    })
    const order=await orderModel.create({
        userID,
        coupon:{
            discount:cart.coupon?.discount||0
        },
        products:cart.ordersOnCart.map(({productID:{title,price,discountPrice},quantity})=>{
            return{
                quantity,
                product:{
                    title,
                    price,
                    discountPrice
                }
            }
        }),
        ...req.body
    })
    const bulkWriteOption=cart.ordersOnCart.map(({productID:{_id},quantity})=>{
        return {
            updateOne:{
                filter:{_id},
                update:{
                    $inc:{
                        stock:-quantity
                    }
                }
            }
        }
    })
    await productModel.bulkWrite(bulkWriteOption)
    res.json({order})
})
export const makePaymentSession=catchAsyncError(async(req,res,next)=>{
    const token= req.header('token')
    const{_id}=jwt.decode(token)
    const cart =await cartModel.findOne({userID:_id})
    const{name,email}=await userModel.findById(_id)
    const session=await strip.checkout.sessions.create({
        line_items:[{
            price_data:{
                currency:'EGP',
                unit_amount:cart.total_price*100,
                product_data:{
                    name
                }
            },
            quantity:1
        }],
        mode:'payment',
        success_url:'https://www.google.com/',
        cancel_url:'https://www.google.com/',
        client_reference_id:cart._id,
        customer_email:email
    })
    res.json({session})
})