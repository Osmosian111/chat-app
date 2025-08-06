"use client";

import { ReactNode, useEffect, useState } from "react";
const RightBlock = ({
  children,
}: {
  children: [ReactNode, ReactNode, ReactNode];
}) => {
  const [messageList, inputMessage, sendMessageButton] = children;
  return (
    <>
      <div className="flex flex-col h-full gap-2">
        {/* Message List */}
        {messageList}
        {/* Input Bar */}
        <div className="grid grid-cols-[1fr_auto] gap-2">
          {inputMessage}
          {sendMessageButton}
        </div>
      </div>
    </>
  );
};

export default RightBlock;
