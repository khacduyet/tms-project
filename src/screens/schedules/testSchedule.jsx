import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { Colors, Screens, TextButton } from "../../common/constant";
import HeaderBack from "../../common/header";
import { Modalize } from "react-native-modalize";
import { useRef, useState } from "react";
import { items } from "./index";
import { createGuid } from "../../common/common";
import { FontAwesome } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import { Backdrop } from "react-native-backdrop";
import { ModalMonHoc } from "../../common/modal";

const SIZE_ICON = 24;

const data = [
  {
    Name: `MH04 - Thực hành cơ khí (2TC)`,
    Lop: `CNTT01_K43`,
    DiemTrungBinh: `3.5`,
    SoGioToiDa: `26/20`,
    isPass: false,
  },
  {
    Name: `MH05 - Đại số tuyến tính (2TC)`,
    Lop: `CNTT01_K43`,
    DiemTrungBinh: `4.0`,
    SoGioToiDa: `10/20`,
    isPass: false,
  },
  {
    Name: `MH11 - Tin học đại cương (2TC)`,
    Lop: `CNTT01_K43`,
    DiemTrungBinh: `7.5`,
    SoGioToiDa: `4/15`,
    isPass: true,
  },
  {
    Name: `MH07 - Giáo dục thể chất (1TC)`,
    Lop: `CNTT01_K43`,
    DiemTrungBinh: `9.0`,
    SoGioToiDa: `0/20`,
    isPass: true,
  },
];

const PointArea = () => {
  return (
    <View style={[p.container]}>
      <View style={[p.wrap]}>
        <Text style={[p.title]}>Điểm kiểm tra thường xuyên (HS 1)</Text>
        <View style={[p.items]}>
          <View style={[p.itemsWrap]}>
            <Text style={[p.item]}>8.0</Text>
            <Text style={[p.item]}>7.0</Text>
            <Text style={[p.item]}>5.0</Text>
            <Text style={[p.item]}>__</Text>
            <Text style={[p.item]}>__</Text>
          </View>
        </View>
      </View>
      <View style={[p.wrap]}>
        <Text style={[p.title]}>Điểm kiểm tra định kỳ (HS 2)</Text>
        <View style={[p.items]}>
          <View style={[p.itemsWrap]}>
            <Text style={[p.item]}>7.5</Text>
            <Text style={[p.item]}>__</Text>
            <Text style={[p.item]}>__</Text>
            <Text style={[p.item]}></Text>
            <Text style={[p.item]}></Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const p = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    padding: 10,
  },
  wrap: { marginBottom: 10 },
  title: {
    fontStyle: "italic",
  },
  items: {
    alignItems: "center",
  },
  itemsWrap: {
    flexDirection: "row",
    width: "70%",
  },
  item: {
    flex: 1,
    color: Colors.Primary,
  },
});

export const DesistArea = ({ item }) => {
  const arr = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  return (
    <View style={[d.container]}>
      <View style={[d.topWrap]}>
        <Text style={[d.topWrapText]}>Tổng số giờ nghỉ: 26</Text>
        <Text style={[d.topWrapText]}>Có phép: 5</Text>
        <Text style={[d.topWrapText]}>Không phép: 21</Text>
      </View>
      {/* <View style={[d.midWrap]}>
        <FlatList
          data={arr}
          renderItem={(item) => <DesistItem item={item} />}
          keyExtractor={() => createGuid()}
        />
      </View> */}

      <View style={[{}]}>
        <ScrollView style={[{}]}>
          <View style={[d.midWrap]}>
            {arr.map((_, i) => (
              <DesistItem item={item} key={i} />
            ))}
          </View>
          <View style={{ width: "100%", height: 150 }}></View>
        </ScrollView>
      </View>
    </View>
  );
};

const DesistItem = ({ item }) => {
  return (
    <View style={[d.item]}>
      <View style={[d.headerWrap]}>
        <Text style={[d.headerWrapText, d.text]}>25/03/2023</Text>
      </View>
      <View style={[d.bodyWrap]}>
        <Text style={[d.bodyWrapText, d.text]}>Số giờ nghỉ: 5 (P)</Text>
        <Text style={[d.bodyWrapText, d.text]}>Lý do: Bận việc gia đình</Text>
      </View>
    </View>
  );
};
const d = StyleSheet.create({
  container: {
    width: "100%",
  },
  topWrap: {
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingBottom: 0,
  },
  midWrap: {
    padding: 10,
  },
  topWrapText: {},
  item: {
    width: "100%",
    borderRadius: 5,
    height: 90,
    borderWidth: 1,
    marginBottom: 10,
  },
  headerWrap: {
    width: "100%",
    backgroundColor: `#cfe2ff`,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  bodyWrap: {
    height: 100,
  },
  headerWrapText: {
    padding: 5,
  },
  bodyWrapText: {
    padding: 5,
  },
  text: {
    fontSize: 14,
  },
});

export default function TestSchedule({ route }) {
  const [visible, setVisible] = useState(false);
  const { title } = route.params;

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const onOpen = () => {
    setVisible(true);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <View>
        <HeaderBack header={`ĐIỀU KIỆN THI KẾT THÚC MÔN\n` + title} />
        {data.map((x, index) => {
          return <ItemTestSchedule onOpen={onOpen} item={x} key={index} />;
        })}
      </View>

      <_Modalize
        title={`MH05 - Đại số tuyến tính`}
        visible={visible}
        onOpen={handleOpen}
        onClose={handleClose}
        childrens={
          <View style={{ width: "100%", height: 500 }}>
            <PointArea />
            <Divider />
            <DesistArea />
          </View>
        }
      />
    </SafeAreaView>
  );
}

export const _Modalize = ({ visible, title, onOpen, onClose, childrens }) => {
  return (
    <ModalMonHoc
      isVisible={visible}
      onClose={onClose}
      children={childrens}
      title={title}
    />
  );
};

const ItemTestSchedule = ({ item, onOpen }) => {
  return (
    <TouchableOpacity style={[styles.wrap]} onPress={onOpen}>
      <View style={[styles.header]}>
        <View style={[styles.headerLeft]}>
          <Image
            source={require("../../resources/icons/open-book.png")}
            style={{ width: SIZE_ICON, height: SIZE_ICON, ...styles.iconImage }}
            resizeMode="stretch"
          />
          <Text
            numberOfLines={1}
            style={[styles.bodyText, { fontWeight: 600 }]}
          >
            {/* MH04 - Thực hành cơ khí (2TC) */}
            {item.Name}
          </Text>
        </View>
        <View style={[styles.headerRight]}>
          <Text numberOfLines={1} style={[styles.headerRightText]}>
            {/* CNTT01_K43 */}
            {item.Lop}
          </Text>
        </View>
      </View>
      <View style={[styles.body]}>
        <View style={[styles.bodyItem, { flexDirection: "row" }]}>
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
            <Text
              numberOfLines={1}
              style={[
                styles.headerleftTime,
                { color: item.isPass ? "#000" : "red" },
              ]}
            >
              Điểm trung bình: {item.DiemTrungBinh}
            </Text>
          </View>

          <Text
            numberOfLines={1}
            style={[
              {
                color: item.isPass ? "blue" : "red",
                alignItems: "flex-end",
                fontStyle: "italic",
                fontWeight: 500,
              },
            ]}
          >
            {item.isPass ? `Đủ điều kiện thi` : `Không đủ điều kiện thi`}
          </Text>
        </View>
        <View style={[styles.bodyItem]}>
          <Image
            source={require("../../resources/icons/user-check.png")}
            style={{ width: SIZE_ICON, height: SIZE_ICON, ...styles.iconImage }}
            resizeMode="stretch"
          />
          <Text numberOfLines={1} style={[styles.headerleftTime]}>
            Số giờ tối đa được nghỉ: {item.SoGioToiDa}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ...items,
});
