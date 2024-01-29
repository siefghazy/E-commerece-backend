import {AppError,catchAsyncError} from'../utils/asyncErrorHandler.js'
export const queryExecution = ({ status = 200 } = {}) => {
	return catchAsyncError(async (req, res, next) => {
		const message = await req.query
		res.status(status).json({ message })
	})
}
