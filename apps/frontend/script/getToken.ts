import jwt from "jsonwebtoken";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";

export default async function getToken() {
  const response = await axios.get(`${BACKEND_URL}/fatchtoken`, {
    withCredentials: true,
  });
  const token = response.data.token;
  if (!token) return;
  return token;
}
