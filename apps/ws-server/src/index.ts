require("dotenv").config();

import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

interface User {
  userId: string;
  ws: WebSocket;
  rooms: string;
}

const wss = new WebSocketServer({ port: 8080 });

let users: User[] = [];

function getUserId(token: string) {
  try {
    const decode = jwt.verify(token, JWT_SECRET);
    if (typeof decode === "string") return null;
    if (!decode || !decode.userId) return null;
    return decode.userId;
  } catch (error) {
    return null;
  }
}

wss.on("connection", (ws, request) => {
  const url = request.url;

  if (!url) return;

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token");
  if (!token) {
    ws.send(
      JSON.stringify({
        type: "notify",
        message: "Give token",
      })
    );
    return;
  }

  const userId = getUserId(token);
  if (!userId) {
    ws.send(
      JSON.stringify({
        type: "notify",
        message: "Provide userId",
      })
    );
    return;
  }

  ws.on("message", async (data) => {
    const parsedData = JSON.parse(data.toString());
    console.log(parsedData);
    console.log(users[0]?.userId);
    console.log(users[0]?.rooms);

    if (parsedData.type === "join_room") {
      const userExist = users.find((u) => u.userId === userId);
      if (!userExist) {
        users.push({
          userId,
          ws,
          rooms: parsedData.roomId,
        });
        ws.send(
          JSON.stringify({
            type: "notify",
            message: "Room joined",
          })
        );
        console.log({
          type: "notify",
          message: "Room joined",
        });
        return;
      }
      ws.send(
        JSON.stringify({
          type: "notify",
          message: "Already in a room",
        })
      );
      console.log({
        type: "notify",
        message: "Already in a room",
      });
      return;
    }

    if (parsedData.type === "chat") {
      const user = users.find(
        (user) => user.userId === userId && user.rooms === parsedData.roomId
      );
      if (!user) {
        ws.send(
          JSON.stringify({
            type: "notify",
            message: "Join Room First",
          })
        );
        console.log({
          type: "notify",
          message: "Join Room First",
        });
        return;
      }
      const roomOfUsers = users.filter((u) => u.rooms === parsedData.roomId);
      try {
        await prismaClient.chat.create({
          data: {
            userId,
            message: parsedData.message,
            roomId: parsedData.roomId,
          },
        });

        roomOfUsers.map((u) => {
          u.ws.send(
            JSON.stringify({
              type: "chat",
              message: parsedData.message,
            })
          );
        });
      } catch (error) {
        ws.send(
          JSON.stringify({
            type: "notify",
            message: "Room does not exist",
          })
        );
        console.log({
          type: "notify",
          message: "Room does not exist",
        });
      }
    }

    if (parsedData.type === "leave_room") {
      users = users.filter((user) => {
        if (!(user.userId === userId)) {
          return user;
        }
      });
      ws.send(
        JSON.stringify({
          type: "notify",
          message: `Room left`,
        })
      );
      console.log({
        type: "notify",
        message: `Room left`,
      });
    }
  });

  ws.send(
    JSON.stringify({
      type: "notify",
      message: `connected to ws server`,
    })
  );
  console.log({
    type: "notify",
    message: `connected to ws server`,
  });
});
