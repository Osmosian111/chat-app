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
import {parse, serialize} from "cookie"

import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4000', 
  credentials: true             
}));

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
      msg: "User already exist",exist:true
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

  res.setHeader("Set-Cookie" ,serialize('chat-app-token',token,{
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development',
    path: '/',
    maxAge: 60 * 60 * 24
  }))

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
      msg: "Room already exit",
    });
  }
});

app.get("/chats/:roomId", async (req, res) => {
  const roomId = req.params.roomId;
  const message = await prismaClient.chat.findMany({
    where: {
      roomId: roomId,
    },
    orderBy: {
      id: "desc",
    },
    take: 20,
  });
  res.json({
    message,
  });
});

app.get("/room/:slug", async (req, res) => {
  const slug = req.params.slug;
  const room = await prismaClient.room.findFirst({
    where: {
      slug,
    },
  });
  res.json({
    room,
  });
});

app.listen(PORT);
