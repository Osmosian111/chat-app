"use client";

import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { BACKEND_URL } from "../config";

export default function JoinRoom() {
  const [form, setForm] = useState({ roomName: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form)
    const response = await axios.post(`${BACKEND_URL}/room`,{name:form.roomName}, {
      withCredentials:true,
    });
  };

  return (
    <div>
      <h1>Create Room</h1>
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
