import { TextInput } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";
import { Screens } from "../../common/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Page2 = () => {
  const nav = useNavigation();
  const [url, setUrl] = useState("");

  const handleSetUrl = async () => {
    await AsyncStorage.setItem("BASE_URL", url);
    nav.navigate(Screens.Login);
  };

  const handleGetUrl = async () => {
    let url = await AsyncStorage.getItem("BASE_URL");
    setUrl(url);
  };

  useEffect(() => {
    handleGetUrl();
  }, []);

  return (
    <View style={[s.wrapper, s.wrapper2]}>
      <View style={[s.wrapperView]}>
        <Text style={[s.text, { fontSize: 20 }]}>
          Mời bạn nhập đường dẫn Server
        </Text>
      </View>
      <View style={[s.wrapperView]}>
        <TextInput
          variant="standard"
          style={[s.textInput]}
          value={url}
          onChangeText={setUrl}
        />
      </View>
      <View style={[s.wrapperView]}>
        <TouchableOpacity style={[s.button]} onPress={handleSetUrl}>
          <Text style={[s.text]}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  buttonSkip: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 20,
    zIndex: 1,
    // backgroundColor: "#fff",
    top: 10,
    right: 10,
  },
  buttonSkipText: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
    color: "#fff",
  },
  wrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper1: {
    backgroundColor: "#FBBE0F",
    padding: 20,
  },
  wrapper2: {
    backgroundColor: "#2FF0FA",
    flexDirection: "column",
  },
  wrapperView: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    color: "#fff",
    fontWeight: 700,
    textAlign: "center",
  },
  textInput: {
    width: "80%",
  },
  button: {
    width: "70%",
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#000",
  },
});

const slides = [
  {
    page: 1,
    view: (key) => (
      <View style={[s.wrapper, s.wrapper1]} key={key}>
        <Text style={[s.text]}>Chào mừng bạn đến với ứng dụng Giáo viên</Text>
      </View>
    ),
  },
  {
    page: 2,
    view: (key) => <Page2 key={key} />,
  },
];

export default function TutorialPreview() {
  const swiper = React.createRef();
  const [page, setPage] = useState(0);
  return (
    <View style={[s.container]}>
      {page !== slides.length - 1 && (
        <TouchableOpacity
          style={[s.buttonSkip]}
          onPress={() => {
            swiper.current.scrollTo(slides.length - 1);
          }}
        >
          <Text style={[s.buttonSkipText]}>Bỏ qua</Text>
        </TouchableOpacity>
      )}
      <Swiper
        ref={swiper}
        loop={false}
        onIndexChanged={(index) => {
          setPage(index);
        }}
      >
        {slides.map((x) => {
          return x.view(x.page);
        })}
      </Swiper>
    </View>
  );
}
