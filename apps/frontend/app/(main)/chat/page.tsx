import LeftBlock from "@/component/LeftBlock";
import RightBlock from "@/component/RightBlock";
import SpliteScreen from "@/component/SpliteScreen";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import ChatPage from "@/component/ChatPage";

async function isLoggedIn() {
  const cookie = (await cookies()).get("chat-app-token")?.value;
  if (!cookie) redirect("/signin");
  try {
    const decode = jwt.verify(cookie, process.env.JWT_SECRET ?? " ");
    if (!decode) redirect("/signin");
  } catch (e) {
    redirect("/signin");
  }
  return cookie;
}

const Chat = async () => {
  const token = await isLoggedIn();
  return (
    <>
      <ChatPage token={token} />
    </>
  );
};

export default Chat;
