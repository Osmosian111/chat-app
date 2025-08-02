"use client";

import { BACKEND_URL, WS_URL } from "@/app/config";
import axios from "axios";
import { useEffect, useState } from "react";

type RoomResponse = {
  data: {
    rooms: { id: string; stug: string; adminId: string; createdAt: Date }[];
  };
};

export default function useSocket({
  token,
  userId,
}: {
  token: string;
  userId: string;
}) {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    async function socket() {
      const ws = new WebSocket(`${WS_URL}?token=${token}`);
      ws.onopen = async () => {
        setSocket(ws);
        await init_Room(ws);
        setLoading(false);
      };
    }
    socket();
  }, [token]);

  async function init_Room(ws: WebSocket) {
    if (!ws) return;
    const response: RoomResponse = await axios.get(
      `${BACKEND_URL}/rooms/joined`,
      {
        withCredentials: true,
      }
    );
    const rooms = response.data.rooms;
    console.log(response.data.rooms);
    if (!Array.isArray(rooms)) return;
    if (rooms.length === 0) return;
    for (const room of rooms) {
      ws.send(
        JSON.stringify({
          type: "init_rooms",
          userId,
          roomId: room.id,
        })
      );
    }
  }
  return { loading, socket };
}
