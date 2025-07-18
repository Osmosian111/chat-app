import Button from "@/ui/button";
import React, { ChangeEvent, useState } from "react";
import JoinRoom from "./JoinRoom";

interface CreateRoomType {
  closeFunction: () => void;
  type: "Create" | "Join";
}

const PopUp = ({ closeFunction, type }: CreateRoomType) => {
  const [name, setName] = useState("");
  const [intel, setIntel] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-md shadow-md w-96 border border-gray-700">
        <h3 className="text-xl text-blue-400 font-semibold mb-4">
          {type} a New Room
        </h3>
        <input
          type="text"
          placeholder="Enter room name"
          onChange={handleInput}
          className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 mb-4"
          value={name}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={closeFunction}
            className="px-4 py-2 text-sm rounded-md bg-gray-700 hover:bg-gray-600"
            disabled={loading}
          >
            Cancel
          </button>
          <Button
            loading={loading}
            text={
              type === "Create"
                ? loading
                  ? "Creating"
                  : "Create"
                : loading
                  ? "Joining"
                  : "Join"
            }
            onClick={() => setIntel(true)}
          />
        </div>
        {type === "Join" && intel && <JoinRoom name={`${name}`} />}
      </div>
    </div>
  );
};

export default PopUp;
