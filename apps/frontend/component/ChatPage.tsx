"use client";

import React from "react";
import SpliteScreen from "./SpliteScreen";
import LeftBlock from "./LeftBlock";
import RightBlock from "./RightBlock";
import useSocket from "@/hooks/useSocket";
import Spinner from "@/ui/spinner";

const ChatPage = (props: { token: string; userId: string }) => {
  const { loading, socket } = useSocket({ token: props.token });

  if (loading) return <Spinner />;

  return (
    <>
      <SpliteScreen leftValue="35%" rightValue="65%">
        <LeftBlock socket={socket}></LeftBlock>
        <RightBlock userId={props.userId} socket={socket}></RightBlock>
      </SpliteScreen>
    </>
  );
};

export default ChatPage;
