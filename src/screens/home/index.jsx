import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, FlatList, View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "../../redux/actions/loginAction";
import { setLoading } from "../../redux/actions/loadingAction";
import HomeNavBar from "./navbar";
import { ToastMessage } from "../../common/components";
import { getBadgeNotify } from "../../redux/actions/notifyAction";
import LichHocHomNayComponent from "./lichhochomnay";
import ChucNangComponent from "./chucnang";
import MonHocCanhBaoComponent from "./canhbao";
import BangTinComponent from "./bangtin";

export default function HomePage({ navigation }) {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  function showToast() {
    ToastMessage(`Chào bạn ${currentUser.TenNhanVien}`);
  }

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getBadgeNotify());
    if (currentUser && currentUser.TenNhanVien) {
      showToast();
    }
  }, [currentUser.TenNhanVien]);

  useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  return (
    <ScrollView scrollEventThrottle={16}>
      <View style={[styles.container]}>
        <LichHocHomNayComponent />
        <ChucNangComponent />
        <MonHocCanhBaoComponent />
        <BangTinComponent />
        {/* <Footer /> */}
      </View>
    </ScrollView>
  );
}

const Footer = () => {
  return <View style={{ height: 300, width: "100%" }}></View>;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "blue",
  },
});
