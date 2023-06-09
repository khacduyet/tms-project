import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Colors, height, TextButton } from "../../../../common/constant";
import { Button } from 'react-native-paper';

// import tab
import ThongTin from '../screen/infor'
import LienHe from '../screen/lien-he'
import { ToastMessage } from "../../../../common/components";

const TextButtonTab = {
  ThongTin: "Lý lịch",
  LienHe: "Liên hệ"
};
 
export default function TabThongTin() {
  const [tabIndex, setTabIndex] = useState(0);
  const [quyTrinh, setQuyTrinh] = useState({
    itemSYLL: {}
  });

  const GhiLai = async () => {
    if (ValidateData(quyTrinh)) {

    }
  };

  return <SafeAreaView>
    <View style={[styles.container]}>
      <View style={[styles.tab]}>
        <TouchableOpacity style={[styles.buttonTab, tabIndex === 0 && styles.buttonTabActive]}
          onPress={() => {
            setTabIndex(0);
          }}>
          <Text style={[
            styles.buttonTabText,
            tabIndex === 0 && styles.buttonTabTextActive,
          ]}>
            {TextButtonTab.ThongTin}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonTab, tabIndex === 1 && styles.buttonTabActive]}
          onPress={() => {
            setTabIndex(1);
          }}>
          <Text style={[
            styles.buttonTabText,
            tabIndex === 1 && styles.buttonTabTextActive,
          ]}>
            {TextButtonTab.LienHe}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[bodys.container]}>
        {tabIndex === 0 && <ThongTin />}
        {tabIndex === 1 && <LienHe quyTrinh={{
          ...quyTrinh,
          setQuyTrinh
        }} />}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center", paddingTop: 30 }}>
        <Button
          icon="check"
          mode="contained"
          onPress={GhiLai}
          style={{ width: "75%" }}
        >
          Xác nhận
        </Button>
      </View>
    </View>
  </SafeAreaView>
}

const ValidateData = (quyTrinh) => {
  if (!validVariable(quyTrinh.itemSYLL?.DienThoai)) {
    ToastMessage('Vui lòng nhập số điện thoại');
    return false;
  }
   else if (!validVariable(quyTrinh.itemSYLL?.Email)) {
    ToastMessage('Vui lòng nhập Email');
    return false;
  }
  else if (!validVariable(quyTrinh.itemSYLL?.ChoOHienNayDiaChi)) {
    ToastMessage('Vui lòng nhập nơi ở hiện nay');
    return false;
  }
  return true;
}

export function validVariable(value) {
  if (value !== undefined && value !== null && value.toString().trim() !== "") {
    return true;
  } else {
    return false;
  }
}

const styles = {
  container: {
    // height: "100%",
    // width: "100%",
  },
  tab: {
    flexDirection: "row",
  },
  buttonTab: {
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    marginTop: 0,
  },
  buttonTabActive: {
    borderBottomWidth: 2,
    borderColor: "#2f4bfb",
    borderRadius: 5,
  },
  buttonTabTextActive: {
    color: "#2f4bfb",
  },
  buttonTabText: {},
};
const bodys = {
  container: {
    // width: "100%",
    // height: "100%",
  },
  weekWrap: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    marginTop: 0,
  },
  wrapTop: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapContent: {
    height: "100%",
  },
  dateButton: {
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  dateText: {
    fontSize: 16,
  },
  dropdown: {
    flex: 3,
    margin: 5,
  },
  dropdownBox: {
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontSize: 13,
  },

  itemFlat: {
    width: "100%",
    // backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginBottom: 15,
    flexDirection: "row",
  },
  itemFlatLeft: {
    flex: 1,
    borderRightWidth: 2,
    borderColor: "blue",
  },
  itemFlatRight: {
    marginLeft: 10,
    flex: 3,
  },
  itemFlatLeftCircle: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    borderWidth: 3,
    borderColor: Colors.Primary,
    alignItems: "center",
    justifyContent: "center",
  },
};