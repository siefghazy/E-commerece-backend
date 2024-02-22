import joi from 'joi'
export const addOrderSchema=joi.object({
    body:{
        phoneNumber:joi.string().required().pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/),
        address:joi.string()
    },
    params:{}
})
