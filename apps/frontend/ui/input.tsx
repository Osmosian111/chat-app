interface InputType {
  arg: "name" | "password" | "email";
  type: "text" | "email" | "password";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Input = ({ arg, type, onChange, value }: InputType) => {
  return (
    <>
      <input
        className="border-white border-2 w-[300px] p-1.5 m-2"
        type={`${type}`}
        name={`${arg}`}
        id={`${arg}`}
        placeholder={`${arg.charAt(0).toUpperCase() + arg.slice(1)}`}
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default Input;
