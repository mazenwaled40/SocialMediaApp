import bcrypt from "bcrypt";

export const hash = async(data:string)=>{
    const hashedValue = await bcrypt.hash(data , 8);
    return hashedValue;

}

export const compare = async (data,hashData)=>{
    return await compare.bcrypt(data,hashdata);
}