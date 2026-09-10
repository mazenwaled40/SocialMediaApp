import { Request, Response, NextFunction } from "express";
import { userModel } from "../user/models/user.model";
import { IUser } from "../user/types/user.types";; // استورد الـ Interface بتاع اليوزر عندك

import jwt from "jsonwebtoken";

export const decodeToken = async (authorization:string) => {
  // تشيك: هل التوكن بادئ بكلمة Bearer؟
  if (!authorization.startsWith("Bearer")) {
    throw new Error("InValidAuthintication");
  }

  // قص الكلمة الزيادة واطلع بالتوكن الصافي
  const token = authorization.split(" ")[1];
  if (!token) {
    throw new Error("In_Valid authintication");
  }

  // فك التشفير بتاع التوكن بمفتاح السيرفر
  const payload = jwt.verify(token, process.env.ENC_KEY!);
  // استخراج الـ ID اللي كنا دافنينه جوه التوكن
  const userId = payload.id;

  // روح هات اليوزر ده من الداتا بيز بالـ ID بتاعه
  const User = await userModel.findById(userId);
  if (!User) {
    throw new Error("user not found");
  }

  // رجّع اليوزر النضيف اللي لقيناه
  return { User };
};

export const middleware = async (req:Request, res:Response, next:NextFunction) => {
  // لقط التوكن اللي جاي في الـ headers من بره
  const authorization = req.headers.authorization;
  // ابعته للدالة اللي فوق واستناها تفك شفرته وتجيب اليوزر
  const { User } = await decodeToken(authorization:string);
  // احقن اليوزر جوه الـ req عشان الكل يشوفه بعد كدا
  req.User = User;
  // اديله الضوء الأخضر يعدي للمرحلة اللي بعدها
  next();
};

export const authorization = (roles = []) => {
  return (req:Request, res:Response, next:NextFunction) => {
    // اطبع الأدوار المسموح ليها تدخل عشان تتأكد منها
    console.log({ roles });
    // عدّي الطلب للخطوة الجاية
    next();
  };
};
