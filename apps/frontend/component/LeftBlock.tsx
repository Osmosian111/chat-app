"use client";
import { ReactNode, useState } from "react";

const LeftBlock = ({
  showModal,
  children,
}: {
  showModal: boolean;
  children: [ReactNode, ReactNode, ReactNode];
}) => {
  const [card, popUp, joinButton] = children;
  return (
    <div className="flex flex-col gap-3 h-full items-stretch">
      {card}
      <div className="mt-auto flex justify-center">{joinButton}</div>
      {showModal && popUp}
    </div>
  );
};

export default LeftBlock;
