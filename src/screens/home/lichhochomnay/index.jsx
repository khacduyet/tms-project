import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { formatDateStringGMT } from "../../../common/common";
import { Colors, height, Screens, width } from "../../../common/constant";
import { QuyTrinhServices } from "../../../services/danhmuc.service";
import { ItemChildSchedule, ItemSchedule } from "../../schedules";

export default function LichHocHomNayComponent() {
  const nav = useNavigation();
  const [today, setToday] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    let res = await QuyTrinhServices.ThoiKhoaBieu.GetThoiKhoaBieuSVToDay();
    if (res) {
      setToday(res);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={[styles.container]}>
      <ImageBackground
        style={{ width: "100%", height: "100%", borderRadius: 0 }}
        source={require("../../../resources/bg-lichhoc.png")}
        resizeMode="stretch"
      >
        <View style={[styles.header]}>
          <Text style={[styles.headerTitle, styles.textColor]}>
            Lịch học hôm nay ({formatDateStringGMT(new Date(), "dd/mm/yyyy")})
          </Text>
          <TouchableOpacity
            style={[styles.headerButton]}
            onPress={() => {
              nav.navigate(`Schedula`);
            }}
          >
            <Text style={[styles.headerButtonText, styles.textColor]}>
              Xem chi tiết
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.body]}>
          {loading && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "80%",
              }}
            >
              <ActivityIndicator size={30} />
            </View>
          )}
          {!loading && today.length === 0 && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "80%",
              }}
            >
              <Text style={{ color: "#fff" }}>Không có lịch học hôm nay!</Text>
            </View>
          )}
          <ScrollView
            style={styles.scrollView}
            horizontal
            scrollEventThrottle={16}
            //   pagingEnabled
          >
            {today.map((x, index) => {
              return (
                <ItemChildSchedule
                  key={index}
                  data={x}
                  maLop={``}
                  style={items}
                />
              );
            })}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    width: "95%",
    backgroundColor: Colors.Primary,
    borderRadius: 15,
    marginTop: 5,
  },
  header: {
    height: "20%",
    justifyContent: "center",
  },
  textColor: {
    color: "#fff",
  },
  headerTitle: {
    fontSize: 14,
    marginLeft: 10,
  },
  headerButton: {
    height: "100%",
    position: "absolute",
    top: 0,
    right: 10,
    justifyContent: "center",
  },
  headerButtonText: {},
  body: {
    height: "75%",
  },
  scrollView: {
    // backgroundColor: "pink",
    borderRadius: 5,
  },
});

const items = {
  wrap: {
    width: width / 1.3,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 0,
    backgroundColor: "#fff",
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
  },
  headerRight: {
    flex: 2,
    alignItems: "flex-end",
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
    paddingBottom: 10,
  },
  bodyText: {
    paddingLeft: 8,
  },
};
