// components/JoinRoom.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import useSocket from "@/hooks/useSocket";

export default function JoinRoom({ name }: { name: string }) {
  const [roomId, setRoomId] = useState("");
  const { loading, socket } = useSocket();

  useEffect(() => {
    async function getRoomId() {
      const response = await axios.get(`${BACKEND_URL}/room/${name}`, {
        withCredentials: true,
      });
      console.log(response);
      if (response.data?.room?.id) {
        setRoomId(response.data.room.id);
      }
    }
    getRoomId();
  }, [name]);

  useEffect(() => {
    if (socket && !loading && roomId) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId,
        })
      );

      socket.onmessage = (data) => {
        const message = JSON.parse(data.data);
        console.log(message);
      };
    }
  }, [loading, socket, roomId]);

  return null; // or some placeholder/loading UI
}
