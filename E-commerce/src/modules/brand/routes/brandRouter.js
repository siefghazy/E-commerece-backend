import {Router} from'express'
import {validate} from'../../../../middleware/validationMiddleware.js'
import {addBrandSchema,updateBrandScehma} from '../../../../validations/brandValidationSchema.js'
import { file } from '../../../../middleware/multermiddleware.js'
import { upload } from '../../../../middleware/imageUploadMiddleware.js'
import { addBrand,getBrands,getBrand,updateBrand,deleteBrand } from '../controller/brandController.js'
import { updateCheck } from '../middleware/checkUpdate.js'
const brandRouter=Router()
brandRouter.route('/')
.post(file.single('image'),validate(addBrandSchema),upload({modelImage:'brandImage'}),addBrand)
.get(getBrands)
brandRouter.route('/:brandSlug')
.get(getBrand)
.put(file.single('image'),validate(updateBrandScehma),updateCheck,upload({modelImage:'brandImage'}),updateBrand)
.delete(deleteBrand)
export default brandRouter
