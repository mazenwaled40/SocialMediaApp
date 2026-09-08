import jwt from 'jsonwebtoken'

export const generateToken = (payload:string|object , secretkey:jwt.Secret, options:jwt.SignOption) =>{
    const token = jwt.sign(payload , secretkey , options)
    return token;

}

export const verfiyToken = (token:string , secretkey:jwt.Secret , options:jwt.VerifyOptions) =>{
    const payload = jwt.verify(token , secretkey , options)
    return payload
}