import { useEffect, useState } from "react";
import { ChatService } from "../../services/chat.service";
import ChatBot from "./ChatBot";
import HeaderBack from "../../common/header";
import { Screens } from "../../common/constant";

export default function ChatBotPage() {
  const [qa, setQa] = useState(null);

  const getData = async () => {
    let res = await ChatService.ServiceChat.GetListChatBotQAModel();
    if (res) {
      setQa(res.Data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!qa) {
    return <></>;
  }
  return (
    <>
      <HeaderBack header={Screens.ChatBot} />
      <ChatBot
        // key={keyChatbot}
        steps={qa}
        hideFooter={true}
        userDelay={0}
        userAvatar="https://w7.pngwing.com/pngs/603/875/png-transparent-girl-thinking-woman-girl-thinking-woman-child-face-hand.png"
      ></ChatBot>
    </>
  );
}
