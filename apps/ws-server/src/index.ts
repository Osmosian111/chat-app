require("dotenv").config();

import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

interface User {
  userId: string;
  ws: WebSocket;
  rooms: string[];
}

type ParsedData =
  | {
      type: "init_rooms";
      roomId: string;
      userId: string;
    }
  | {
      type: "join_room";
      roomId: string;
      userId: string;
      userName: string;
    }
  | {
      type: "chat";
      roomId: string;
      userId: string;
      message: string;
      userName: string;
    }
  | {
      type: "leave_room";
      roomId: string;
      userId: string;
      userName: string;
    };

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
    const parsedData: ParsedData = JSON.parse(data.toString());
    if (userId !== parsedData.userId) return;

    const existingUser = users.find((u) => u.userId === userId);

    if (parsedData.type === "init_rooms") {
      if (existingUser && !existingUser.rooms.includes(parsedData.roomId)) {
        existingUser.rooms.push(parsedData.roomId);
      }
      if (!existingUser) {
        users.push({
          userId,
          ws,
          rooms: [parsedData.roomId],
        });
      }
      console.log(users);
    }

    if (parsedData.type === "join_room") {
      if (!existingUser) {
        users.push({
          userId,
          ws,
          rooms: [parsedData.roomId],
        });
        await prismaClient.room.update({
          where: {
            id: parsedData.roomId,
          },
          data: {
            User_JoinedRooms: {
              connect: {
                id: userId,
              },
            },
          },
        });
      } else {
        if (!existingUser.rooms.includes(parsedData.roomId)) {
          existingUser.rooms.push(parsedData.roomId);
          console.log(users);
          await prismaClient.room.update({
            where: {
              id: parsedData.roomId,
            },
            data: {
              User_JoinedRooms: {
                connect: {
                  id: userId,
                },
              },
            },
          });
          ws.send(
            JSON.stringify({
              type: "notify",
              msg: "Room joined",
            })
          );
          console.log({
            type: "notify",
            msg: "Room joined",
          });
        } else {
          ws.send(
            JSON.stringify({
              type: "notify",
              msg: "Already joined",
            })
          );
          console.log({
            type: "notify",
            msg: "Already joined",
          });
        }
        return;
      }
      return;
    }

    if (parsedData.type === "chat") {
      if (!existingUser?.rooms.includes(parsedData.roomId)) {
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
      const usersWithRoomId = users.filter((u) =>
        u.rooms.includes(parsedData.roomId)
      );
      try {
        await prismaClient.chat.create({
          data: {
            userId,
            message: parsedData.message,
            roomId: parsedData.roomId,
          },
        });

        usersWithRoomId.map((u) => {
          u.ws.send(
            JSON.stringify({
              type: "chat",
              userId,
              message: parsedData.message,
              name: parsedData.userName,
              roomId: parsedData.roomId,
            })
          );
        });
        console.log({
          type: "notify",
          message: "Message is Sent",
          msg: {
            type: "chat",
            userId,
            message: parsedData.message,
            name: parsedData.userName,
            roomId: parsedData.roomId,
          },
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
      users = users.filter((user) => user.userId === userId);
      await prismaClient.room.update({
        where: { id: parsedData.roomId },
        data: {
          User_JoinedRooms: {
            disconnect: { id: userId },
          },
        },
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
