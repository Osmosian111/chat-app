import React, { ReactNode } from "react";

const MessageList = ({
  children
}: {
  children:ReactNode
}) => {
  return (
    <>
      <div className="flex-1 min-h-0 overflow-y-auto bg-gray-800 rounded-md p-4 border border-gray-700 h-full custom-scrollbar">
        <div className="flex flex-col gap-3">
          {children}
        </div>
      </div>
    </>
  );
};

export default MessageList;
