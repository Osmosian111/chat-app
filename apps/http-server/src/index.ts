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
import { prismaClient } from "@repo/db/client";
import { RequestWithUserId } from "@repo/backend-common/interfaces";

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.send({ msg: parsedData.error.issues });
    return;
  }

  try {
    await prismaClient.user.create({
      data: {
        email: parsedData.data.email,
        password: parsedData.data.password,
        name: parsedData.data.name,
      },
    });

    res.json({ msg: "New User Created" });
    return;
  } catch (error) {
    res.json({
      msg: "User already exist",
    });
  }
});

app.post("/signin", async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.send({ msg: parsedData.error.issues });
    return;
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.email,
      password: parsedData.data.password,
    },
  });
  if (!user) {
    res.send({
      msg: "User does not exist",
    });
    return;
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  res.send({ token });
});

app.post("/room", auth, async (req: RequestWithUserId, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.send({ msg: parsedData.error.issues });
    return;
  }

  const userId = req.userId;
  if (!userId) return;

  try {
    await prismaClient.room.create({
      data: {
        adminId: userId,
        slug: parsedData.data.name,
      },
    });
    res.send({
      msg: "Room Created",
    });
  } catch (error) {
    res.send({
      msg:"Room already exit"
    })
  }
});

app.listen(PORT);
