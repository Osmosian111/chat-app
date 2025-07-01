import { Request } from "express";

export type JwtPayload = {
  userId?: string;
};

export interface NewRequest extends Request {
    userId?:string,
    token?:string
}
