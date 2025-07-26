import React from "react";
import MessageDialog from "@/ui/messageDialog";
import { ChatMessage } from "@repo/common/types";

const MessageList = ({
  chats,
  userId,
}: {
  chats: ChatMessage[];
  userId: string;
}) => {
  if (!chats) return;
  return (
    <>
      <div className="flex-1 min-h-0 overflow-y-auto bg-gray-800 rounded-md p-4 border border-gray-700 h-full">
        <div className="flex flex-col gap-3">
          {chats.map((chat,index) => {
            return (
              <>
                <MessageDialog index={index} userId={userId} chat={chat} />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MessageList;
