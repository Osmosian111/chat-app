"use client"

import { BACKEND_URL, WS_URL } from "@/app/config";
import axios from "axios";
import { get } from "http";
import { useEffect, useState } from "react";

export default function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  async function getToken() {
    const response = await axios.get(`${BACKEND_URL}/fatchtoken`, { withCredentials: true });
    return response.data.token;
  }

  useEffect(() => {
    async function socket(){
        const ws = new WebSocket(`${WS_URL}?token=${await getToken()}`);
        ws.onopen = () =>{
            setSocket(ws)
            setLoading(false)
        }
    } 
    socket()
  }, []);
  return {loading,socket}
}
