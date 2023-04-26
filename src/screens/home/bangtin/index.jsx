import {
  Image,
  Pressable,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { width } from "../../../common/constant";
import { Avatar, Button, Card } from "react-native-paper";
import Swiper from "react-native-swiper";
import { useEffect, useState } from "react";

const SIZE_ICON = 24;

export default function BangTinComponent() {
  const [fakeData, setFakeData] = useState([]);

  const getFakeDate = async () => {
    const res = await fetch(
      "http://thcsnguyendu.krongnang.daklak.edu.vn/Api/Notification"
    ).then((response) => response.json());
    if (res) {
      setFakeData(res.filter((x, idx) => idx < 3));
    }
  };

  useEffect(() => {
    getFakeDate();
  }, []);

  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <Image
          source={require("../../../resources/icons/color-voice.png")}
          style={{ width: SIZE_ICON, height: SIZE_ICON, marginLeft: 5 }}
          resizeMode="stretch"
        />
        <Text style={[styles.headerText]}>Bảng tin</Text>
        <Pressable style={[styles.headerArrow]} onPress={() => {}}>
          <Feather name="arrow-right-circle" size={24} color="blue" />
        </Pressable>
      </View>
      <Swiper autoplay loop autoplayTimeout={5}>
        {fakeData.map((x, index) => {
          return (
            <TouchableOpacity key={index}>
              <Card>
                <Card.Cover borderRadius={0} source={{ uri: x.Images }} />
                <Card.Content>
                  <Text
                    variant="titleLarge"
                    style={[styles.wrapText]}
                    numberOfLines={1}
                  >
                    {x.Title}
                  </Text>
                  <Text variant="bodyMedium" numberOfLines={2}>
                    {x.Title} {x.Title} {x.Title} {x.Title} {x.Title} {x.Title}
                  </Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          );
        })}
        {/* {[...Array(6)].map((x, index) => {
          return (
            <Card key={index}>
              <Card.Cover
                borderRadius={0}
                source={require("../../../resources/background.png")}
              />
              <Card.Content>
                <Text variant="titleLarge" style={[styles.wrapText]}>
                  Ngày hội học sinh, sinh viên
                </Text>
                <Text variant="bodyMedium" numberOfLines={2}>
                  SMS Seydlitz là một tàu chiến-tuần dương tải trọng 25.000 tấn
                  được Hải quân Đế quốc Đức (Kaiserliche Marine) chế tạo ngay
                  trước Chiến tranh Thế giới thứ nhất. Được đặt hàng vào năm
                  1910 và đưa ra hoạt động vào tháng 5 năm 1913, nó là chiếc tàu
                  chiến-tuần dương thứ tư được chế tạo cho Hạm đội Biển khơi.
                  Seydlitz được đặt tên theo Friedrich Wilhelm von Seydlitz, vị
                  tướng Phổ vào triều đại vua Frederick đại đế và từng phục vụ
                  trong cuộc Chiến tranh bảy năm. Thiết kế của Seydlitz phản ảnh
                  sự tích lũy kinh nghiệm trong thế hệ đầu tiên của các tàu
                  chiến-tuần dương Đức, khởi đầu từ chiếc Von der Tann vào năm
                  1906 và tiếp nối bởi hai chiếc thuộc lớp Moltke được đặt hàng
                  vào các năm 1907 và 1908.
                </Text>
              </Card.Content>
            </Card>
          );
        })} */}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
    width: "95%",
    height: 350,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  header: {
    width: "100%",
    marginBottom: 10,
    flexDirection: "row",
  },
  headerText: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: 600,
  },
  headerArrow: {
    position: "absolute",
    right: 5,
    top: 0,
  },
  wrap: {
    marginTop: 10,
    width: "90%",
  },
  //   body: { height: 200 },
  wrapText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 600,
  },
  bodyText: {},
});
