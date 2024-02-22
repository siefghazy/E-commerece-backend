import joi from'joi'
export const addCartSchema=joi.object({
    body:{
        productID:joi.string().length(24).hex().required()
    },
    params:{}
})
