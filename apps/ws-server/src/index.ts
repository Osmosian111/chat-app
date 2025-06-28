require("dotenv").config();

import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

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
  if (!token) return;

  const userId = getUserId(token);
  if (!userId) return;

  ws.on("message", (data) => {
    const parsedData = JSON.parse(data.toString());

    if (parsedData.type === "join_room") {
      const userExist = users.find((u) => u.userId === userId);
      if (!userExist) {
        users.push({
          userId,
          ws,
          rooms: parsedData.roomId,
        });
        ws.send(`Room joined ${parsedData.roomId}`);
        return;
      }
      ws.send(`You are already joined in a room named: ${userExist.rooms}`)
    }

    if (parsedData.type === "chat") {
      const user = users.find((user) => user.userId === userId);
      if (!user) return;
      console.log(user);
      const roomOfUsers = users.filter((u) => {
        if (user.rooms === parsedData.roomId) {
          return u;
        }
      });
      console.log(roomOfUsers);
      roomOfUsers.map((u) => {
        u.ws.send(
          JSON.stringify({
            type: "chat",
            message: parsedData.message,
          })
        );
      });
    }

    if (parsedData.type === "leave_room") {
      users = users.filter((user) => {
        if (!(user.userId === userId)) {
          return user;
        }
      });
    }
  });

  ws.send(
    JSON.stringify({
      msg: `connected to ws server: ${userId}`,
    })
  );
});
