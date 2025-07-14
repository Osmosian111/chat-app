import Button from "@/ui/button";
import Input from "@/ui/input";

const RightBlock = () => {
  return (
    <>
      <div className="grid grid-rows-[1fr_50px] h-full">
        <div>Message List</div>
        <div className="grid grid-cols-[1fr_150px] gap-x-4 p-1 justify-between">
          <Input placeholder="Message"/>
          <Button text="Send"/>
        </div>
      </div>
    </>
  );
};

export default RightBlock;
