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
import { NewRequest } from "@repo/backend-common/interfaces";
import { serialize } from "cookie";

import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);

app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.send({ msg: parsedData.error.issues,Success:false });
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

    res.json({ msg: "New User Created", Success: true });
    return;
  } catch (error) {
    res.json({
      msg: "User already exist",
      exist: true,
      Success: false,
    });
  }
});

app.post("/signin", async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({ msg: parsedData.error.issues,Success:false });
    return;
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.email,
      password: parsedData.data.password,
    },
  });
  if (!user) {
    res.json({
      msg: "User does not exist",Success:false
    });
    return;
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);

  res.setHeader(
    "Set-Cookie",
    serialize("chat-app-token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    })
  );

  res.send({ Success: true });
});

app.use(auth);

app.post("/room", async (req: NewRequest, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({ msg: parsedData.error.issues ,Success:false});
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
    res.json({
      msg: "Room Created",Success:true
    });
  } catch (error) {
    res.json({
      msg: "Room already exit",Success:false
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
  if (!message.length) {
    res.json({ msg: "empty" });
    return;
  }
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
  if (!room) {
    res.json({
      msg: "No room found",
    });
    return;
  }
  res.json({
    room,
  });
});

app.get("/fatchtoken", (req: NewRequest, res) => {
  const token = req.token;
  if (!token) {
    res.json({
      msg: "Something is wrong",
    });
    return;
  }
  res.json({ token });
});

app.listen(PORT);
