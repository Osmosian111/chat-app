require("dotenv").config();

import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { auth } from "./middleware";
import {
  CreateRoomSchema,
  CreateUserSchema,
  SigninSchema,
} from "@repo/common/types";

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/signup", (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.send({ msg: parsedData.error.issues });
    return;
  }
  res.json({ msg: "signup" });
});

app.post("/signin", (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.send({ msg: parsedData.error.issues });
    return;
  }
  const userId = 1;
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.json({ token });
});

app.post("/room", auth, (req, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.send({ msg: parsedData.error.issues });
    return;
  }
  res.json({ msg: "room" });
});

app.listen(PORT);
