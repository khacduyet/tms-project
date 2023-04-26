import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL, Colors, Screens } from "../../common/constant";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import HeaderBack from "../../common/header";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { Badge } from "react-native-paper";
import { getBadgeNotify } from "../../redux/actions/notifyAction";
import { formatDateStringGMT } from "../../common/common";
import { DMGeneralServices } from "../../services/danhmuc.service";
import { ToastMessage } from "../../common/components";

export default function HomeNavBar({ currentUser }) {
  const navigate = useNavigation();
  const nav = useNavigation();
  const notify = useSelector((state) => state.notify);
  const [badge, setBadge] = useState(0);

  const [avatar, setAvatar] = useState({
    isExternal: false,
    url: "../../resources/avatar-student.png",
  });

  const getBadgeNotification = async () => {
    setBadge(notify?.Count);
  };

  const getAvatar = async () => {
    if (currentUser.LinkAnhDaiDien) {
      let url = BASE_URL + currentUser.LinkAnhDaiDien;
      let obj = {
        isExternal: true,
        url: url,
      };
      setAvatar(obj);
    }
  };

  useEffect(() => {
    getBadgeNotification();
  }, [notify?.Count]);

  useEffect(() => {
    getAvatar();
  }, [currentUser.LinkAnhDaiDien]);

  const nameStudent = useMemo(() => {
    if (currentUser.TenNhanVien) {
      let arr = currentUser.TenNhanVien.split(" ");
      return arr.length && arr[arr.length - 1];
    }
    return "";
  }, [currentUser.TenNhanVien]);

  return (
    <>
      <View style={[styles.container]}>
        <View style={[styles.user]}>
          <TouchableOpacity
            style={[styles.button, styles.buttonUser]}
            onPress={() => {
              // navigate.navigate(Screens.Setting)
            }}
          >
            <Image
              style={[styles.avatar]}
              source={
                avatar.isExternal
                  ? { uri: avatar.url }
                  : require(`../../resources/avatar-student.png`)
              }
              resizeMode="stretch"
            />
            <Text style={[styles.buttonText]}>
              Xin chào!{" "}
              <Text style={[styles.buttonText, styles.buttonTextName]}>
                {nameStudent}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.bell]}>
          {/* <TouchableOpacity
            style={[styles.button, styles.buttonBadge]}
            onPress={() => {}}
          >
            <FontAwesome name="qrcode" size={30} color="black" />
          </TouchableOpacity> */}
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity
              style={[styles.button, styles.buttonBadge]}
              onPress={() => {
                nav.push(Screens.Notification);
              }}
            >
              <SimpleLineIcons name="bell" size={25} color="black" />
              {badge > 0 && (
                <Badge style={[styles.buttonTextContainBadge]}>{badge}</Badge>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

export function NotificationPage() {
  const currentUser = useSelector((state) => state.currentUser);
  const [lastId, setLastId] = useState(`0`);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifies, setNotifies] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = async () => {
    let res = await DMGeneralServices.Notification.GetList(
      currentUser.Id,
      lastId
    );
    if (res) {
      let data = res.ListItem;
      if (data.length) {
        let lastId = data[data.length - 1].Id;
        setLastId(`${lastId}`);
        setNotifies([...notifies, ...data]);
      }
    }
    setLoading(false);
  };

  const getMoreNotification = () => {
    setLoading(true);
    getNotification();
  };

  const seenNotification = async (item) => {
    let idx = notifies.findIndex((x) => x.Id === item.Id);
    if (idx !== -1) {
      let temp = notifies[idx];
      temp = {
        ...temp,
        TrangThai: 2,
      };
      notifies[idx] = temp;
      setNotifies(notifies);
    }
    await DMGeneralServices.Notification.Seen(item);
    dispatch(getBadgeNotify());
    setRefresh(!refresh);
  };

  const seenAllNotification = async () => {
    let temp = notifies.map((x) => {
      return {
        ...x,
        TrangThai: 2,
      };
    });
    setNotifies(temp);
    await DMGeneralServices.Notification.SeenAll();
    dispatch(getBadgeNotify());
    setRefresh(!refresh);
    ToastMessage("Đã đọc tất cả");
  };

  const renderFotter = () => {
    return loading ? (
      <View
        style={{
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  const rightItem = () => {
    return (
      <TouchableOpacity
        style={{
          position: "absolute",
          right: "5%",
          top: "10%",
        }}
        onPress={seenAllNotification}
      >
        <Ionicons name="checkmark-done-sharp" size={35} color="black" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[]}>
      <HeaderBack header={Screens.Notification} RightItem={rightItem} />
      <View style={[styles.wrapNotification]}>
        <FlatList
          data={notifies}
          renderItem={({ item }) => (
            <ItemNotification item={item} seenNotification={seenNotification} />
          )}
          keyExtractor={(item) => item.Id}
          ListEmptyComponent={EmptyNotification}
          ListFooterComponent={renderFotter}
          onEndReached={getMoreNotification}
          onEndReachedThreshold={0}
        />
      </View>
    </SafeAreaView>
  );
}

const EmptyNotification = () => {
  return (
    <View>
      <Text>Không có thông báo!</Text>
    </View>
  );
};

const ItemNotification = ({ item, seenNotification }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (item.TrangThai !== 2) {
          seenNotification(item);
        }
      }}
    >
      <View style={[notifies.itemNoti]}>
        <View style={[notifies.header]}>
          <Text style={[notifies.headerText]}>
            {formatDateStringGMT(item.Created, "dd/mm/yyyy hh:mm")}
          </Text>
          {item.TrangThai !== 2 && (
            <Entypo
              name="dot-single"
              size={45}
              color="red"
              style={[notifies.dots]}
            />
          )}
        </View>
        <View style={[notifies.body]}>
          <Text style={[notifies.title]}>{item.TieuDe}</Text>
          <Text style={[notifies.text]}>{item.NoiDung}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    width: "100%",
    height: 50,
    backgroundColor: "#cfe2ff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  bell: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  buttonBadge: {
    position: "relative",
  },
  buttonTextContainBadge: {
    backgroundColor: "red",
    // width: 20,
    // height: 20,
    // borderRadius: 20 / 2,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 5,
    left: 10,
  },
  buttonTextBadge: {
    fontSize: 10,
    color: "#fff",
    fontWeight: 600,
  },
  user: {
    flex: 4,
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  avatar: {
    width: 30,
    height: 30,
  },
  button: {
    height: "100%",
    justifyContent: "center",
    marginRight: 15,
  },
  buttonUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonTextName: {
    fontWeight: 600,
  },
  wrapNotification: {
    // backgroundColor: "#ccc",
    height: "100%",
  },
};

const notifies = {
  itemNoti: {
    width: "95%",
    borderRadius: 5,
    // height: 100,
    backgroundColor: "#E2EAF6",
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    paddingLeft: 10,
    paddingBottom: 15,
  },
  header: {
    borderBottomWidth: 1,
    width: "98%",
    marginBottom: 5,
  },
  headerText: {
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 600,
    // fontStyle: "italic",
  },
  dots: {
    position: "absolute",
    right: -10,
    top: -7,
  },
  body: {
    paddingRight: 10,
  },
  title: {
    fontWeight: 600,
    marginBottom: 5,
    fontSize: 15,
    color: Colors.Primary,
  },
  text: {
    fontSize: 14,
  },
};
