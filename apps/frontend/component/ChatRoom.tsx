import { BACKEND_URL } from "@/app/config";
import getToken from "@/app/room/[slug]/getToken";
import axios from "axios";
import ChatRoomClient from "./ChatRoomClient";

async function getChats(id: string) {
  const token = await getToken();
  const response = await axios.get(`${BACKEND_URL}/chats/${id}`, {
    headers: { Cookie: `chat-app-token=${token}` },
  });
  return response.data.message;
}

const ChatRoom = async ({ id }: { id: string }) => {
  const message = await getChats(id);
  return <ChatRoomClient message={message} id={id}></ChatRoomClient>;
};

export default ChatRoom;
