"use client";

import { BACKEND_URL, FRONTEND_URL } from "@/app/config";
import Button from "@/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();

  const onClickHandler = async () => {
    const response = await axios.get(`${BACKEND_URL}/logout`, {
      withCredentials: true,
    });
    if (response.data.Success) {
      router.push(`${FRONTEND_URL}/signin`);
    }
  };
  return (
    <div className="flex justify-between items-center bg-black p-3">
      <h2 className="text-2xl">My Chats</h2>
      <div>
        <Button onClick={onClickHandler} text="logout" />
      </div>
    </div>
  );
};

export default Header;
