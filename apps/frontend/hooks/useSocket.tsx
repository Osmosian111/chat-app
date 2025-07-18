"use client";

import { WS_URL } from "@/app/config";
import getToken from "@/script/getToken";
import { useEffect, useState } from "react";

export default function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    async function socket() {
      const token = await getToken();
      console.log(token);
      const ws = new WebSocket(`${WS_URL}?token=${token}`);
      ws.onopen = () => {
        setSocket(ws);
        setLoading(false);
      };
    }
    socket();
  }, []);
  return { loading, socket };
}
