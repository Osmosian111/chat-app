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
    <div className="flex flex-1 bg-gray-900 h-[calc(100vh-73px)]">
      <div
        style={{ width: `${leftValue}` }}
        className={`bg-gray-900 border-r border-gray-800 p-2`}
      >
        {left}
      </div>
      <div style={{ width: `${rightValue}` }} className={`bg-gray-900 p-2`}>
        {right}
      </div>
    </div>
  );
};

export default SpliteScreen;
