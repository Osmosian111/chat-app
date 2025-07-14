"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/home"); // Or `${FRONTEND_URL}/home` if needed
  }, [router]);

  return <div>Redirecting...</div>;
};

export default Home;
