import {Router} from'express'
import {validate} from'../../../../middleware/validationMiddleware.js'
import { updateUserSchema } from '../../../../validations/userValidation.js'
import { auth } from "../../../../middleware/auth.js";
import { authorization } from "../../../../middleware/authorization.js";
import { getAlluser,getUser,updateUser,deleteUser } from '../controller/userController.js';
import { getWishlist,updateWishlist } from '../controller/wishlistController.js';
import { updateWishlistSchema } from '../../../../validations/wishlistValidation.js';
export const userRouter=Router()
userRouter.route('/')
.get(auth,getUser)
.delete(auth,deleteUser)
.put(auth,validate(updateUserSchema),updateUser)
userRouter.route('/all')
.get(auth,authorization,getAlluser)
userRouter
	.route('/wishlist')
	.get(auth, getWishlist)
	.put(
		auth,
		validate(updateWishlistSchema),
		updateWishlist
	)
