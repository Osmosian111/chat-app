import React from "react";

const JoinButton = ({handleClick}:{handleClick:()=>void}) => {
  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-[50px] h-[50px] text-3xl text-blue-400 border-2 border-blue-600 rounded-full bg-gray-800 hover:bg-blue-600 hover:text-white transition"
    >
      +
    </button>
  );
};

export default JoinButton;
