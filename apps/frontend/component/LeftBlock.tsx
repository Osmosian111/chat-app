"use client";
import Card from "@/ui/card";
import { useState } from "react";
import PopUp from "./PopUp";

const LeftBlock = ({ socket }: { socket: WebSocket | undefined }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex flex-col gap-3 h-full items-stretch">
      <Card></Card>
      <div className="mt-auto flex justify-center">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center w-[50px] h-[50px] text-3xl text-blue-400 border-2 border-blue-600 rounded-full bg-gray-800 hover:bg-blue-600 hover:text-white transition"
        >
          +
        </button>
      </div>
      {showModal && (
        <PopUp type="Join" closeFunction={() => setShowModal(false)} socket={socket}/>
      )}
    </div>
  );
};

export default LeftBlock;
