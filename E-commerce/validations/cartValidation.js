import joi from'joi'
export const addCartSchema=joi.object({
    body:{
        userID:joi.string().hex().length(24).required(),
        ordersOncart:joi.array().items(joi.object({
            productID:joi.string().hex().length(24).required(),
            quantity:joi.string().hex().length(24).required()
        }))
    }
})
export const updateCartSchema=joi.object({
    body:{
        userID:joi.string().hex().length(24).required(),
        ordersOncart:joi.array().items(joi.object({
            productID:joi.string().hex().length(24).required(),
            quantity:joi.string().hex().length(24).required()
        }))
    }
})