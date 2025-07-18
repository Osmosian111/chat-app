import { BACKEND_URL } from "@/app/config";
import ChatRoom from "@/component/ChatRoom";
import axios from "axios";

async function getRoomId(slug: string) {
  const response = await axios.get(`${BACKEND_URL}/room/${slug}`, {
    withCredentials: true,
  });
  return response.data.room.id;
}

export default async function ChatRoomPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = (await params).slug;
  const roomId = await getRoomId(slug);

  return <ChatRoom id={roomId}></ChatRoom>;
}
