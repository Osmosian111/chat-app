import { BACKEND_URL } from "@/app/config";
import axios from "axios";
import ChatRoomClient from "./ChatRoomClient";

async function getChats(id: string) {
  const response = await axios.get(`${BACKEND_URL}/chats/${id}`, {
    withCredentials: true,
  });
  return response.data.message;
}

const ChatRoom = async ({ id }: { id: string }) => {
  const message = await getChats(id);
  return <ChatRoomClient message={message} id={id}></ChatRoomClient>;
};

export default ChatRoom;