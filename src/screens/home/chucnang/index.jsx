import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Colors, Screens, height, width } from "../../../common/constant";
import { TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";

const SIZE_ICON = 50;
// 1 page - max 6 item
const COMPONENTS_WITHPAGES = [
  {
    page: 1,
    components: [
      {
        label: `Đăng ký học phần`,
        icon: (
          <Image
            source={require("../../../resources/icons/color-calendar.png")}
            style={{ width: SIZE_ICON, height: SIZE_ICON }}
            resizeMode="stretch"
          />
          // <MaterialCommunityIcons
          //   name="calendar-edit"
          //   size={SIZE_ICON}
          //   color={Colors.Primary}
          // />
        ),
        onPress: (nav) => {
          // nav.navigate(Screens.Setting);
        },
      },
      {
        label: `Đăng ký học lại`,
        icon: (
          <Image
            source={require("../../../resources/icons/color-register.png")}
            style={{ width: SIZE_ICON, height: SIZE_ICON }}
            resizeMode="stretch"
          />
          // <FontAwesome5
          //   name="dollar-sign"
          //   size={SIZE_ICON}
          //   color={Colors.Primary}
          // />
        ),
        onPress: (nav) => {},
      },
      {
        label: `Kế hoạch đào tạo`,
        icon: (
          <Image
            source={require("../../../resources/icons/color-book.png")}
            style={{ width: SIZE_ICON, height: SIZE_ICON }}
            resizeMode="stretch"
          />
          // <AntDesign name="book" size={SIZE_ICON} color={Colors.Primary} />
        ),
        onPress: (nav) => {
          nav.push(Screens.TrainingPlan);
        },
      },
      {
        label: `Điểm danh`,
        icon: (
          <Image
            source={require("../../../resources/icons/color-checkpoint.png")}
            style={{ width: SIZE_ICON, height: SIZE_ICON }}
            resizeMode="stretch"
          />
          // <FontAwesome5
          //   name="user-clock"
          //   size={SIZE_ICON}
          //   color={Colors.Primary}
          // />
        ),
        onPress: (nav) => {
          nav.navigate(Screens.Attendance);
        },
      },
      {
        label: `Bảng điểm`,
        icon: (
          <Image
            source={require("../../../resources/icons/color-point.png")}
            style={{ width: SIZE_ICON, height: SIZE_ICON }}
            resizeMode="stretch"
          />
          // <MaterialCommunityIcons
          //   name="book-refresh"
          //   size={SIZE_ICON}
          //   color={Colors.Primary}
          // />
        ),
        onPress: (nav) => {
          nav.navigate(Screens.Academic);
        },
      },
      {
        label: `Hồ sơ cá nhân`,
        icon: (
          <Image
            source={require("../../../resources/icons/color-profile.png")}
            style={{ width: SIZE_ICON, height: SIZE_ICON }}
            resizeMode="stretch"
          />
          // <MaterialIcons
          //   name="assessment"
          //   size={SIZE_ICON}
          //   color={Colors.Primary}
          // />
        ),
        onPress: (nav) => {
          nav.navigate(Screens.Personal);
        },
      },
    ],
  },
  {
    page: 2,
    components: [
      {
        label: `Đăng ký học phần`,
        icon: (
          <Image
            source={require("../../../resources/icons/color-calendar.png")}
            style={{ width: SIZE_ICON, height: SIZE_ICON }}
            resizeMode="stretch"
          />
          // <MaterialCommunityIcons
          //   name="calendar-edit"
          //   size={SIZE_ICON}
          //   color={Colors.Primary}
          // />
        ),
        onPress: (nav) => {},
      },
      {
        label: `Đóng học phí`,
        icon: (
          <Image
            source={require("../../../resources/icons/color-money.png")}
            style={{ width: SIZE_ICON, height: SIZE_ICON }}
            resizeMode="stretch"
          />
          // <FontAwesome5
          //   name="dollar-sign"
          //   size={SIZE_ICON}
          //   color={Colors.Primary}
          // />
        ),
        onPress: (nav) => {},
      },
      {
        label: `Chương trình đào tạo`,
        icon: (
          <Image
            source={require("../../../resources/icons/color-book.png")}
            style={{ width: SIZE_ICON, height: SIZE_ICON }}
            resizeMode="stretch"
          />
          // <AntDesign name="book" size={SIZE_ICON} color={Colors.Primary} />
        ),
        onPress: (nav) => {},
      },
      {
        label: `Xin bảo lưu`,
        icon: (
          <Image
            source={require("../../../resources/icons/color-time-paper.png")}
            style={{ width: SIZE_ICON, height: SIZE_ICON }}
            resizeMode="stretch"
          />
          // <FontAwesome5
          //   name="user-clock"
          //   size={SIZE_ICON}
          //   color={Colors.Primary}
          // />
        ),
        onPress: (nav) => {},
      },
      {
        label: `Chuyển lớp/chuyển ngành`,
        icon: (
          <Image
            source={require("../../../resources/icons/color-change.png")}
            style={{ width: SIZE_ICON, height: SIZE_ICON }}
            resizeMode="stretch"
          />
          // <MaterialCommunityIcons
          //   name="book-refresh"
          //   size={SIZE_ICON}
          //   color={Colors.Primary}
          // />
        ),
        onPress: (nav) => {},
      },
      {
        label: `Đánh giá rèn luyện`,
        icon: (
          <Image
            source={require("../../../resources/icons/color-note.png")}
            style={{ width: SIZE_ICON, height: SIZE_ICON }}
            resizeMode="stretch"
          />
          // <MaterialIcons
          //   name="assessment"
          //   size={SIZE_ICON}
          //   color={Colors.Primary}
          // />
        ),
        onPress: (nav) => {},
      },
    ],
  },
];

export default function ChucNangComponent() {
  return (
    <View style={[styles.container]}>
      <Swiper>
        {COMPONENTS_WITHPAGES.map((x, index) => {
          return <Component_Page key={index} lstData={x.components} {...x} />;
        })}
      </Swiper>
    </View>
  );
}

const Component_Page = ({ lstData }) => {
  const nav = useNavigation();
  return (
    <View style={[components.container]}>
      {lstData.map((x, idx) => {
        return (
          <View style={[components.box, { ...styles.shadow }]} key={idx}>
            <TouchableOpacity
              style={[components.item]}
              onPress={() => x.onPress(nav)}
            >
              <View style={[components.itemView]}>
                {x.icon}
                <Text style={[components.itemViewText]}>{x.label}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 250,
    marginLeft: 10,
    marginRight: 10,
  },
  wrapper: {},
  shadow: {
    shadowColor: "#636363", // IOS
    shadowOffset: { height: 2, width: 1 }, // IOS
    shadowOpacity: 2, // IOS
    shadowRadius: 2, //IOS
    elevation: 20, // Android
  },
});
const components = StyleSheet.create({
  container: {
    width: width,
    height: height / 4,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  box: {
    width: "33%",
    height: 105,
    padding: 5,
  },
  item: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#cfe2ff",
    justifyContent: "center",
  },
  itemView: {
    alignItems: "center",
    justifyContent: "center",
  },
  itemViewText: {
    color: Colors.Primary,
    fontSize: 14,
    fontWeight: 600,
    textAlign: "center",
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
