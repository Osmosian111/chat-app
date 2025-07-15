"use client";

interface ButtonType {
  text: string;
  loading?: boolean;
  onClick?: () => void;
}

const Button = ({ text, loading = false, onClick }: ButtonType) => {
  return (
    <button
      disabled={loading}
      className="bg-blue-500 p-2 pl-2.5 pr-2.5 border-white-2 rounded-md hover:bg-blue-700"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
