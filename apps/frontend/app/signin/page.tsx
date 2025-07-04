"use client"

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { BACKEND_URL, FRONTEND_URL } from "../config";
import axios from "axios";

export default function Signin() {
  const [form, setForm] = useState({email: "", password: ""});
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(form)
    const response = await axios.post(`${BACKEND_URL}/signin`, form, {
      withCredentials: true,
    });
    if (response.data.isSignedInSuccess) {
      router.push(`${FRONTEND_URL}/joinroom`);
    }
  };
  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
