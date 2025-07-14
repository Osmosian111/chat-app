const Input = ({ placeholder }: { placeholder: string }) => {
  return (
    <input
      className="border-black border-2 p-1 pl-2.5 rounded-2xl"
      type="text"
      placeholder={`${placeholder}`}
    />
  );
};

export default Input;
