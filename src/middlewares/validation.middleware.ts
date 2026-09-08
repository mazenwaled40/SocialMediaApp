import { Request, Response, NextFunction } from 'express'
import z from 'zod';

export type ReqKeys = Partial<keyof Request>
export type schemaType = Partial<Record<ReqKeys, z.ZodObject<any>>>

export const validation = (schema: schemaType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const keys = Object.keys(schema) as ReqKeys[];
        const validationErrors: any = []

        for (const key of keys) {
            const validationRes = await schema[key]?.safeParseAsync(req[key]);
            if (!validationRes?.success) {
                console.log(validationRes?.error.issues);
                validationErrors.push(validationRes?.error.issues) 
            }
        }
        
    
        if (validationErrors.length) {
            return res.status(400).json({ validationErrors })
        } else {
            return next()
        }
    }
}