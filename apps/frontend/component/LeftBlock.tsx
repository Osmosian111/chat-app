import Card from "@/ui/card";

const LeftBlock = () => {
  return <div className="flex flex-col items-center w-full h-full">
    <Card></Card>
    <Card></Card>
    <button className="flex justify-center items-center w-[50px] h-[50px] mt-2 text-3xl border-2 border-amber-500 rounded-full">+</button>
  </div>;
};

export default LeftBlock;
