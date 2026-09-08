import { customAlphabet } from "nanoid";

export const createOtp = customAlphabet("0123456789", 5);