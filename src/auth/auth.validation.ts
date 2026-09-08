
import z from 'zod';


    export const signupSchema = {
    body: z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
        phone: z.string().optional(),
        age: z.number().optional(),
        bio: z.string().min(5)
    })
};
export type signupdata = z.infer<typeof signupSchema.body>;


export const confirmEmailschema = {
    body: z.object({
        email: z.string().email(), 
        otp: z.string()
    }).strict() 
};
export type confirmEmaildata = z.infer<typeof  confirmEmailschema.body>;



export const loginSchema = {
    body: z.object({
        email: z.string().email(),
        password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%]).*$/) 
    })
}; 

export type logindata = z.infer<typeof loginSchema.body>; 



export const resendConfirmEmailKeySchema = {
    body:z.strictObject({
        email:z.string(),
         password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%]).*$/) 
    })
    

};
export type resendConfirmEmailKeydata = z.infer<typeof resendConfirmEmailKeySchema.body>
