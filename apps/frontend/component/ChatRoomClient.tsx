"use client"
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
  const [msg, setMsg] = useState("");
  const { loading, socket } = useSocket();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };

  const handleClick = () => {
    if(!socket) return
    socket?.send(
      JSON.stringify({
        type: "chat",
        message: msg,
        roomId: id,
      })
    );
    setMsg("");
  };

  useEffect(() => {
    console.log(socket?.url)
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: id,
        })
      );

      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        setChats((c) => [...c, { message: parsedData.msg }]);
      };
    }
  }, [loading, socket, id]);
  return (
    <div>
      <div>
        {chats.map((m,index)=>{
          return ( <p key={index}>{m.message}</p> )
        })}
      </div>
      <div>
        <input type="text" value={msg} onChange={handleChange} />
        <button onClick={handleClick}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoomClient;