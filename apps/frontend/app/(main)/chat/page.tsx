import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import jwt, { JwtPayload } from "jsonwebtoken";
import ChatPage from "@/component/ChatPage";

async function isLoggedIn() {
  const cookie = (await cookies()).get("chat-app-token")?.value;
  if (!cookie) redirect("/signin");
  try {
    const decode = jwt.verify(
      cookie,
      process.env.JWT_SECRET ?? " "
    ) as JwtPayload;
    if (!decode) redirect("/signin");
    return { token: cookie, userId: decode.userId };
  } catch (e) {
    redirect("/signin");
  }
}

const Chat = async () => {
  const info = await isLoggedIn();
  return (
    <>
      <ChatPage userId={info.userId} token={info.token} />
    </>
  );
};

export default Chat;
