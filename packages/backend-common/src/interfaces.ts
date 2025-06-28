import { Request } from "express";

export type JwtPayload = {
  userId?: string;
};

export interface RequestWithUserId extends Request {
    userId?:string
}
