import { ReactNode } from "react";

interface SpliteScreenType {
  children: [ReactNode, ReactNode];
  leftValue: string;
  rightValue: string;
}

const SpliteScreen = ({
  children,
  leftValue,
  rightValue,
}: SpliteScreenType) => {
  const [left, right] = children;
  return (
    <div className="flex flex-1">
      <div style={{width:`${leftValue}`}} className={`h-full`}>{left}</div>
      <div style={{width:`${rightValue}`}} className={`h-full`}>{right}</div>
    </div>
  );
};

export default SpliteScreen;
