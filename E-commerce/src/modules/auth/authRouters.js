import { Router } from "express";
import { signinScehma,signUpSchema } from "../../../validations/userValidation.js";
import { validate } from "../../../middleware/validationMiddleware.js";
import { signIn,signUp } from "./auth.js";
import { confirmEmail } from "../../../middleware/confirmEmail.js";
export const authRouter=Router()
authRouter.route('/signup')
.post(validate(signUpSchema),signUp)
authRouter.route('/signin').
get(validate(signinScehma),signIn)
authRouter.route('/confirmemail/:token')
.get(confirmEmail)
