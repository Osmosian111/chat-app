import { type JSX } from "react";

// export function Card({
//   className,
//   title,
//   children,
//   href,
// }: {
//   className?: string;
//   title: string;
//   children: React.ReactNode;
//   href: string;
// }): JSX.Element {
//   return (
//     <a
//       className={className}
//       href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
//       rel="noopener noreferrer"
//       target="_blank"
//     >
//       <h2>
//         {title} <span>-&gt;</span>
//       </h2>
//       <p>{children}</p>
//     </a>
//   );
// }

const Card = () => {
  return (
    <div className="bg-gray-800 text-blue-400 font-medium flex items-center justify-center h-[50px] rounded-md shadow-sm border border-gray-700">
      Chat Header
    </div>
  );
};

export default Card;
