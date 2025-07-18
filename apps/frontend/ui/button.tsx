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
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
