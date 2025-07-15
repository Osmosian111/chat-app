"use client";

import AuthForm from "@/component/AuthForm";

export default function Signin() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <AuthForm mode="signin" />
    </div>
  );
}
