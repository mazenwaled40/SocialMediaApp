export const confirmEmailKey = (userId:string)=> `user:${userId}:confirmEmailotp`

export const resendConfirmEmailOtp = (userId: string) => `user:${userId}:resendConfirmEmailotp`;