import { catchAsyncError } from '../../../../utils/asyncErrorHandler.js'
import { userModel } from '../model/userModel.js'
import jwt from'jsonwebtoken'

export const getWishlist = catchAsyncError(async (req, res) => {
    const token=req.header('token')
    const{_id}=jwt.decode(token)
	const { wishlist } = await userModel.findById(_id)
	res.json({ wishlist })
})

export const updateWishlist = catchAsyncError(async (req, res) => {
	const { product_id } = req.body
    const token=req.header('token')
    const{_id}=jwt.decode(token)
	const user = await userModel.findById(_id)

	const indexOfProduct = user.wishlist.findIndex(
		({ _id }) => _id.toString() === product_id
	)

	if (indexOfProduct === -1) user.wishlist.push(product_id)
	else user.wishlist.splice(indexOfProduct, 1)

	await user.save()

	res.json({ message: 'Wishlist updated successfully' })
})
