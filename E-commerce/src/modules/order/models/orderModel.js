import mongoose from "mongoose"
const orderSchema=new mongoose.Schema({
    userID:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        unique:true,
        required:true
    },
    products:
    [
    {
        product:{
            title:String,
            price:Number,
        },
        quantity:{
            type:Number,
            required:true
        }
    }
    ],
    coupon:{
        discount:Number
    },
    phoneNumber:String,
    address:String,
    paymentType:{
        type:String,
        enum:['COD','CARD'],
        default:'COD'
    },
    is_delivered:{
        type:Boolean,
        default:false
    },
    is_paid:{
        type:Boolean,
        default:false
    }
},{timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})
orderSchema.virtual('totalPrice').get(function(){
    const total =this.products.reduce((acc,entery)=>{
        return acc+entery.product.price*entery.quantity
    },0)
     return total-((this.coupon?.discount||0)/100)*total
})
export const orderModel=mongoose.model('order',orderSchema)
