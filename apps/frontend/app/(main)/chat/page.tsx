import LeftBlock from "@/component/LeftBlock";
import RightBlock from "@/component/RightBlock";
import SpliteScreen from "@/component/SpliteScreen";

const Chat = () => {
  return (
    <>
      <SpliteScreen leftValue="40%" rightValue="60%">
        <LeftBlock></LeftBlock>
        <RightBlock></RightBlock>
      </SpliteScreen>
    </>
  );
};

export default Chat;
