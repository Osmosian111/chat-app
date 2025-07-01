"use client";
import useSocket from "@/hooks/useSocket";
import { ChangeEvent, useEffect, useState } from "react";

const ChatRoomClient = ({
  message,
  id,
}: {
  message: { message: string }[];
  id: string;
}) => {
  const [chats, setChats] = useState<{ message: string }[]>(message || []);
  const [currentMessage, setCurrentMessage] = useState("");
  const { loading, socket } = useSocket();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage(e.target.value);
  };

  const handleClick = () => {
    if (!socket) return;
    console.log(id);
    socket?.send(
      JSON.stringify({
        type: "chat",
        message:currentMessage,
        roomId: id,
      })
    );
    setCurrentMessage("");
  };

  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: id,
        })
      );

      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log(parsedData)
        if (parsedData.type == "notify") {
          console.log(parsedData.message)
          return
        };
        setChats((c) => [...c, { message: parsedData.message }]);
      };
    }
  }, [loading, socket, id]);
  return (
    <div>
      <div>
        {chats.map((m, index) => {
          return <p key={index}>{m.message}</p>;
        })}
      </div>
      <div>
        <input type="text" value={currentMessage} onChange={handleChange} />
        <button onClick={handleClick}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoomClient;
