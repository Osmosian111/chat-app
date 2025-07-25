"use client";

import { WS_URL } from "@/app/config";
import { useEffect, useState } from "react";

export default function useSocket({ token }: { token: string }) {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    async function socket() {
      const ws = new WebSocket(`${WS_URL}?token=${token}`);
      ws.onopen = () => {
        setSocket(ws);
        setLoading(false);
      };
    }
    socket();
  }, [token]);
  return { loading, socket };
}
