Cần cài thêm các thư viện sau:
styled-components
random-id
postcss

Sử dụng
import ChatBot from './libchatbot/ChatBot'
....
let steps = [
    {
      id: '1',
      message: 'Lựa chọn câu hỏi?',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: '1', label: 'Tuyển sinh 2022', trigger: '3' },
        { value: '2', label: 'Tuyển sinh 2023', trigger: '4' }
      ]
    },
    ....
  ]
....
      <ChatBot
        key={keyChatbot}
        steps={steps}
        hideFooter={true}
        userDelay={0}
        userAvatar='https://w7.pngwing.com/pngs/603/875/png-transparent-girl-thinking-woman-girl-thinking-woman-child-face-hand.png'
      >

      </ChatBot>