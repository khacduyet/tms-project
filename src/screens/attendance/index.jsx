import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderBack from "../../common/header";
import { Button } from "../../common/components";
import { Colors, Screens, height } from "../../common/constant";
import { StyleSheet } from "react-native";
import DropDown from "../accademics/share-componet/DropDown/DropDown";
import { listKy, listNam } from "../accademics/tab/bang-diem";
import { useEffect, useState } from "react";
import { _Modalize, DesistArea } from "../schedules/testSchedule";
import { QuyTrinhServices } from "../../services/danhmuc.service";

const SIZE_ICON = 24;

const ListEmptyComponent = (
  <View
    style={{
      alignItems: "center",
      justifyContent: "center",
      height: height / 2,
    }}
  >
    <Text>không có dữ liệu...</Text>
  </View>
);
const ListFooterComponent = (
  <View
    style={{
      width: "100%",
      height: 300,
      alignItems: "center",
      justifyContent: "flex-start",
    }}
  >
    <Text>Chúc bạn có một ngày học tập tốt...</Text>
  </View>
);

export default function AttendancePage() {
  const [listDiemDanh, setListDiemDanh] = useState([]);
  const [object, setObject] = useState({
    Nam: null,
    Ky: listKy[0].value,
  });

  const [visible, setVisible] = useState(false);

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const getListDiemDanh = async () => {
    let res = await QuyTrinhServices.SinhVien.GetDiemDanhOfSinhVien(object);
    if (res) {
      // console.log("res", res);
      // fake dữ liệu
      if (res.length === 0) {
        res = [...Array(5)];
      }
      // end fake dữ liệu
      setListDiemDanh(res);
    }
  };

  useEffect(() => {
    getListDiemDanh();
  }, [object]);

  return (
    <SafeAreaView style={[styles.container]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <HeaderBack header={Screens.Attendance} />
        <View style={[styles.wrapper]}>
          <View style={[styles.header]}>
            <View style={styles.dropdown}>
              <View style={styles.flex}>
                <TouchableOpacity style={styles.justify_content_between}>
                  <View style={styles.left}>
                    <DropDown
                      data={listNam}
                      object={object}
                      setObject={setObject}
                      header={"Nam"}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.justify_content_between}>
                  <View style={styles.right}>
                    <DropDown
                      data={listKy}
                      object={object}
                      setObject={setObject}
                      header={"Ky"}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[b.wrapper]}>
            <FlatList
              data={listDiemDanh}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={handleOpen}>
                  <ItemTestSchedule item={item} style={items} />
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
              ListEmptyComponent={ListEmptyComponent}
              ListHeaderComponent={
                <View style={{ width: "100%", height: 10 }}></View>
              }
              ListFooterComponent={listDiemDanh.length && ListFooterComponent}
            />
          </View>
        </View>
        <_Modalize
          title={`MH05 - Đại số tuyến tính`}
          visible={visible}
          onOpen={handleOpen}
          onClose={handleClose}
          childrens={
            <View style={{ width: "100%", height: 500 }}>
              <DesistArea />
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const ItemTestSchedule = ({ item, style }) => {
  return (
    <View style={[style.wrap]}>
      <View style={[style.header]}>
        <View style={[style.headerLeft]}>
          <Image
            source={require("../../resources/icons/open-book.png")}
            style={{ width: SIZE_ICON, height: SIZE_ICON, ...styles.iconImage }}
            resizeMode="stretch"
          />
          <Text
            numberOfLines={1}
            style={[style.bodyText, { fontWeight: 600, color: Colors.Danger }]}
          >
            MH04 - Thực hành cơ khí (2TC)
          </Text>
        </View>
        <View style={[style.headerRight]}>
          <Text numberOfLines={1} style={[style.headerRightText]}>
            CNTT01_K43
          </Text>
        </View>
      </View>
      <View style={[style.body]}>
        <View style={[style.bodyItem, { flexDirection: "row" }]}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../resources/icons/reward.png")}
              style={{
                width: SIZE_ICON,
                height: SIZE_ICON,
                ...styles.iconImage,
              }}
              resizeMode="stretch"
            />
            <Text numberOfLines={1} style={[style.headerleftTime]}>
              Tổng số giờ quy định:
            </Text>
          </View>
        </View>
        <View style={[style.bodyItem]}>
          <Image
            source={require("../../resources/icons/hour-glass.png")}
            style={{ width: SIZE_ICON, height: SIZE_ICON, ...styles.iconImage }}
            resizeMode="stretch"
          />
          <Text numberOfLines={1} style={[style.headerleftTime]}>
            Số giờ được nghỉ tối đa:
          </Text>
        </View>
        <View style={[style.bodyItem, { flexDirection: "row" }]}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../resources/icons/user-minus.png")}
              style={{
                width: SIZE_ICON,
                height: SIZE_ICON,
                ...styles.iconImage,
              }}
              resizeMode="stretch"
            />
            <Text numberOfLines={1} style={[style.headerleftTime]}>
              Số giờ đã nghỉ:
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const b = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
  },
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  header: {
    margin: 16,
  },
  flex: {
    flexDirection: "row",
  },
  justify_content_between: {
    flex: 1,
  },
  dropdown: {
    marginBottom: 16,
  },
  left: {
    marginRight: 8,
  },
  right: {
    marginLeft: 8,
  },
  content: {
    marginTop: 16,
    marginBottom: 16,
  },
  marginBottom_16: {
    marginBottom: 16,
  },
});

export const items = {
  wrap: {
    width: "95%",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cfe2ff",
    borderBottomWidth: 1,
    padding: 2,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerLeft: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  headerleftTime: {
    fontWeight: 600,
    paddingLeft: 8,
    fontSize: 12,
  },
  headerRight: {
    flex: 2,
    alignItems: "flex-end",
    fontSize: 12,
  },
  headerRightText: {
    fontWeight: 600,
  },
  body: {
    flexDirection: "column",
    padding: 3,
  },
  bodyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  bodyText: {
    paddingLeft: 8,
  },
};
