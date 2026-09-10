
import { redisclient } from '../db/redis.connection';
import { nanoid } from 'nanoid';
import { compare } from "bcrypt";
import { userModel }from '../user/models/user.model';
import { generateToken } from '../utils/security/token';
import { signupdata,confirmEmaildata,logindata } from './auth.validation'; 
import {createOtp} from '../utils/email/createOtp';
import {sendEmail} from "../utils/email/sendemail"
import { confirmEmailKey, resendConfirmEmailOtp } from "../utils/redis/redis.service";
class Authservice {

    async signup(data: signupdata) {
        const { bio, email, password, name, age, gender, phone } = data;
        
        const isEmailExist = await userModel.findOne({ email });
        
        if (isEmailExist) {
            throw new Error("Email already exists");
        }

        const user = await userModel.create({
            bio,
            email,
            password,
            name,
            age,
            gender,
            phone
        });

        const otp = createOtp();
        sendEmail({ to, subject, html });
        redisclient.set(confirmEmailKey(user.id), otp, {
            EX: 5 * 60
        });

        return { user };
    } 

    async confirmEmail({ email, otp }: confirmEmaildata) {

        const user = await userModel.findOne({
            email,
            confirmedAt: {
                $exists: false
            }
        });

        if (!user) {
    return res.status(400).json({ message: "User not found" }); 
}

const storedOtp = await redisclient.get(confirmEmailKey(user.id));

        if (!storedOtp) {
            throw new Error("otp Expired");
        }

        if (storedOtp !== otp) {
            throw new Error("invalid otp");
        }

        user.confirmedAt = new Date();
        await redisclient.del(confirmEmailKey(user.id));
        await user.save();
    }

    async resendOtp({email} : {email:string}) {
        const user = await userModel.findOne({email})
        if(!user)
            throw new Error('uiuser is already exsist')
        }
        if (user?.confirmedAt){
        throw new Error(" you are already confirmed ")
        }
        const key = confirmEmailKey(userModel._id);
        const oldOtp:string = await redisclient.get(key);
        if (oldOtp){
            const ttl = await redisclient.ttl(this.key)
        throw new Error (`wait ${Math.ceil(ttl/60)} minutes to resend otp`)
        }
        const otp = createOtp();
         async sendEmail({ to, subject, html });
        redisclient.set(confirmEmailKey(user.id), otp, {
            EX: 5 * 60
        });
    



        async login({email , password}: logindata){
    const isEmailExist = await userModel.findOne({email});
    if(!isEmailExist){
        throw new Error("in_credintials");
         }
        if(!isEmailExist.ConfirmedAt){
             throw new Error("email not confirmed");
    }
        if(!await compare (password , isEmailExist.password))
        {//هقارن هنا بين الباص اللي بعتو بلباص الهاش
             throw new Error("in_credintials");
        }
        const jwt = nanoid (20);

        const accesstoken = generateToken(
            {
                id:isEmailExist._id
            },
            process.env.ACCESS_TOKEN_SECRET as string,{
                expireIn:"30 m",
                jwtid:jwt
            }
        )
         const refreshtoken = generateToken(
            {
                id:isEmailExist._id
            },
            process.env.ACCESS_TOKEN_SECRET as string,{
                expireIn:"30 m",
                jwtid:jwt
            }
        )

}

} 

export const authservice = new Authservice();