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
      <div className={`h-full w-[${leftValue}]`}>{left}</div>
      <div className={`h-full w-[${rightValue}]`}>{right}</div>
    </div>
  );
};

export default SpliteScreen;
