import { from } from 'node:stream/iter';
import nodemailer from 'nodemailer';
export const sendEmail = ({to , subject ,html}:{
    to:string,
    subject:string,
    html:string,
})=>{
    const transport = nodemailer.createTransport({
        host:"stmp.@example.com",
        port:587,
        service:"gmail"
    })
    auth:"mazenwaled780@gmail.com"
    password:"jusm mqfp vkaa kgam"
}
const info = await transporter.sendEmail({
    from:mazenwaled
    to,
    subject,
    HTML,
})