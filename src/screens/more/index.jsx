import {
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Switch,
  ImageBackground,
  Alert,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutSubmit } from "../../redux/actions/loginAction";
import {
  BASE_URL,
  Colors,
  height,
  Screens,
  width,
} from "../../common/constant";
import { Avatar } from "react-native-paper";

export default function HomeMore() {
  const currentUser = useSelector((state) => state.currentUser);

  const [avatar, setAvatar] = useState({
    isExternal: false,
    url: "../../resources/avatar-student.png",
  });

  const getAvatar = async () => {
    if (currentUser.LinkAnhDaiDien) {
      let url = BASE_URL + currentUser.LinkAnhDaiDien;
      let obj = {
        isExternal: true,
        url: url,
      };
      setAvatar(obj);
      await AsyncStorage.setItem("avatarCurrent", url);
    }
  };

  useEffect(() => {
    getAvatar();
  }, [currentUser.LinkAnhDaiDien]);

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.wrapper]}>
        <View style={[styles.navTop]}>
          <ImageBackground
            source={require("../../resources/bg-setting-header.png")}
            resizeMode="stretch"
            style={{ height: "100%", width: "100%", flexDirection: "row" }}
          >
            <View style={[styles.navLeft]}>
              <TouchableOpacity>
                <View style={[styles.navLeftContent]}>
                  <Avatar.Image
                    size={width / 3}
                    source={
                      avatar.isExternal
                        ? { uri: avatar.url }
                        : require(`../../resources/avatar-student.png`)
                    }
                    style={{ backgroundColor: "transparent" }}
                  />
                  {/* <Image
                    style={[styles.avatar]}
                    source={
                      avatar.isExternal
                        ? { uri: avatar.url }
                        : require(`../../resources/avatar-student.png`)
                    }
                    resizeMode="stretch"
                  /> */}
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.navRight]}>
              <Text
                style={[styles.navText, styles.navTextName]}
                numberOfLines={1}
              >
                {currentUser && currentUser.TenNhanVien}
              </Text>
              <Text style={[styles.navText]} numberOfLines={1}>
                MSV: {currentUser && currentUser.MaNhanVien}
              </Text>
              <Text style={[styles.navText]} numberOfLines={1}>
                Lớp: C22-Han-01
              </Text>
              <Text style={[styles.navText]} numberOfLines={1}>
                Khóa: 2022-2025 - Cao đẳng
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={[styles.menuBody]}>
          <BodySetting />
        </View>
      </View>
    </SafeAreaView>
  );
}

function BodySetting() {
  const nav = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert("Thông báo", "Bạn có chắc chắn muốn đăng xuất tài khoản?", [
      {
        text: "Hủy",
        onPress: () => {
          console.log("Người dùng đã hủy thao tác");
        },
      },
      {
        text: "Đồng ý",
        onPress: () => {
          dispatch(logoutSubmit());
        },
      },
    ]);
  };

  const ButtonData = [
    {
      icon: <FontAwesome5 name="user-circle" size={35} color="#1e20e7" />,
      text: Screens.Personal,
      func: () => {
        nav.push(Screens.Personal);
      },
    },
    {
      icon: <Feather name="settings" size={35} color="#1e20e7" />,
      text: Screens.Setting,
      func: () => {
        nav.push(Screens.Setting);
      },
    },
    {
      icon: <Octicons name="info" size={35} color="#1e20e7" />,
      text: Screens.InfoSupport,
      func: () => {},
    },
  ];

  const ButtonItem = ({ icon, text, func, value }) => {
    return (
      <View style={[bodys.wrapper]}>
        <TouchableOpacity style={[bodys.buttonComponent]} onPress={func}>
          <View style={[bodys.wrapperLeft]}>{icon}</View>
          <View style={[bodys.wrapperMiddle]}>
            <Text style={[bodys.wrapperText]}>{text}</Text>
          </View>
          <View style={[bodys.wrapperRight]}>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={35}
              color="#494949"
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[bodys.container]}>
      <ScrollView
        style={[
          {
            width: "100%",
          },
        ]}
      >
        {ButtonData.map((x, index) => {
          return <ButtonItem {...x} key={index} />;
        })}

        <View style={[bodys.wrapper, { marginTop: 40, marginBottom: 40 }]}>
          <TouchableOpacity
            style={[bodys.buttonComponent, bodys.buttonComponentLogout]}
            onPress={handleLogout}
          >
            <View style={[bodys.wrapperMiddleLogout]}>
              <MaterialCommunityIcons name="logout" size={35} color="red" />
              <Text style={[bodys.wrapperText, bodys.wrapperTextLogout]}>
                Đăng xuất
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100%",
  },
  wrapper: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  navTop: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.Primary,
  },
  navLeft: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  navLeftContent: {
    backgroundColor: "#fff",
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 120,
    height: 120,
  },
  navRight: {
    flex: 4,
    justifyContent: "center",
  },
  navText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    paddingTop: 5,
    paddingLeft: 10,
  },
  navTextName: {
    fontSize: 22,
  },
  menuBody: {
    flex: 4,
  },
};

const bodys = {
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    paddingTop: 30,
    backgroundColor: "#f3f3f3",
  },
  wrapper: {
    width: "100%",
    height: 50,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonComponent: {
    width: "90%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  buttonComponentLogout: {
    backgroundColor: "#fcdede",
  },
  wrapperLeft: {
    flex: 1,
    alignItems: "flex-end",
  },
  wrapperMiddle: {
    flex: 4,
  },
  wrapperMiddleLogout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapperText: {
    fontSize: 16,
    fontWeight: 500,
    paddingLeft: 20,
  },
  wrapperTextLogout: {
    color: "red",
    paddingLeft: 5,
  },
  wrapperRight: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 10,
  },
  buttonWrap: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    width: "90%",
    borderRadius: 10,
    height: "100%",
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
  },
};
