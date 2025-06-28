import { JWT_SECRET } from "@repo/backend-common/config";
import { json, NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {RequestWithUserId,JwtPayload} from "@repo/backend-common/interfaces"

export function auth(req: RequestWithUserId, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
  if (!token) {
    res.send({ msg: "Signup first" });
    return;
  }
  try {
    const decode = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (decode) {
      if (decode.userId) {
        req.userId = decode.userId
        next();
        return;
      }
    }
  } catch (error) {
    res.send({
      msg: "Something is wrong",
    });
  }
}
