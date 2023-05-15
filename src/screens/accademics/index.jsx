import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Colors, height } from "../../common/constant";

// import tab
import BangDiem from './tab/bang-diem'

export default function AcademicPage() {
  return <SafeAreaView>
    <View style={[styles.container]}>
      <BangDiem />
    </View>
  </SafeAreaView>
}

const styles = {
  container: {
    height: "100%",
    width: "100%",
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
    width: "100%",
    height: "100%",
    // backgroundColor: "#ccc",
  },
  weekWrap: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    marginTop: 0,
  },
  wrapTop: {
    // margin: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapContent: {
    height: "100%",
    // alignItems: "center",
    // justifyContent: "center",
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