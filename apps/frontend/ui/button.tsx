"use client";

import { ReactNode } from "react";

// interface ButtonProps {
//   children: ReactNode;
//   className?: string;
//   appName: string;
// }

// export const Button = ({ children, className, appName }: ButtonProps) => {
//   return (
//     <button
//       className={className}
//       onClick={() => alert(`Hello from your ${appName} app!`)}
//     >
//       {children}
//     </button>
//   );
// };

interface ButtonType {
  text: string;
}

const Button = ({ text }: ButtonType) => {
  return (
    <button className="bg-blue-500 p-2 pl-2.5 pr-2.5 border-white-2 rounded-md">
      {text}
    </button>
  );
};

export default Button;
