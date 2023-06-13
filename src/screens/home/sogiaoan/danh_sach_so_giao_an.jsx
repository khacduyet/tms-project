import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  useColorScheme,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import HeaderBack from "../../../common/header";
import { Screens } from "../../../common/constant";
import { SafeAreaView } from "react-native";
import { TextInput } from "@react-native-material/core";
import { Entypo } from "@expo/vector-icons";
import { ActivityIndicator, Button, Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  AuthServices,
  QuyTrinhServices,
} from "../../../services/danhmuc.service";
import { useSelector } from "react-redux";
import { FindInput } from "../../../common/components";

export default function DanhSachSoGiaoAn() {
  const [arr, setArr] = useState([]);
  const [arrFull, setArrFull] = useState([]);
  const currentUser = useSelector((x) => x.currentUser);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    keyword: ``,
  });
  // API ------

  const GetListSoGiaoAn = async () => {
    let data = {
      IddmCaHoc: ``,
      IddmLopHoc: ``,
      IddmLopHoc_Nhom: ``,
      IddmMonHoc: ``,
      IdDanhSachMonHoc: ``,
      IdGiaoVien: currentUser.Id,
    };
    let res = await QuyTrinhServices.LapThoiKhoaBieu.GetListSoGiaoAn(data);
    if (res) {
      setArr(res);
      setArrFull(res);
      setLoading(false);
    }
  };
  useEffect(() => {
    GetListSoGiaoAn();
  }, []);

  useEffect(() => {
    if (filter.keyword) {
      let listSGA = arrFull.filter((x) =>
        x.TenMonHoc.trim()
          .toUpperCase()
          .includes(filter.keyword.trim().toUpperCase())
      );
      setArr(listSGA);
    } else {
      setArr(arrFull);
    }
  }, [filter]);
  // .end -----
  const nav = useNavigation();
  return (
    <SafeAreaView>
      <HeaderBack header={Screens.DanhSachSoGiaoAn} />
      <View style={{ margin: 5 }}>
        <View style={{ marginBottom: 5 }}>
          <FindInput
            props={{
              value: filter.keyword,
              onChangeText: (e) => {
                setFilter({
                  ...filter,
                  keyword: e,
                });
              },
            }}
          />
        </View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={arr || arrFull}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  nav.navigate(Screens.SoGiaoAn, {
                    item: item,
                  });
                }}
              >
                <ListGiaoAn item={item} />
              </TouchableOpacity>
            )}
            ListFooterComponent={
              <View style={{ width: "100%", height: 450 }}></View>
            }
            keyExtractor={(x) => x.Id}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const ListGiaoAn = ({ item }) => {
  const nav = useNavigation();
  return (
    <View style={giaoan.items}>
      <View style={giaoan.item_title}>
        <View style={giaoan.flex}>
          <Entypo name="open-book" size={24} color="black" />
          <Text style={giaoan.item_title_header}>
            Môn học: {item.TenMonHoc}
          </Text>
        </View>
      </View>
      <View style={giaoan.item_content}>
        <View>
          <View style={giaoan.caption}>
            <Text>Tên sổ: {item.TenSo}</Text>
          </View>
          <View style={giaoan.caption}>
            <Text>Lớp: {item.TenLop}</Text>
          </View>
          <View style={giaoan.caption}>
            <Text>Trình độ: {item.TenCapGiangDay}</Text>
          </View>
          <View style={giaoan.caption}>
            <Text>Hình thức: {item.TenHinhThucDaoTao}</Text>
          </View>
          <View style={giaoan.caption}>
            <Text>Loại sổ: {item.TenLoaiSo}</Text>
          </View>
          <View style={giaoan.caption}>
            <Text>số sổ: {item.SoSo}</Text>
          </View>
          <View style={giaoan.caption}>
            <Text>Số chương: {item.SoChuong}</Text>
          </View>
          <View style={giaoan.caption}>
            <Text>Số bài: {item.SoBai}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const giaoan = {
  items: {
    borderColor: "#C6E2FF",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  flex: {
    flexDirection: "row",
  },
  item_title: {
    backgroundColor: "#C6E2FF",
    padding: 8,
  },
  item_title_header: {
    paddingLeft: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  item_content: {
    backgroundColor: "#fff",
    padding: 8,
    // flexDirection: "row",
    // justifyContent: 'space-between'
  },
  caption: {
    padding: 8,
    width: "80%",
  },
};
