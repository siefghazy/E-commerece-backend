import joi from 'joi'
export const addCouponScehma=joi.object({
    body:{
        code:joi.string().required(),
        expiry:joi.date().required(),
        discount:joi.number().required()
    }
})
export const updateCouponScehma=joi.object({
    body:{
        code:joi.string().required(),
        expiry:joi.date().required(),
        discount:joi.number().required()
    }
})