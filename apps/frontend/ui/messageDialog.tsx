import React from "react";
import { ChatMessage } from "@repo/common/types";

const MessageDialog = ({
  chat,
  userId,
}: {
  chat: ChatMessage;
  userId: string;
}) => {
  return (
    <>
      {/* Receiver Message */}
      {userId == `${chat.user.id}` ? (
        <div className="flex justify-end">
          <div className="bg-blue-600 text-white p-3 rounded-lg max-w-[80%] sm:max-w-[70%] break-words">
            {/* Sender's Name */}
            <p className="text-blue-200 text-[10px] font-semibold mb-1 text-right">
              You
            </p>

            {/* Message Text */}
            <p className="text-sm">{chat.message}</p>

            {/* Timestamp */}
            <span className="text-gray-300 text-[10px] block text-right mt-1">
              12:35 PM
            </span>
          </div>
        </div>
      ) : (
        <div className="flex justify-start">
          <div className="bg-gray-700 text-white p-3 rounded-lg max-w-[80%] sm:max-w-[70%] break-words">
            {/* Sender's Name */}
            <p className="text-blue-400 text-[10px] font-semibold mb-1">
              {chat.user.name}
            </p>

            {/* Message Text */}
            <p className="text-sm">{chat.message}</p>

            {/* Timestamp */}
            <span className="text-gray-400 text-[10px] block text-right mt-1">
              12:34 PM
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageDialog;
