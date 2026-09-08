



import { Router } from 'express';
import { validation } from '../middlewares/validation.middleware';
import * as AuthValidation  from './auth.validation';
import { authservice } from './auth.service';
const router = Router();


export const Routes={
    base:"/auth",
    signUp:"/signup",
    login:"/login",
    confirmEmailKey:"/confirmEmail"

router.post(Routes.signUp, validation(AuthValidation.signupSchema), async (req, res) => {
    return res.status(201).json({ message: "User registered successfully" });
});

router.patch(Routes.confirmEmailKey, validation(AuthValidation.confirmEmailSchema), async (req, res) => {
    const body = req.body as AuthValidation.confirmEmailData;
    await authServices.confirmEmail(body);
    return res.status(200).json({ message: "Email confirmed successfully" });
});

router.post(Routes.login, validation(AuthValidation.loginSchema), async (req, res) => {
    const body = req.body as AuthValidation.loginData;
    const { data } = await authServices.login(body);
    return res.status(200).json({ message: "Login successful", data });
});

router.patch(Routes.resendConfirmEmailOtp, validation(AuthValidation.confirmEmailSchema), async (req, res) => {
    const body = req.body as AuthValidation.resendConfirmEmailData;
    await authServices.resentOtp(body);
    return res.status(200).json({ message: "OTP resent successfully" });
});

export default router;