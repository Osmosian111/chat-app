import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import jwt, { JwtPayload } from "jsonwebtoken";
import ChatPage from "@/component/ChatPage";
import { Chats, prismaClient, Rooms } from "@repo/db/client";

async function isLoggedIn() {
  const cookie = (await cookies()).get("chat-app-token")?.value;
  if (!cookie) redirect("/signin");
  try {
    const decode = jwt.verify(
      cookie,
      process.env.JWT_SECRET ?? " "
    ) as JwtPayload;
    if (!decode) redirect("/signin");
    return { token: cookie, userId: decode.userId, userName: decode.name };
  } catch (e) {
    redirect("/signin");
  }
}

const Chat = async () => {
  const userInfo = await isLoggedIn();
  const rooms: Rooms | null = await prismaClient.user.findUnique({
    where: { id: userInfo.userId },
    include: {
      Room_JoinedRooms: true,
    },
    omit: {
      password: true,
    },
  });

  const roomIds = rooms?.Room_JoinedRooms.map((room) => room.id) || [""];

  const chats: Chats[] = await prismaClient.chat.findMany({
    where: {
      roomId: {
        in: roomIds,
      },
    },
    include: {
      user: true, // sender info
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (!rooms) return;
  return (
    <>
      <ChatPage userInfo={userInfo} chats={chats} rooms={rooms} />
    </>
  );
};

export default Chat;
