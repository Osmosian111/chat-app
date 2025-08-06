import React from "react";

const InputMessage = ({
  message,
  setMessage,
}: {
  message: string;
  setMessage: (value:string) => void;
}) => {
  return (
    <input
      type="text"
      placeholder="Type your message..."
      className="bg-gray-800 text-gray-100 px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
      onChange={(e) => setMessage(e.target.value)}
      value={message}
    />
  );
};

export default InputMessage;
