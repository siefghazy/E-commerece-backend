import joi from "joi";
export const addsubCategorySchema=joi.object({
    body:{
        name:joi.string().max(30).min(1).trim().required(),
        category:joi.string().hex().length(24),
        subCatImage:joi.string().hex().length(24)
    }
})
export const updateSubCatSchema=joi.object({
    body:{
        name:joi.string().max(30).min(1).trim().required(),
        category:joi.string().hex().length(24),
        subCatImage:joi.string().hex().length(24)
    }
})