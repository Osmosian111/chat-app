import LeftBlock from "@/component/LeftBlock";
import RightBlock from "@/component/RightBlock";
import SpliteScreen from "@/component/SpliteScreen";

const Chat = () => {
  return (
    <>
      {/* <div className="flex flex-1">
      <div className="w-[40%]">
        <Card/>
      </div>
      <div className="w-[60%]">
        right
      </div>
    </div> */}
      <SpliteScreen leftValue="35%" rightValue="65%">
        <LeftBlock></LeftBlock>
        <RightBlock></RightBlock>
      </SpliteScreen>
    </>
  );
};

export default Chat;
