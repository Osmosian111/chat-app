"use client";

import { BACKEND_URL, FRONTEND_URL } from "@/app/config";
import Button from "@/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CreateRoom from "../ui/popUp";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleCreateRoom = () => {
    setShowModal(true);
  };

  const handleLogout = async () => {
    const response = await axios.get(`${BACKEND_URL}/logout`, {
      withCredentials: true,
    });
    if (response.data.Success) {
      router.push(`${FRONTEND_URL}/signin`);
    }
  };

  return (
    <div className="flex justify-between items-center bg-gray-800 px-6 py-4 border-b border-gray-700 shadow-sm">
      <h2 className="text-2xl font-semibold text-blue-400">My Chats</h2>
      <div className="flex gap-1">
        <Button onClick={handleCreateRoom} text="Create Room" />
        <Button onClick={handleLogout} text="logout" />
      </div>
      {showModal && (
        <CreateRoom
          closeFunction={() => setShowModal(false)} type="Create"
        />
      )}
    </div>
  );
};

export default Header;
