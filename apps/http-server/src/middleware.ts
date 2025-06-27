import { JWT_SECRET } from "@repo/backend-common/config";
import { json, NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
  if (!token) {
    res.send({ msg: "Signup first" });
    return;
  }
  try {
    const decode = jwt.verify(token, JWT_SECRET);
    if (decode) {
      next();
      return;
    }
  } catch (error) {
    res.send({
      msg: "Something is wrong",
    });
  }
}
