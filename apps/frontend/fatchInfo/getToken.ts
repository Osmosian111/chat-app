import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function getToken() {
  const token = (await cookies()).get("chat-app-token")?.value;
  if (!token) return;
  if (!process.env.JWT_SECRET) return;
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  if (!decode) return;
  return token;
}
