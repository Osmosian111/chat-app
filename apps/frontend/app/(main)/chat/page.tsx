import LeftBlock from "@/component/LeftBlock";
import RightBlock from "@/component/RightBlock";
import SpliteScreen from "@/component/SpliteScreen";

const Chat = () => {
  return (
    <>
      <SpliteScreen leftValue="35%" rightValue="65%">
        <LeftBlock></LeftBlock>
        <RightBlock></RightBlock>
      </SpliteScreen>
    </>
  );
};

export default Chat;
