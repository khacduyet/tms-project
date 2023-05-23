import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "./axiosChat.setup";

const { get, post } = axiosClient;
const path = "ChatServer/APIService/";
const chatbot = "ChatServer/ChatBotService/";
export const ChatService = {
  ServiceChat: ServiceChat()
};

const getHeaders = async () => {
  const sjwt = await AsyncStorage.getItem('token');
  let headers = {
    headers: {
      ContentType: "application/json;charset=UTF-8",
      Accept: "application/json, text/plain, */*",
      Authorization: ("BEARER " + sjwt)
    },
  }
  return headers;
}

export function ServiceChat() {
  return {
    GetMessagesOfRoom: async (data) => {
      let _header = await getHeaders();
      return post(path + 'GetMessagesOfRoom', data, _header);
    },
    SetRoom: async (data) => {
      let _header = await getHeaders();
      return post(path + 'SetRoom', data, _header);
    },
    GetDSRoom: async (data) => {
      let _header = await getHeaders();
      return post(path + 'GetDSRoom', data, _header);
    },
    GetListChatBotQAModel: async () => {
      let _header = await getHeaders();
      return get(chatbot + 'GetListChatBotQAModel', _header);
    },
  }
}