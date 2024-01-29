import joi from'joi'
export const addUserSchema=joi.object({
    body:{
        name:joi.string().max(30).min(3).required(),
        password:joi.string().max(100).min(5).required(),
        role:joi.string().required()
    }
})
export const updateUserSchema=joi.object({
    body:{
        name:joi.string().max(30).min(3).required(),
        password:joi.string().max(100).min(5).required(),
        role:joi.string().required()
    }
})