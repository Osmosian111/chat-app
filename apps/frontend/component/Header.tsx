import Button from "@/ui/button";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-black p-3">
      <h2 className="text-2xl">My Chats</h2>
      <div>
        <Button text="logout"/>
      </div>
    </div>
  );
};

export default Header;
