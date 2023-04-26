import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Image,
  Text,
  // TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import {
  getCurrentUser,
  loginSubmit,
  logoutSubmit,
} from "../../redux/actions/loginAction";
import { SimpleLineIcons } from "@expo/vector-icons";
import Loading from "../loading";
import * as LocalAuthentication from "expo-local-authentication";
import { setLoading } from "../../redux/actions/loadingAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL, Screens, TextButton } from "../../common/constant";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextInput } from "@react-native-material/core";
import { Ionicons } from "@expo/vector-icons";

export default function LoginPage({ navigation }) {
  const handleGetUrl = async () => {
    let url = await AsyncStorage.getItem("BASE_URL");
    if (!url) {
      navigation.navigate(Screens.Tutorials);
    }
  };

  useEffect(() => {
    handleGetUrl();
  }, []);

  const [keyboardShow, setKeyboardShow] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [hasBiometric, setHasBiometric] = useState(null);
  const loading = useSelector((state) => state.loading);
  const [fingerPrint, setFingerPrint] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  //#region Đăng nhập bằng vân tay
  const getFinger = async () => {
    let func = await AsyncStorage.getItem("fingerPrint");
    if (func) {
      let bool = func === "true";
      if (bool && !hasBiometric) {
        await handleBiometricAuth();
      }
      if (bool !== fingerPrint) {
        setFingerPrint(bool);
      }
    }
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardShow(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardShow(false);
    });
  }, []);

  useEffect(() => {
    getFinger();
  }, []);

  useEffect(() => {
    async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    };
  });

  const fallBackToDefaultAuth = () => {
    console.log("fall back to password authentication");
  };

  const handleBiometricAuth = async () => {
    const isBiometricAvail = await LocalAuthentication.hasHardwareAsync();

    if (!isBiometricAvail)
      return alertComponent(
        "Please enter your password",
        "Biometric auth not supported",
        "Ok",
        () => fallBackToDefaultAuth
      );

    let supportedBiometrics;
    if (isBiometricAvail)
      supportedBiometrics =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics)
      return alertComponent(
        "Thông báo",
        "Vân tay không được hỗ trợ trên thiết bị này!",
        "Ok",
        () => fallBackToDefaultAuth()
      );

    const biometricAuth =
      Platform.OS === "ios"
        ? await LocalAuthentication.authenticateAsync()
        : await LocalAuthentication.authenticateAsync({
            promptMessage: "HarmonyES",
            cancelLabel: "cancel",
            disableDeviceFallback: true,
          });

    let account = await AsyncStorage.getItem("account");
    if (biometricAuth.success) {
      setHasBiometric(true);
      dispatch(loginSubmit(JSON.parse(account)));
      navigation.navigate(Screens.Home);
    } else {
      setHasBiometric(false);
      // await AsyncStorage.removeItem("token");
      return;
    }
  };
  //#endregion Đăng nhập bằng vân tay

  return (
    <View style={{ position: "relative" }}>
      {loading.loading && <Loading />}
      <SafeAreaView style={[{ margin: 10 }]}>
        <KeyboardAvoidingView>
          <View style={[styles.container, {}]}>
            <HeaderLogin keyboardShow={keyboardShow} navigation={navigation} />
            <BodyLogin
              keyboardShow={keyboardShow}
              navigation={navigation}
              hasBiometric={hasBiometric}
              handleBiometricAuth={handleBiometricAuth}
              fingerPrint={fingerPrint}
              setFingerPrint={setFingerPrint}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const alertComponent = (title, mess, btnTxt, btnFunc) => {
  return Alert.alert(title, mess, [
    {
      text: btnTxt,
      onPress: btnFunc,
    },
  ]);
};

function BodyLogin({
  keyboardShow,
  navigation,
  hasBiometric,
  handleBiometricAuth,
  fingerPrint,
  setFingerPrint,
}) {
  const nav = useNavigation();
  const [account, setAccount] = useState({
    username: "huongtruongthithien",
    password: "123456",
  });
  const [submitForm, setSubmitForm] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const tokenReducer = useSelector((state) => state.tokenReducer);
  const currentUser = useSelector((state) => state.currentUser);
  const [userRemember, setUserRemember] = useState({
    hasRemember: currentUser && currentUser?.Id ? true : false,
    info: currentUser && currentUser?.Id ? currentUser : null,
  });
  const dispatch = useDispatch();
  const route = useRoute();

  const onChangeText = (value, prop) => {
    if (value !== undefined && value !== null) {
      setAccount({
        ...account,
        [prop]: value,
      });
    }
  };

  const handleLogin = () => {
    setTimeout(() => {
      setSubmitForm(false);
    }, 2000);
    dispatch(setLoading(true));
    dispatch(loginSubmit(account));
  };

  const handleForgotPassword = () => {
    nav.navigate(Screens.ForgotPassword, {
      username: account.username,
    });
  };

  const handleLogout = () => {
    Alert.alert("Thông báo", "Bạn có chắc muốn đổi tài khoản?", [
      {
        text: TextButton.Cancel,
        onPress: () => {},
      },
      {
        text: TextButton.Accept,
        onPress: () => {
          dispatch(logoutSubmit());
          setRefresh(!refresh);
        },
      },
    ]);
  };

  useEffect(() => {
    if (route.name === Screens.Login) {
      dispatch(getCurrentUser());
      if (hasBiometric) {
        navigation.navigate(Screens.Home);
        dispatch(setLoading(false));
        return;
      }
      if (submitForm) {
        if (currentUser && currentUser.TenNhanVien) {
          navigation.navigate(Screens.Home);
          dispatch(setLoading(false));
        }
      }
    }
  }, [tokenReducer, currentUser?.Id, hasBiometric, submitForm]);

  useEffect(() => {
    let userRem = {
      hasRemember: currentUser && currentUser?.Id ? true : false,
      info: currentUser && currentUser?.Id ? currentUser : null,
    };
    if (!userRem.hasRemember) {
      setFingerPrint(false);
    }
    setUserRemember(userRem);
  }, [currentUser?.Id]);

  //#region Lấy avatar
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
  //#endregion Lấy avatar

  return (
    <View
      style={[
        {
          height: keyboardShow ? "50%" : "20%",
          width: "100%",
          flexDirection: "column",
        },
        styles.body,
      ]}
    >
      {userRemember.hasRemember ? (
        <>
          <View style={[{ width: "100%" }, styles.wrapAvatar]}>
            <View>
              <Image
                style={[styles.avatar]}
                source={
                  avatar.isExternal
                    ? { uri: avatar.url }
                    : require(`../../resources/avatar-student.png`)
                }
                resizeMode="stretch"
              />
              <TouchableOpacity
                style={[styles.buttonLogout]}
                onPress={handleLogout}
              >
                <SimpleLineIcons name="logout" size={24} color="red" />
              </TouchableOpacity>
            </View>
            <Text
              style={[
                {
                  paddingTop: 10,
                  fontSize: 16,
                },
              ]}
            >
              Xin chào, {`${currentUser.TenNhanVien}`.toUpperCase()}
            </Text>
          </View>
          <View style={[{ width: "100%", marginTop: 10 }, styles.wrapPassword]}>
            <TextInput
              secureTextEntry={showPass ? false : true}
              style={[styles.inputPassword]}
              onChangeText={(e) => onChangeText(e, "password")}
              value={account.password}
              label="Mật khẩu"
              variant="standard"
            />
            {account.password && (
              <TouchableOpacity
                style={[styles.buttonShowPass]}
                onPress={() => {
                  setShowPass(!showPass);
                }}
              >
                {showPass && <Feather name="eye" size={24} color="black" />}
                {!showPass && (
                  <Feather name="eye-off" size={24} color="black" />
                )}
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <>
          <View style={[{ width: "100%" }, styles.wrapViewInput]}>
            {/* <Text style={styles.label}>Tên tài khoản</Text> */}
            <TextInput
              style={styles.input}
              onChangeText={(e) => onChangeText(e, "username")}
              value={account.username}
              label="Tên tài khoản"
              variant="standard"
            />
          </View>
          <View
            style={[{ width: "100%", marginTop: 10 }, styles.wrapViewInput]}
          >
            {/* <Text style={styles.label}>Mật khẩu</Text> */}
            <TextInput
              secureTextEntry={showPass ? false : true}
              style={styles.input}
              onChangeText={(e) => onChangeText(e, "password")}
              value={account.password}
              label="Mật khẩu"
              variant="standard"
            />
            {account.password && (
              <TouchableOpacity
                style={[styles.buttonShowPass]}
                onPress={() => {
                  setShowPass(!showPass);
                }}
              >
                {showPass && <Feather name="eye" size={24} color="black" />}
                {!showPass && (
                  <Feather name="eye-off" size={24} color="black" />
                )}
              </TouchableOpacity>
            )}
          </View>
        </>
      )}

      <View style={{ height: 50 }}>
        <View style={{ marginTop: 20 }}>
          <View style={{}}>
            <TouchableOpacity
              style={{ width: "100%", height: "100%" }}
              onPress={handleForgotPassword}
            >
              <Text
                style={[
                  {
                    width: "100%",
                    fontSize: 14,
                    color: "#223ffa",
                    textAlign: "center",
                  },
                ]}
              >
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={{
            width: "80%",
            height: 50,
            backgroundColor: "#037bff",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
          }}
          onPress={() => {
            setSubmitForm(true);
            handleLogin();
          }}
        >
          <Text
            style={{
              color: "#fff",
              textTransform: "uppercase",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          {
            width: "100%",
            // height: "40%",
            alignItems: "center",
            position: "relative",
          },
          styles.footer,
        ]}
      >
        {fingerPrint && (
          <TouchableOpacity
            style={{
              width: "80%",
              height: 100,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={handleBiometricAuth}
          >
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Image
                style={{ width: 30, height: 30 }}
                resizeMode="stretch"
                source={require("../../resources/fingerprint.png")}
              />
            </View>
            <Text
              style={{
                marginLeft: 10,
                color: "#000",
                fontSize: 16,
                flex: 3,
              }}
            >
              Đăng nhập bằng vân tay
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Text
        style={{
          position: "absolute",
          bottom: 0,
          right: 10,
          fontSize: 16,
          color: "#939191",
        }}
      >
        @HarmonyES
      </Text>
    </View>
  );
}

// #region
function HeaderLogin({ keyboardShow, navigation }) {
  const handleChangeServer = async () => {
    // await AsyncStorage.removeItem("BASE_URL");
    navigation.navigate(Screens.Tutorials);
  };
  return (
    <View
      style={[
        {
          width: "100%",
          height: keyboardShow ? "40%" : "20%",
          justifyContent: "center",
          alignItems: "center",
        },
        styles.header,
      ]}
    >
      <TouchableOpacity
        style={{ position: "absolute", right: 10, top: 10 }}
        onPress={() => {
          handleChangeServer();
        }}
      >
        <Ionicons name="server" size={15} color="black" />
      </TouchableOpacity>
      {/* <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 10,
          textTransform: "uppercase",
        }}
      >
        Trường cao đẳng kỹ nghệ II
      </Text> */}
      <Image
        style={{ width: 230, height: 60 }}
        resizeMode="stretch"
        source={require("../../resources/logo.png")}
      />
    </View>
  );
}
//#endregion

const styles = {
  container: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 4,
  },

  wrapViewInput: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
  },
  input: {
    width: "80%",
    height: 50,
    // borderBottomWidth: 1,
    borderColor: "grey",
    fontSize: 18,
    padding: 10,
    // textAlign: "center",
  },
  checkbox: {
    width: 23,
    height: 23,
    marginRight: 10,
  },
  button: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapAvatar: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  avatar: {
    width: 70,
    height: 70,
  },
  inputPassword: {
    textAlign: "center",
    // borderColor: "grey",
    width: "80%",
    height: 50,
    fontSize: 18,
    // padding: 10,
  },
  buttonShowPass: {
    position: "absolute",
    right: "10%",
  },
  wrapPassword: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLogout: {
    position: "absolute",
    left: 0,
    bottom: 0,
    backgroundColor: "#fff",
  },
};
