import { Rooms } from "@repo/db/client";
import { useState } from "react";

const JoinedRooms = ({
  rooms,
  onSelect,
  deleteRoom,
}: {
  rooms: Rooms;
  onSelect: (roomId: string) => void;
  deleteRoom: (roomId: string) => void;
}) => {
  const [selectedRoom, setSelectedRoom] = useState<string>("");

  const handleSelect = (roomId: string) => {
    setSelectedRoom(roomId);
    onSelect(roomId);
  };

  const handleDelete = (roomId: string) => {
    deleteRoom(roomId);
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto bg-zinc-900 text-white rounded-md shadow-md border border-zinc-700">
      <h2 className="text-lg font-semibold mb-4">Joined Rooms</h2>
      <div className="space-y-2">
        {rooms.Room_JoinedRooms.map((room) => (
          <div
            key={room.id}
            className={`flex items-center justify-between px-4 py-2 rounded cursor-pointer transition-colors ${
              selectedRoom === room.id
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
            onClick={() => handleSelect(room.id)}
          >
            <span>{room.slug}</span>
            <button
              onClick={(e) => {
                e.stopPropagation(); // 🛑 prevent parent onClick
                handleDelete(room.id); // ⬅️ your delete handler
              }}
              className="text-red-400 hover:text-red-600 transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinedRooms;
