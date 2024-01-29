import joi from 'joi'
export const addOrderSchema=joi.object({
    body:{
        userID:joi.string().hex().length(24).required(),
        products:joi.array().items(joi.object({
            proudctID:joi.string().hex().length(24),
            quantity:joi.number().min(1)
        }))
    }
})
export const updateOrderSchema=joi.object({
    body:{
        products:joi.array().items(joi.object({
            proudctID:joi.string().hex().length(24),
            quantity:joi.number().min(1)
        }))
    }
})