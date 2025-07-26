"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import MessageList from "./MessageList";
import { ChatMessage } from "@repo/common/types";

const RightBlock = ({
  socket,
  userId,
}: {
  socket: WebSocket | undefined;
  userId: string;
}) => {
  const url = useSearchParams();
  const roomId = decodeURIComponent(url.get("room") ?? "");

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!roomId) return;
    async function getChats() {
      const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`, {
        withCredentials: true,
      });
      console.log(response.data.message);
      setChats(response.data.message);
    }
    getChats();
  }, [roomId]);

  useEffect(() => {
    console.log(chats);
  }, [chats]);

  const handleSendMessage = () => {
    if (!socket) return;
    console.log(roomId);
    socket.send(
      JSON.stringify({
        type: "chat",
        message: `${message}`,
        roomId,
      })
    );
    setMessage("");
  };

  return (
    <>
      <div className="flex flex-col h-full gap-2">
        {/* Message List */}
        <MessageList chats={chats} userId={userId}/>

        {/* Input Bar */}
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="bg-gray-800 text-gray-100 px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center transition"
          >
            ➤
          </button>
        </div>
      </div>
    </>
  );
};

export default RightBlock;
