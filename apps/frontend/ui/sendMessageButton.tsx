import React from "react";

const SendMessageButton = ({handleSendMessage}:{handleSendMessage:()=>void}) => {
  return (
    <button
      onClick={handleSendMessage}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center transition"
    >
      ➤
    </button>
  );
};

export default SendMessageButton;
