import jwt from 'jsonwebtoken'
import { AppError, catchAsyncError } from "../../../../utils/asyncErrorHandler.js";
import { cartModel } from '../models/cartModel.js';
import { couponModel } from '../../coupon/models/couponModel.js';
export const addToCart=catchAsyncError(async(req,res,next)=>{
    const token=req.header('token')
    const{_id:userID}=jwt.decode(token)
    const{productID}=req.body
    const cart=await cartModel.findOne({userID})
    const productsOnCart=cart.ordersOnCart.find(
        (entery)=> entery.productID._id.toString()===productID
    )
    if(productsOnCart) {
        productsOnCart.quantity++}
    else{ cart.ordersOnCart.push({productID,quantity:1})}
    await cart.save()
    res.status(200).json({message:"updated"})
})
export const removeFromCart=catchAsyncError(async(req,res,next)=>{
    const token =req.header('token')
    const{_id:userID}=jwt.decode(token)
    const{productID}=req.body
    const cart=await cartModel.findOne({userID})
    const productsOnCart=cart.ordersOnCart.find((product)=>{
        product.productID._id.toString()===productID
    })
    if(productsOnCart) productsOnCart.quantity--
    if(productsOnCart.quantity===0) cart.ordersOnCart.remove(productsOnCart)
    await cart.save()
    res.status(200).json({message:"product deleted from ur cart"})
})
export const assertCart=catchAsyncError(async(req,res,next)=>{
    const token=req.header('token')
    const{_id:userID}=jwt.decode(token)
    const cart=await cartModel.findOne({userID})
    if(cart){
        return next()
    }
    await cartModel.create({userID,ordersOnCart:[]})
    next()
})
export const applyCoupon=catchAsyncError(async(req,res,next)=>{
    const{code}=req.body
    const token=req.header('token')
    const{_id:userID}=jwt.decode(token)
    const cart= await cartModel.findOne({userID})
    if(!code){
        cart.coupon=null
        await cart.save()
        return res.json({message:"no coupon code"})
    }
    const coupon=await couponModel.findOne({code,expiry:{$gte:Date.now()}})
    if(coupon){
        cart.coupon=coupon._id
        await cart.save()
        return res.status(200).json({message:"coupon added succ.."})
    }
    throw new AppError("invalid coupon",400)
})
export const getCart=catchAsyncError(async(req,res,next)=>{
    const token=req.header('token')
    const{_id:userID}=jwt.decode(token)
    const data =await cartModel.findOne({userID})
    res.status(200).json(data)
})
