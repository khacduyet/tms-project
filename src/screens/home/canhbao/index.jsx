import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../../../common/constant";
import { useEffect, useState } from "react";
import { QuyTrinhServices } from "../../../services/danhmuc.service";
import { createGuid } from "../../../common/common";

const SIZE_ICON = 24;
export default function MonHocCanhBaoComponent() {
  const nav = useNavigation();
  const [listCanhBao, setListCanhBao] = useState([]);

  const getListCanhBao = async () => {
    let res = await QuyTrinhServices.SinhVien.GetMonHocCanhBaoOfSinhVien({});
    if (res) {
      // if (res.length === 0) {
      //   res = [{}, {}, {}, {}];
      // }
      setListCanhBao(res);
    }
  };

  useEffect(() => {
    getListCanhBao();
  }, []);

  return listCanhBao.length ? (
    <View style={[styles.container]}>
      <View style={[styles.wrap]}>
        <Pressable
          style={[styles.header]}
          onPress={() => {
            nav.push(Screens.TestSchedule, {
              title: `Lịch thi học kỳ I 2022-2023`,
            });
          }}
        >
          <Image
            source={require("../../../resources/icons/color-alarm.png")}
            style={{ width: SIZE_ICON, height: SIZE_ICON }}
            resizeMode="stretch"
          />
          {/* <Feather name="bookmark" size={24} color="black" /> */}
          <Text style={[styles.headerText]}>Môn học cảnh báo</Text>
          <Feather
            name="arrow-right-circle"
            size={24}
            color="blue"
            style={[styles.headerArrow]}
          />
        </Pressable>
        <View style={[styles.body]}>
          {listCanhBao.map((x) => {
            return <Item item={x} key={() => createGuid()} />;
          })}
        </View>
      </View>
    </View>
  ) : null;
}

const Item = ({ item }) => {
  return (
    <View style={[styles.bodyWrap]}>
      <Image
        source={require("../../../resources/icons/open-book.png")}
        style={{ width: SIZE_ICON, height: SIZE_ICON }}
        resizeMode="stretch"
      />
      <Text style={[styles.bodyWrapText, styles.bodyText]}>
        Đại số tuyến tính
      </Text>
      <Text style={[styles.bodyWrapNote, styles.bodyText]}>2 TC</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // height: height / 7,
    alignItems: "center",
    justifyContent: "center",
  },
  wrap: {
    width: "95%",
    // height: "90%",
    // backgroundColor: "#565656",
    borderRadius: 5,
    borderWidth: 0.3,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#cfe2ff",
    alignItems: "center",
    padding: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 600,
    paddingLeft: 5,
  },
  headerArrow: {
    position: "absolute",
    right: 5,
    top: 3,
  },
  body: { padding: 5 },
  bodyWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  bodyIcon: {},
  bodyWrapText: {
    paddingLeft: 5,
  },
  bodyText: {
    color: "red",
    fontSize: 16,
  },
  bodyWrapNote: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});
