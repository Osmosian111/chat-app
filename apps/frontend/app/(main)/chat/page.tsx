import LeftBlock from "@/component/LeftBlock";
import RightBlock from "@/component/RightBlock";
import SpliteScreen from "@/component/SpliteScreen";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import jwt, { JwtHeader, JwtPayload } from "jsonwebtoken";

async function isLoggedIn() {
  const cookie = (await cookies()).get("chat-app-token")?.value;
  if (!cookie) redirect("/signin");
  const decode = jwt.verify(cookie, process.env.JWT_SECRET ?? " ");
  if (!decode) redirect("/signin");
}

const Chat = async () => {
  await isLoggedIn();
  return (
    <>
      <SpliteScreen leftValue="35%" rightValue="65%">
        <LeftBlock></LeftBlock>
        <RightBlock></RightBlock>
      </SpliteScreen>
    </>
  );
};

export default Chat;
