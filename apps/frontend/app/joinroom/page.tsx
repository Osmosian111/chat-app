"use client";

import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { BACKEND_URL, FRONTEND_URL } from "../config";
import useSocket from "@/hooks/useSocket";
import { useRouter } from "next/navigation";

export default function JoinRoom() {
  const [form, setForm] = useState({ roomName: "" });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    router.push(`${FRONTEND_URL}/room/${form.roomName}`);
  };

  return (
    <div>
      <h1>Join Room</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="roomName">Room Name</label>
        <br />
        <input
          type="text"
          id="roomName"
          name="roomName"
          placeholder="roomName"
          onChange={handleChange}
        />
        <br />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}
