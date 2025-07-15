"use client";

import AuthForm from "@/component/AuthForm";

export default function Signup() {
  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen">
        <AuthForm mode="signup" />
      </div>
    </>
  );
}
