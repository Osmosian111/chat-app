"use client";

import { FRONTEND_URL } from "@/app/config";
import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push(`${FRONTEND_URL}/chat`)}>Chat</button>
    </div>
  );
};

export default Home;
