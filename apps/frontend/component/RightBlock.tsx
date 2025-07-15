"use client";

import { useState } from "react";

const RightBlock = () => {
  const [message, setMessage] = useState("");
  
  return (
    <>
      <div className="grid grid-rows-[1fr_50px] h-full">
        <div>Message List</div>
        <div className="grid grid-cols-[1fr_50px] gap-x-4 p-1 justify-between">
          
        </div>
      </div>
    </>
  );
};

export default RightBlock;
