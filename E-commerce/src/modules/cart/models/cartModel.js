import mongoose from "mongoose";
const cartSchema=new mongoose.Schema({
    userID:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    },
    ordersOnCart:[
        {
            productID:{
                type:mongoose.Schema.ObjectId,
                ref:'product',
                required:true,
                unique:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ],
    coupon:{
        type:mongoose.Schema.ObjectId,
        ref:'coupon'
    }
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})
cartSchema.pre(/find/i,function(next){
    this.populate({
        path:'ordersOnCart',
        populate:{
            path:'productID',
            model:'product'
        }
    })
    this.populate('coupon')
    next()
})
cartSchema.virtual("totalPrice").get(function(){
    const total=this.ordersOnCart.reduce(
        (acc,entery)=>acc+entery.productID.price*entery.quantity
    ,0)
    return total-((this.coupon?.discount||0)/100)*total
})
export const cartModel=mongoose.model('cart',cartSchema)
