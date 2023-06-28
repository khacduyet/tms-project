import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput as MyTextInput,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, FindInput, ToastMessage } from "../../common/components";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ListEmptyComponent } from "../schedules";
import { Avatar, Checkbox, RadioButton } from "react-native-paper";
import HeaderBack from "../../common/header";
import { Colors, Screens, TextButton, height } from "../../common/constant";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  createGuid,
  formatDateStringGMT,
  getFirstCharacterByName,
  getTypeToDate,
} from "../../common/common";
import { socket } from "./socket";
import { QuyTrinhServices } from "../../services/danhmuc.service";
import { ChatService } from "../../services/chat.service";
import { useSelector } from "react-redux";
import { ModalGeneral } from "../../common/modal";
import { TextInput } from "@react-native-material/core";

export default function ChatPage() {
  const nav = useNavigation();
  const [filter, setFilter] = useState({
    keyword: null,
  });
  const currentUser = useSelector((state) => state.currentUser);
  const [refresh, setRefresh] = useState(false);
  const [listRoom, setListRoom] = useState([]);
  const [listUserCanChat, setListUserCanChat] = useState([]);
  const [listGiaoVien, setListGiaoVien] = useState([]);
  const [visible, setVisible] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  }, []);

  useEffect(() => {
    GetListRoom();
  }, [currentUser, refresh]);

  const GetListRoom = async () => {
    let res = await ChatService.ServiceChat.GetDSRoom({
      IdUser: currentUser.Id,
    });
    if (res) {
      setListRoom(res.Data);
    }
  };

  const getAllOptions = async () => {
    let personChats =
      await QuyTrinhServices.GiaoVien.GetLopAndSinhVienByGiaoVien();
    let teacherChats =
      await QuyTrinhServices.GiaoVien.GetDanhSachUserForHopDong();
    if (personChats) {
      setListUserCanChat(personChats);
    }
    if (teacherChats) {
      let teachers = teacherChats.items.map((x) => {
        return {
          Id: x.Id,
          TenNhanVien: x.TenNhanVien,
          Ma: x.MaNhanVien,
          Anh: x.LinkAnhDaiDien,
        };
      });
      setListGiaoVien(teachers);
    }
  };

  const onCancel = () => {
    setVisible(false);
  };
  const onFinish = () => {
    setVisible(false);
  };

  const handleCreateNewRoom = async (item, props) => {
    let obj = {
      IdChuRoom: currentUser.Id,
      isGroup: false,
      isSinhVien: true,
      listLop: [],
      listUser: [
        {
          IdUser: currentUser.Id,
          TenUser: currentUser.TenNhanVien,
        },
        {
          IdUser: item.Id,
          TenUser: item.TenNhanVien,
        },
      ],
    };
    let res = await ChatService.ServiceChat.SetRoom(obj);
    if (res) {
      nav.navigate(Screens.ChatPersonalPage, {
        props: {
          ...props,
          item: {
            ...props.item,
            item: res.Data,
          },
        },
      });
    }
    GetListRoom();
    onCancel();
  };

  useEffect(() => {
    getAllOptions();
  }, []);

  return (
    <SafeAreaView>
      <View style={[s.container]}>
        <View style={[s.header]}>
          <Text style={[s.headerText]}>Danh sách trò chuyện</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={[s.headerButton]}
              onPress={() =>
                nav.navigate(Screens.TaoNhom, {
                  listGiaoVien: listGiaoVien,
                  listUserCanChat: listUserCanChat,
                })
              }
            >
              <MaterialCommunityIcons
                name="account-group-outline"
                size={28}
                color="blue"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.headerButton]}
              onPress={() => setVisible(true)}
            >
              <MaterialCommunityIcons
                name="chat-plus-outline"
                size={26}
                color="blue"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[s.headerFind]}>
          <FindInput
            props={{
              value: filter.keyword,
              onChangeText: (e) => {
                setFilter({
                  ...filter,
                  keyword: e,
                });
              },
            }}
          />
        </View>
        <View style={[s.body]}>
          <FlatList
            data={listRoom}
            maxToRenderPerBatch={30}
            windowSize={21}
            initialNumToRender={10}
            showsVerticalScrollIndicator={false}
            refreshing={refresh}
            onRefresh={onRefresh}
            renderItem={(item) => (
              <ItemPersonal
                props={{
                  item: item,
                  currentUser: currentUser,
                }}
              />
            )}
            keyExtractor={(item, index) => `ListPhongChat` + index}
            ListEmptyComponent={ListEmptyComponent}
            ListFooterComponent={<View></View>}
          />
        </View>
      </View>
      <ModalGeneral
        onClose={onCancel}
        isVisible={visible}
        onFinish={onFinish}
        children={
          <ModalAddChat
            props={{
              listGV: listGiaoVien,
              listSV: listUserCanChat,
              currentUser: currentUser,
              handleCreateNewRoom: handleCreateNewRoom,
            }}
          />
        }
        isShowHeader={false}
      />
    </SafeAreaView>
  );
}

const ModalAddChat = ({ props }) => {
  const [listGV, setListGV] = useState(props.listGV);
  const [listSV, setListSV] = useState(props.listSV.ListSinhVien);
  const [keyword, setKeyword] = useState(null);
  const ITEM_HEIGHT = 100;
  const [activeIndex, setActiveIndex] = useState(0);
  const getItemLayout = useCallback(
    (data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  useEffect(() => {
    if (activeIndex === 0) {
      if (keyword) {
        let newLst = props.listSV.ListSinhVien.filter((x) =>
          x.Ten.toLowerCase().trim().includes(keyword.toLowerCase().trim())
        );
        setListSV(newLst);
        return;
      }
      setListSV(props.listSV.ListSinhVien);
      return;
    }
    if (keyword) {
      let newLst = props.listGV.filter((x) =>
        x.TenNhanVien.toLowerCase()
          .trim()
          .includes(keyword.toLowerCase().trim())
      );
      setListGV(newLst);
      return;
    }
    setListGV(props.listGV);
  }, [keyword]);
  return (
    <View
      style={[
        {
          marginTop: 10,
          width: "90%",
        },
      ]}
    >
      <View style={[group.container]}>
        <TouchableOpacity
          style={[
            group.button,
            { backgroundColor: activeIndex === 0 ? "#ccc" : null },
          ]}
          onPress={() => setActiveIndex(0)}
        >
          <Text>Sinh viên</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            group.button,
            { backgroundColor: activeIndex === 1 ? "#ccc" : null },
          ]}
          onPress={() => setActiveIndex(1)}
        >
          <Text>Giáo viên</Text>
        </TouchableOpacity>
      </View>

      <FindInput
        props={{
          value: keyword,
          onChangeText: (e) => {
            setKeyword(e);
          },
        }}
      />
      <Text style={{ padding: 3 }}>Gợi ý: </Text>
      <FlatList
        style={{ maxHeight: height / 2 }}
        data={activeIndex === 0 ? listSV : listGV}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={30}
        windowSize={21}
        initialNumToRender={10}
        renderItem={(item) => (
          <ItemPersonal
            props={{
              item: item,
              currentUser: props.currentUser,
              hasShowName: true,
              handleCreateNewRoom: props.handleCreateNewRoom,
            }}
          />
        )}
        getItemLayout={getItemLayout}
        keyExtractor={(item, index) => `ListGeneral` + item.item?.Created}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={<View></View>}
      />
    </View>
  );
};

const ItemPersonal = ({ props }) => {
  const nav = useNavigation();
  const _thisBox = useMemo(() => {
    if (props.item.item.isGroup) {
      return props.item.item.Ten || props.item.item.TenNhanVien;
    }
    if (props.hasShowName) {
      return props.item.item.TenNhanVien || props.item.item.Ten;
    }
    let _this = props.item.item.listUser.filter(
      (x) => x.IdUser !== props.currentUser.Id
    );
    return (
      _this.length &&
      _this
        .map((x) => {
          return x.TenUser;
        })
        .join(", ")
    );
  }, [props.currentUser, props.item]);

  const handleOnClick = () => {
    if (props.hasShowName) {
      props.handleCreateNewRoom(props.item.item, props);
      return;
    }
    nav.navigate(Screens.ChatPersonalPage, {
      props: props,
    });
  };

  return (
    <TouchableOpacity style={[ip.container]} onPress={handleOnClick}>
      <ThisAvatar url={props.item.item.Anh} size={60} name={_thisBox} />
      <View style={[ip.infomation]}>
        <View style={[ip.infomationTop]}>
          <Text style={[ip.infomationText]} numberOfLines={1}>
            {_thisBox}
          </Text>
          {/* <Text style={[ip.infomationText, { color: "red" }]}> (5)</Text> */}
        </View>
        {!props.hasShowName && (
          <View style={[ip.infomationBottom]}>
            <Text
              style={[ip.infomationText, ip.infomationTextMessage]}
              numberOfLines={1}
            >
              {/* Em chú ý ôn tập để chuẩn bị thi Em chú ý ôn tập để chuẩn bị thi */}
            </Text>
            <Text style={[ip.infomationText, ip.infomationTextDate]}>
              {/* 26/12/2023 */}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const group = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    padding: 3,
    borderBottomWidth: 0.7,
  },
});
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
export const ChatGroupPage = ({ props, route }) => {
  const nav = useNavigation();
  const { listGiaoVien, listUserCanChat } = route.params;
  const [keyword, setKeyword] = useState(null);
  const [nameGroup, setNameGroup] = useState(null);
  const [listChoose, setListChoose] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const currentUser = useSelector((state) => state.currentUser);

  const handleSetCheckbox = useCallback(
    (value) => {
      if (!listChoose.find((x) => x.Id === value.Id)) {
        let a = [
          ...listChoose,
          {
            ...value,
            isSinhVien: activeIndex === 0,
          },
        ];
        setListChoose(a);
      } else {
        let temp = listChoose;
        let idx = temp.findIndex((x) => x === value).Id;
        if (idx !== -1) {
          temp.splice(idx, 1);
          setListChoose(temp);
        }
      }
      setRefresh(!refresh);
    },
    [refresh]
  );

  const RenderItem = ({ item }) =>
    useMemo(() => {
      return (
        <TouchableOpacity
          key={item.item.Id}
          style={[ip.container]}
          onPress={() => handleSetCheckbox(item.item)}
        >
          <ThisAvatar
            // url={item.item.Anh}
            size={60}
            name={item.item?.Ten || item.item?.TenNhanVien}
          />
          <View style={[ip.infomation]}>
            <View style={[ip.infomationTop]}>
              <Text style={[ip.infomationText]} numberOfLines={1}>
                {item.item?.Ten || item.item?.TenNhanVien}
              </Text>
            </View>
          </View>
          {listChoose.find((x) => x.Id === item.item.Id) && (
            <AntDesign name="checkcircle" size={20} color="green" />
          )}
        </TouchableOpacity>
      );
    }, []);

  const ITEM_HEIGHT = 100;

  const getItemLayout = useCallback(
    (data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  const handleAcceptGroup = async () => {
    if (!nameGroup) {
      ToastMessage(`Chưa nhập tên nhóm!`);
      return;
    }
    if (listChoose.length === 0) {
      ToastMessage(`Chưa chọn thành viên vào nhóm!`);
      return;
    }
    let obj = {
      Ten: nameGroup,
      IdChuRoom: currentUser.Id,
      isGroup: true,
      listLop: [],
      listUser: [
        {
          IdUser: currentUser.Id,
          TenUser: currentUser.TenNhanVien,
          isSinhVien: false,
        },
        ...listChoose.map((x) => {
          return {
            IdUser: x.Id,
            TenUser: x.Ten || x.TenNhanVien,
            isSinhVien: x?.isSinhVien,
          };
        }),
      ],
    };
    let res = await ChatService.ServiceChat.SetRoom(obj);
    if (res) {
      nav.pop(Screens.ChatGroupPage);
      nav.navigate(Screens.ChatPersonalPage, {
        props: {
          ...props,
          item: {
            item: res.Data,
          },
        },
      });
    }
  };

  const getDataFlatlist = useMemo(() => {
    let _listGiaoVien = listGiaoVien.filter((x) => x.Id !== currentUser.Id);
    return keyword
      ? activeIndex === 0
        ? listUserCanChat.ListSinhVien.filter((x) =>
            x.Ten.toLowerCase().trim().includes(keyword)
          )
        : _listGiaoVien.filter((x) =>
            x.TenNhanVien.toLowerCase().trim().includes(keyword)
          )
      : activeIndex === 0
      ? listUserCanChat.ListSinhVien
      : _listGiaoVien;
  }, [keyword, activeIndex]);

  return (
    <>
      <SafeAreaView style={tc.container}>
        <HeaderBack header={Screens.TaoNhom} />
        <View style={{ width: "100%", alignItems: "center" }}>
          <View
            style={[
              {
                marginTop: 10,
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <View>
              <ThisAvatar size={60} name={`G`} />
            </View>
            <View
              style={{
                flex: 1,
                paddingLeft: 10,
              }}
            >
              <TextInput
                value={nameGroup}
                var="standard"
                color={Colors.Primary}
                placeholder="Nhập tên nhóm"
                onChangeText={setNameGroup}
              />
            </View>
          </View>
          <View
            style={[
              {
                marginTop: 10,
                width: "90%",
              },
            ]}
          >
            <FindInput
              props={{
                value: keyword,
                onChangeText: (e) => {
                  setKeyword(e);
                },
              }}
            />
            {listChoose.length > 0 && (
              <View
                style={{
                  height: 80,
                }}
              >
                <ScrollView horizontal scrollEventThrottle={16}>
                  {listChoose.map((x) => {
                    return (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          margin: 5,
                        }}
                      >
                        <TouchableOpacity onPress={() => handleSetCheckbox(x)}>
                          <ThisAvatar
                            // url={item.item.Anh}
                            size={60}
                            name={x.Ten || x?.TenNhanVien}
                          />
                          <FontAwesome
                            name="times-circle"
                            size={24}
                            color="red"
                            style={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              backgroundColor: "#fff",
                              zIndex: 2,
                              borderRadius: 50,
                            }}
                          />
                        </TouchableOpacity>
                        <Text>
                          {getFirstCharacterByName(
                            x.Ten || x.TenNhanVien,
                            true
                          )}
                        </Text>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            )}
            <View style={[group.container]}>
              <TouchableOpacity
                style={[
                  group.button,
                  { backgroundColor: activeIndex === 0 ? "#ccc" : null },
                ]}
                onPress={() => setActiveIndex(0)}
              >
                <Text>Sinh viên</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  group.button,
                  { backgroundColor: activeIndex === 1 ? "#ccc" : null },
                ]}
                onPress={() => setActiveIndex(1)}
              >
                <Text>Giáo viên</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ padding: 3 }}>Gợi ý: </Text>
            <FlatList
              style={{
                maxHeight: listChoose.length ? height / 1.8 : height / 1.53,
              }}
              maxToRenderPerBatch={30}
              windowSize={21}
              initialNumToRender={10}
              data={getDataFlatlist}
              showsVerticalScrollIndicator={false}
              renderItem={(item) => <RenderItem item={item} />}
              getItemLayout={getItemLayout}
              keyExtractor={(item, index) => createGuid()}
              ListFooterComponent={<View></View>}
              ListEmptyComponent={
                <View>
                  <Text>Không có dữ liệu..!</Text>
                </View>
              }
            />
          </View>
          {getDataFlatlist && (
            <Button
              text={TextButton.Accept}
              onPress={() => {
                handleAcceptGroup();
              }}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export const ChatPersonalPage = ({ route }) => {
  const { props } = route.params;
  const refFlatlist = useRef();
  const currentUser = useSelector((state) => state.currentUser);
  const [currentRoom, setCurrentRoom] = useState({});
  const [listUserOnline, setListUserOnline] = useState([]);
  const [listMessage, setListMessage] = useState([]);
  const [currentMess, setCurrentMess] = useState({ Message: "", listFile: [] });
  const [loadMore, setLoadMore] = useState(false);

  const socketRef = useRef();

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      scrollToEnd();
    });
    setCurrentRoom(props.item.item);
  }, []);

  const scrollToEnd = () => {
    refFlatlist.current?.scrollToEnd();
  };

  //#region handle
  const JoinRoom = async (room) => {
    LeaveRoom();
    let payload = { IdRoom: props.item.item.Id, IdMessageFirst: "" };
    let _listMessage = await ChatService.ServiceChat.GetMessagesOfRoom(payload);
    if (_listMessage?.Data) {
      setListMessage(_listMessage?.Data);
      setTimeout(() => {
        scrollToEnd();
      }, 100);
    }
    socketRef.current.emit("joinRoom", {
      userid: currentUser.Id,
      username: currentUser.UserName,
      room: currentRoom,
    });
  };
  const LeaveRoom = () => {
    socketRef.current.emit("leaveRoom", {});
  };
  const ChatMessage = () => {
    if (!currentMess.Message) return;
    socketRef.current.emit("chatMessage", currentMess);
    setCurrentMess({ Message: "", listFile: [] });
    if (listMessage.length) refFlatlist.current.scrollToEnd();
  };

  useEffect(() => {
    socketRef.current = socket;

    function onConnect() {
      // setIsConnected(true);
    }

    function onDisconnect() {
      // setIsConnected(false);
    }

    function onFooEvent(value) {
      // setFooEvents(previous => [...previous, value]);
    }
    function onMessageEvent(value) {
      setListMessage((previous) => [...previous, value]);
      // scrollToBottom();
    }
    function onRoomUsersEvent(value) {
      setListUserOnline(value.users);
    }
    socketRef.current.connect();

    // JoinRoom();

    socketRef.current.on("connect", onConnect);
    socketRef.current.on("disconnect", onDisconnect);
    socketRef.current.on("message", onMessageEvent);
    socketRef.current.on("roomUsers", onRoomUsersEvent);
    socketRef.current.on("foo", onFooEvent);
    return () => {
      socketRef.current.off("connect", onConnect);
      socketRef.current.off("disconnect", onDisconnect);
      socketRef.current.off("message", onMessageEvent);
      socketRef.current.off("roomUsers", onRoomUsersEvent);
      socketRef.current.off("foo", onFooEvent);
      socketRef.current.disconnect();
    };
  }, []);

  const getMoreMessages = async () => {
    let payload = {
      IdRoom: currentRoom.Id,
      IdMessageFirst: listMessage[0]?.Id,
    };
    let res = await ChatService.ServiceChat.GetMessagesOfRoom(payload);
    if (res?.Data.length) {
      setLoadMore(true);
      setListMessage([...res?.Data, ...listMessage]);
    }
    setTimeout(() => {
      setLoadMore(false);
    }, 2000);
  };

  useEffect(() => {
    if (currentRoom?.Id) JoinRoom();
  }, [currentRoom]);
  //#endregion API

  return (
    <SafeAreaView style={[cpp.container]}>
      <HeaderTitle
        props={{ currentRoom: currentRoom, currentUser: currentUser }}
      />
      <KeyboardAvoidingView
        // behavior="padding"
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        {loadMore && (
          <View
            style={{
              position: "absolute",
              top: 10,
              left: 0,
              width: "100%",
              zIndex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                width: 100,
                height: 30,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                }}
              >
                Đang tải ...
              </Text>
            </View>
          </View>
        )}
        <View style={[cpp.body]}>
          {listMessage.length === 0 && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: height / 2,
              }}
            >
              <Text>Bắt đầu cuộc trò chuyện với 1 tin nhắn...</Text>
            </View>
          )}
          {listMessage.length > 0 && (
            <FlatList
              ref={refFlatlist}
              data={listMessage}
              maxToRenderPerBatch={30}
              windowSize={21}
              initialNumToRender={10}
              // refreshing={refresh}
              // onRefresh={onRefresh}
              onScroll={(e) => {
                let posY = e.nativeEvent.contentOffset.y;
                if (posY === 0) {
                  getMoreMessages();
                }
              }}
              renderItem={(item) => {
                let _TYPE = getTypeToDate(item.item.Created);
                let _OBJDATE = {
                  type: _TYPE,
                  isAnotherDate: item.item.Created ? true : false,
                };
                if (item.index === 0) {
                  if (item.item.IdUser !== currentUser.Id) {
                    return (
                      <AnotherBoxChat props={{ item: item, type: _OBJDATE }} />
                    );
                  }
                  return <MyBoxChat props={{ item: item, type: _OBJDATE }} />;
                }
                let prevMess = listMessage[item.index - 1];
                let _TYPE_PREV = getTypeToDate(prevMess.Created);
                if (_TYPE === _TYPE_PREV) {
                  _OBJDATE = {
                    ..._OBJDATE,
                    isAnotherDate: false,
                  };
                }
                if (item.item.IdUser === prevMess.IdUser) {
                  if (item.item.IdUser !== currentUser.Id) {
                    return (
                      <AnotherBoxChat
                        props={{
                          item: item,
                          isOnePerson: true,
                          type: _OBJDATE,
                        }}
                      />
                    );
                  }
                } else {
                  if (item.item.IdUser !== currentUser.Id) {
                    return (
                      <AnotherBoxChat props={{ item: item, type: _OBJDATE }} />
                    );
                  }
                }
                return <MyBoxChat props={{ item: item, type: _OBJDATE }} />;
              }}
              keyExtractor={(item, index) => `ListChat` + item.item?.Created}
              ListEmptyComponent={ListEmptyComponent}
              ListFooterComponent={
                <View style={{ width: "100%", height: 10 }}></View>
              }
            />
          )}
        </View>
        <View style={[cpp.footer]}>
          <MyCustomTextInput
            props={{
              handleSend: ChatMessage,
              currentMess: currentMess,
              setCurrentMess: setCurrentMess,
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const MyCustomTextInput = ({ props }) => {
  return (
    <View style={[mc.container]}>
      <TouchableOpacity>
        <EvilIcons name="image" size={35} color="black" />
      </TouchableOpacity>
      <MyTextInput
        value={props.currentMess.Message}
        style={[mc.textinput]}
        multiline
        placeholder="Nhập tin nhắn mới.."
        onChangeText={(e) =>
          props.setCurrentMess({
            ...props.currentMess,
            Message: e,
          })
        }
      />
      <TouchableOpacity onPress={props.handleSend}>
        <Ionicons name="send" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const SIZE_ICON = 35;
const MyBoxChat = ({ props }) => {
  return (
    <>
      {props.type.isAnotherDate && (
        <View style={[b.containerTime]}>
          <View style={[b.TimeHr]}></View>
          <View style={[b.Time]}>
            <Text style={[b.TimeText]}>{props.type.type}</Text>
          </View>
        </View>
      )}

      <View style={[b.container]}>
        <View style={[b.wrap, b.myWrap]}>
          <View style={[b.messageArea, b.myMessage]}>
            <Text style={[b.message]}>{props.item.item.Message}</Text>
            <View style={[b.TimeWrap]}>
              <Text style={[b.messageTime]}>
                {props.item.item.Created &&
                  formatDateStringGMT(props.item.item.Created, "hh:mm")}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
const AnotherBoxChat = ({ props }) => {
  return (
    <>
      {props.type.isAnotherDate && (
        <View style={[b.containerTime]}>
          <View style={[b.TimeHr]}></View>
          <View style={[b.Time]}>
            <Text style={[b.TimeText]}>{props.type.type}</Text>
          </View>
        </View>
      )}
      <View style={[b.container]}>
        <View style={[b.wrap]}>
          <View style={{ width: 40 }}>
            {!props.isOnePerson && (
              <ThisAvatar
                // url={"/"}
                size={40}
                name={getFirstCharacterByName(props.item.item.TenUser)}
              />
            )}
          </View>
          <View style={[b.messageArea]}>
            <Text style={[b.message]}>{props.item.item.Message}</Text>
            <View style={[b.TimeWrap]}>
              <Text style={[b.messageTime]}>
                {props.item.item.Created &&
                  formatDateStringGMT(props.item.item.Created, "hh:mm")}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const HeaderTitle = ({ props }) => {
  const nav = useNavigation();
  const _thisRoom = useMemo(() => {
    let obj = {
      TenRoom: null,
      Avatar: null,
      isGroup: props.currentRoom.isGroup,
    };
    if (obj.isGroup) {
      obj = {
        ...obj,
        TenRoom: props.currentRoom.Ten,
      };
    } else {
      let Its = props.currentRoom.listUser?.filter(
        (x) => x.IdUser !== props.currentUser.Id
      );
      if (Its && Its.length) {
        obj = {
          ...obj,
          TenRoom: Its[0].TenUser,
          Avatar: Its[0]?.Avatar,
        };
      }
    }
    return obj;
  }, [props.currentRoom, props.currentUser]);

  return (
    <View style={[cpp.head.container]}>
      <TouchableOpacity
        style={[cpp.head.headerArrow]}
        onPress={() => {
          nav.navigate(Screens.Chat);
        }}
      >
        <View>
          <MaterialIcons name="arrow-back-ios" size={SIZE_ICON} color="black" />
        </View>
      </TouchableOpacity>
      <View style={[cpp.head.header]}>
        <View style={[cpp.ht.container]}>
          <View style={[cpp.ht.wrap]}>
            <ThisAvatar size={50} name={_thisRoom.TenRoom ?? ``} />
            <View>
              <Text style={[cpp.ht.text]} numberOfLines={1}>
                {_thisRoom?.TenRoom}
              </Text>
              {_thisRoom?.isGroup && (
                <Text style={[cpp.ht.text, { fontSize: 13 }]}>
                  {props.currentRoom.listUser.length} thành viên
                </Text>
              )}
            </View>
          </View>
          <View style={[cpp.ht.wrap]}>
            <TouchableOpacity>
              <Octicons name="search" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                nav.navigate(Screens.TuyChon, {
                  props: {
                    ...props,
                    _thisRoom: _thisRoom,
                  },
                });
              }}
            >
              <Entypo name="dots-three-vertical" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const mc = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50,
    paddingLeft: 5,
    paddingRight: 5,
  },
  textinput: {
    flex: 1,
    fontSize: 18,
    padding: 5,
    alignItems: "center",
  },
});
const b = StyleSheet.create({
  container: {
    width: "100%",
  },
  wrap: {
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: 5,
    marginTop: 0,
    marginBottom: 0,
    borderRadius: 5,
    padding: 5,
    paddingBottom: 0,
  },
  myWrap: {
    justifyContent: "flex-end",
  },
  messageArea: {
    backgroundColor: "rgb(242, 238, 238)",
    borderTopLeftRadius: 0,
    borderRadius: 5,
    padding: 5,
    paddingRight: 10,
    maxWidth: "80%",
  },
  myMessage: {
    backgroundColor: "#D9E8FF",
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 0,
  },
  message: {
    fontSize: 16,
  },
  TimeWrap: {
    flexDirection: "row",
    // justifyContent: "flex-end",
  },
  messageTime: {
    fontSize: 12,
    color: `#636363`,
  },
  containerTime: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  TimeHr: {
    height: 0.8,
    width: "90%",
    backgroundColor: "#ccc",
  },
  Time: {
    position: "absolute",
    bottom: -12,
    backgroundColor: "#f2f2f2",
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
  },
  TimeText: {
    fontSize: 12,
  },
});
const cpp = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  head: {
    container: {
      width: "100%",
      height: 50,
      flexDirection: "row",
      justifyContent: "flex-end",
      position: "relative",
      backgroundColor: `#EDEAEA`,
    },
    header: {
      width: "90%",
      height: "100%",
    },
    headerArrow: {
      position: "absolute",
      left: 10,
      top: 5,
    },
    headerText: {
      fontSize: 20,
      fontWeight: 600,
      textAlign: "center",
    },
  },
  ht: {
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    wrap: {
      flexDirection: "row",
      alignItems: "center",
    },
    text: {
      fontSize: 20,
      paddingLeft: 5,
    },
  },
  body: {
    width: "100%",
    flex: 1,
  },
  footer: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
  },
});

const ip = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 50,
    // backgroundColor: "#F1EDED",
    marginBottom: 5,
    paddingBottom: 5,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#E1DDDD",
  },
  avatar: {
    backgroundColor: null,
  },
  infomation: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
  },
  infomationTop: {
    flexDirection: "row",
  },
  infomationText: {
    fontSize: 18,
  },
  infomationBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infomationTextMessage: {
    color: `#636363`,
    flex: 2,
    fontSize: 15,
  },
  infomationTextDate: {
    color: `#636363`,
    flex: 1,
    textAlign: "right",
    fontSize: 15,
  },
});

const s = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 10,
    // justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18,
  },
  headerFind: {
    marginTop: 5,
  },
  headerFindInput: {
    height: 40,
  },
  body: {
    marginTop: 5,
  },
  headerButton: {
    marginRight: 5,
  },
});

const ThisAvatar = ({ url, size, name }) => {
  const baseurl = useSelector((state) => state.baseurl);
  return url ? (
    <Avatar.Image
      size={size ?? 30}
      // source={require("../../resources/avatar-student.png")}
      source={{ uri: baseurl + url }}
      style={[ip.avatar]}
    />
  ) : (
    <Avatar.Text
      label={getFirstCharacterByName(name)}
      size={size - 5 ?? 15}
      color="#fff"
    />
  );
};

export const ChatCustomPage = ({ route }) => {
  const { props } = route.params;
  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(false);
  };

  return (
    <SafeAreaView style={tc.container}>
      <HeaderBack header={Screens.TuyChon} />
      <View style={[tc.infoArea]}>
        <ThisAvatar size={80} name={props._thisRoom.TenRoom} />
        <Text numberOfLines={1} style={[tc.infoArea.text]}>
          {props._thisRoom.TenRoom}
        </Text>
      </View>
      {!props._thisRoom.isGroup && (
        <View style={[tc.bodyArea]}>
          <TouchableOpacity style={[tc.bodyArea.button]}>
            <EvilIcons name="pencil" size={30} color="black" />
            <Text style={[tc.bodyArea.text]} numberOfLines={1}>
              Đổi tên gợi nhớ
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={[tc.bodyArea]}>
        <TouchableOpacity style={[tc.bodyArea.button]}>
          <EvilIcons name="image" size={30} color="black" />
          <Text style={[tc.bodyArea.text]} numberOfLines={1}>
            Ảnh, file, link đã gửi
          </Text>
        </TouchableOpacity>
      </View>
      {props._thisRoom.isGroup && (
        <View style={[tc.bodyArea]}>
          <TouchableOpacity
            style={[tc.bodyArea.button]}
            onPress={() => setVisible(true)}
          >
            <EvilIcons name="pencil" size={30} color="black" />
            <Text style={[tc.bodyArea.text]} numberOfLines={1}>
              Thành viên nhóm
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <ModalGeneral
        isVisible={visible}
        onClose={onClose}
        children={
          <>
            <View style={{ width: "100%" }}>
              <FlatList
                style={{
                  maxHeight: 500,
                }}
                maxToRenderPerBatch={30}
                windowSize={21}
                initialNumToRender={10}
                data={props.currentRoom.listUser}
                showsVerticalScrollIndicator={false}
                renderItem={(item) => (
                  <>
                    <View style={[ip.container]}>
                      <ThisAvatar
                        url={"/"}
                        size={80}
                        name={item.item.TenUser}
                      />
                      <View style={[ip.infomation]}>
                        <View style={[ip.infomationTop]}>
                          <Text style={[ip.infomationText]} numberOfLines={1}>
                            {item.item.TenUser}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </>
                )}
                keyExtractor={(item, index) =>
                  `ListUserInChat` + item.item?.TenUser
                }
                ListFooterComponent={<View></View>}
              />
            </View>
          </>
        }
        isShowHeader={false}
      />
    </SafeAreaView>
  );
};

const tc = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  infoArea: {
    alignItems: "center",
    padding: 50,
    text: {
      fontSize: 20,
      fontWeight: 600,
    },
  },
  bodyArea: {
    flexDirection: "column",
    height: 50,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    button: {
      flexDirection: "row",
      alignItems: "center",
    },
    text: {
      fontSize: 20,
      marginLeft: 10,
    },
  },
});
