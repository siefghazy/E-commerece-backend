import joi from'joi'
export const addBrandSchema=joi.object({
    body:{
        title:joi.string().trim().max(30),
        brandImage:joi.string().hex().length(24)
    }
})
export const updateBrandScehma=joi.object({
    body:{
        title:joi.string().trim().max(30),
        brandImage:joi.string().hex().length(24)
    }
})