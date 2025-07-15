"use client";

import { BACKEND_URL, FRONTEND_URL } from "@/app/config";
import Button from "@/ui/button";
import Input from "@/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AuthForm = ({ mode }: { mode: "signup" | "signin" }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const text = mode === "signup" ? "Sign Up" : "Sign In";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios.post(
      `${BACKEND_URL}/${mode}`,
      { email, name, password },
      { withCredentials: true }
    );
    console.log(response);
    setLoading(false);
  };

  return (
    <div>
      <h2 className="ml-1.5 2xl">{text}</h2>
      <form onSubmit={handleSubmit}>
        {mode === "signup" && (
          <>
            <Input
              arg="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
          </>
        )}

        <Input
          arg="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <Input
          arg="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <div className="flex justify-end items-center mr-1.5">
          <Button
            loading={loading}
            text={
              loading
                ? mode === "signup"
                  ? "Signing Up..."
                  : "Signing In..."
                : text
            }
          />
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
