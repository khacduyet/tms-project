import * as React from 'react';
import { StyleSheet, Text, View, Pressable, } from "react-native";
import { TextInput } from "@react-native-material/core";
import { useState, useEffect } from "react";

export default function LienHe({ quyTrinh }) {
  const setForm = (value, prop, propObj) => {
    let data = {
      ...quyTrinh,
      itemSYLL: {
        ...quyTrinh?.itemSYLL,
        [prop]:value
      }
    }
    quyTrinh.setQuyTrinh(data)
  }
  return (
    <View>
      <View style={styles.items}>
        <TextInput
          onChangeText={(e) => setForm(e, 'DienThoai', 'itemSYLL')}
          value={quyTrinh?.itemSYLL?.DienThoai}
          label={'Số điện thoại (*)'}
          variant="standard" />
      </View>
      <View style={styles.items}>
        <TextInput
          onChangeText={(e) => setForm(e, 'Email', 'itemSYLL')}
          value={quyTrinh?.itemSYLL?.Email}
          label={'Email (*)'}
          variant="standard" />
      </View>
      <View style={styles.items}>
        <TextInput
          onChangeText={(e) => setForm(e, 'ChoOHienNayDiaChi', 'itemSYLL')}
          value={quyTrinh?.itemSYLL?.ChoOHienNayDiaChi}
          label={'Nơi ở hiện nay (*)'}
          variant="standard" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: 'center'
  },
  items: {
    padding: 10,
  },
  label: {
    paddingBottom: 5,
    paddingTop: 5,
  },
  inputtext: {
    // borderColor: "#ced4da",
    // border: 1,
    // borderRadius: 3,
    // backgroundColor: "#fff",
    // padding: 4,
    // fontSize: 16,
    // height: 50,
    // lineHeight: 20,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  RadioButton: {
    backgroundColor: "red",
    borderColor: "#fff",
  },
})