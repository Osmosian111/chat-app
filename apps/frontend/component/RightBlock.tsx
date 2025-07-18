"use client";

import { useState } from "react";

const RightBlock = () => {
  const [message, setMessage] = useState("");
  const handleJoinRoom = () => {};

  return (
    <>
      <div className="grid grid-rows-[1fr_50px] h-full gap-2">
        <div className="bg-gray-800 rounded-md p-4 overflow-y-auto border border-gray-700">
          <p className="text-gray-400">Message List</p>
        </div>
        <div className="grid grid-cols-[1fr_50px] gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="bg-gray-800 text-gray-100 px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              handleJoinRoom;
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center transition"
          >
            ➤
          </button>
        </div>
      </div>
    </>
  );
};

export default RightBlock;
