"use client";

import React, { useEffect, useState } from "react";
import PopUp from "@/ui/popUp";
import Card from "@/ui/roomList";
import SpliteScreen from "./SpliteScreen";
import LeftBlock from "./LeftBlock";
import RightBlock from "./RightBlock";
import useSocket from "@/hooks/useSocket";
import Spinner from "@/ui/spinner";
import JoinButton from "@/ui/joinButton";
import { UserInfo } from "@repo/common/types";
import { Chats, Rooms } from "@repo/db/client";
import SendMessageButton from "@/ui/sendMessageButton";
import InputMessage from "@/ui/inputMessage";
import MessageList from "./MessageList";
import MessageDialog from "@/ui/messageDialog";
import { useRouter } from "next/navigation";

type ChatsGroupedByRoom = Record<string, Chats[]>;

const ChatPage = ({
  userInfo,
  chats,
  rooms,
}: {
  userInfo: UserInfo;
  chats: Chats[];
  rooms: Rooms;
}) => {
  const groupedChats: ChatsGroupedByRoom = chats.reduce((acc, chat) => {
    if (!acc[chat.roomId]) {
      acc[chat.roomId] = [];
    }
    acc[chat.roomId].push(chat);
    return acc;
  }, {} as ChatsGroupedByRoom);

  const router = useRouter();
  const [currentChats, setCurrentChats] =
    useState<ChatsGroupedByRoom>(groupedChats);
  const [currentRoomId, setCurrentRoomId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const { loading, socket } = useSocket(userInfo);

  function deleteRoom(roomId: string) {
    if (!socket) return;
    console.log("deleteRoom")
    socket.send(
      JSON.stringify({
        type: "leave_room",
        userId: userInfo.userId,
        roomId,
      })
    );
    router.refresh();
  }

  useEffect(() => {
    console.log("Changed");
  }, [currentChats]);

  useEffect(() => {
    if (!socket || loading) return;
    socket.onmessage = (incoming) => {
      const parsedData = JSON.parse(incoming.data);
      console.log(parsedData);

      const newChat: Chats = {
        createdAt: new Date(),
        message: parsedData.message,
        roomId: parsedData.roomId,
        userId: parsedData.userId,
        user: {
          id: parsedData.userId,
          name: parsedData.userName,
        },
      };
      setCurrentChats((prev) => {
        const updated = { ...prev };
        if (!updated[parsedData.roomId]) {
          updated[parsedData.roomId] = [];
        }
        updated[parsedData.roomId] = [...updated[parsedData.roomId], newChat];
        return updated;
      });
    };
  }, [socket, loading]);

  useEffect(() => {
    if (!socket || !currentRoomId) return;
    socket.send(
      JSON.stringify({
        type: "join_room",
        roomId: currentRoomId,
        userId: userInfo.userId,
        userName: userInfo.userName,
      })
    );
  }, [currentRoomId]);

  const handleSendMessage = () => {
    if (!socket || !message.trim()) return;
    socket.send(
      JSON.stringify({
        type: "chat",
        userId: userInfo.userId,
        userName: userInfo.userName,
        message,
        roomId: currentRoomId,
      })
    );
    console.log("handle message");
    setMessage("");
  };

  if (loading) return <Spinner />;

  return (
    <>
      <SpliteScreen leftValue="35%" rightValue="65%">
        <LeftBlock showModal={showModal}>
          <Card
            rooms={rooms}
            onSelect={(roomId) => {
              setCurrentRoomId(roomId);
            }}
            deleteRoom={(roomId) => {
              deleteRoom(roomId);
            }}
          ></Card>
          <PopUp
            type="Join"
            closeFunction={() => setShowModal(false)}
            socket={socket}
          />
          <JoinButton handleClick={() => setShowModal(true)}></JoinButton>
        </LeftBlock>
        <RightBlock>
          <MessageList>
            {currentChats[currentRoomId] &&
              currentChats[currentRoomId].length &&
              currentChats[currentRoomId].map((chat) => {
                return (
                  <MessageDialog
                    key={Math.random()}
                    chat={chat}
                    userId={userInfo.userId}
                  />
                );
              })}
          </MessageList>

          <InputMessage
            message={message}
            setMessage={setMessage}
          ></InputMessage>
          <SendMessageButton
            handleSendMessage={handleSendMessage}
          ></SendMessageButton>
        </RightBlock>
      </SpliteScreen>
    </>
  );
};

export default ChatPage;
