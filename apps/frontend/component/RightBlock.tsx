"use client";

import Button from "@/ui/button";
import Input from "@/ui/input";
import { useState } from "react";

const RightBlock = () => {
  const [message, setMessage] = useState("");
  
  return (
    <>
      <div className="grid grid-rows-[1fr_50px] h-full">
        <div>Message List</div>
        <div className="grid grid-cols-[1fr_150px] gap-x-4 p-1 justify-between">
          <Input
            value={`${message}`}
            onChange={(e) => setMessage(e.target.value)}
            arg="message"
            type="text"
          />
          <Button text="Send" />
        </div>
      </div>
    </>
  );
};

export default RightBlock;
