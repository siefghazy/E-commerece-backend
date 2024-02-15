import { Router } from "express";
import { addReviewSchema,updateReviewSchema } from "../../../../validations/reviewValidation.js";
import { validate } from "../../../../middleware/validationMiddleware.js";
import { auth } from "../../../../middleware/auth.js";
import { addReview,getReviews } from "./reviewController.js";
export const reviewRouter=Router({mergeParams:true})
reviewRouter.route('/')
.post(auth,validate(addReviewSchema),addReview)
.get(auth,getReviews)
.put(auth,validate(updateReviewSchema),updateReview)
.delete(auth,deleteReview)

