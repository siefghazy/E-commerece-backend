import joi from'joi'
export const addCategorySchema=joi.object({
    body:{
        name:joi.string().trim().max(30).min(1).required(),
        categoryImage:joi.string().hex().length(24)
    },
    params:{
        categorySlug:joi.string().required()
    },
    file:joi.object().required()
})
export const updateCategorySchema=joi.object({
    body:{
        name:joi.string().trim().max(30).min(1).required(),
        categoryImage:joi.string().hex().length(24)
    },
    params:{
        categorySlug:joi.string().required()
    },
    file:joi.object()
})
