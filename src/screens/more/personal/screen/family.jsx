import * as React from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { Checkbox } from "react-native-paper";
import { TextInput } from "@react-native-material/core";
import { useState, useEffect } from "react";
import { Button } from 'react-native-paper';

export default function Family() {
  const [checked, setChecked] = React.useState(false);
  const [syll, setSyll] = useState({
    TenGhep: '',
    GioiTinh: 0,
    NgaySinh: null,
    itemSYLL: {},
  })
  const setForm = (value, prop, propObj) => {
    if (value !== undefined) {
      if (propObj) {
        setSyll({
          ...syll,
          [propObj]: {
            ...syll[propObj],
            [prop]: value,
          }
        })
        return;
      }
      setSyll({
        ...syll,
        [prop]: value,
      })
    }
  }

  return (
    <ScrollView >
      <View>
        <View style={styles.items}>
          <View style={styles.flex}>
            <Text style={styles.label}>Họ và Tên Cha:</Text>
            <View style={styles.flex}>
              <Checkbox.Android
                value={syll.itemSYLL?.NguoiLienLacChinhCha}
                status={checked ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <Text>Liên hệ chính</Text>
            </View>
          </View>
          <View>
            <TextInput style={styles.inputtext} onChangeText={(e) => setForm(e, 'HoTenCha', 'itemSYLL')}
              value={syll.itemSYLL?.HoTenCha} />
          </View>
        </View>
        <View style={styles.items}>
          <TextInput
            onChangeText={(e) => setForm(e, 'DienThoaiCha', 'itemSYLL')}
            value={syll.itemSYLL?.DienThoaiCha}
            label={'Số diện thoại'}
            variant="standard" />
        </View>
        <View style={styles.items}>
          <TextInput
            onChangeText={(e) => setForm(e, 'NgheNghiepCha', 'itemSYLL')}
            value={syll.itemSYLL?.NgheNghiepCha}
            label={'Nghề nghiệp'}
            variant="standard" />
        </View>
        <View style={styles.items}>
          <TextInput
            onChangeText={(e) => setForm(e, 'DiaChiCha', 'itemSYLL')}
            value={syll.itemSYLL?.DienThoaiCha}
            label={'Địa chỉ liên lạc'}
            variant="standard" />
        </View>

        <View style={styles.markdown}></View>

        <View style={styles.items}>
          <View style={styles.flex}>
            <Text style={styles.label}>Họ và Tên Mẹ:</Text>
            <View style={styles.flex}>
              <Checkbox.Android
                status={checked ? "checked" : "unchecked"}
                value={syll.itemSYLL?.NguoiLienLacChinhMe}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <Text>Liên hệ chính</Text>
            </View>
          </View>
          <View>
            <TextInput style={styles.inputtext} onChangeText={(e) => setForm(e, 'HoTenMe', 'itemSYLL')}
              value={syll.itemSYLL?.HoTenMe} />
          </View>
        </View>
        <View style={styles.items}>
          <TextInput
            onChangeText={(e) => setForm(e, 'DienThoaiMe', 'itemSYLL')}
            value={syll.itemSYLL?.DienThoaiMe}
            label={'Số diện thoại'}
            variant="standard" />
        </View>
        <View style={styles.items}>
          <TextInput
            onChangeText={(e) => setForm(e, 'NgheNghiepMe', 'itemSYLL')}
            value={syll.itemSYLL?.NgheNghiepMe}
            label={'Nghề nghiệp'}
            variant="standard" />
        </View>
        <View style={styles.items}>
          <TextInput
            onChangeText={(e) => setForm(e, 'DiaChiMe', 'itemSYLL')}
            value={syll.itemSYLL?.DiaChiMe}
            label={'Địa chỉ liên lạc'}
            variant="standard" />
        </View>

        <View style={styles.btn}>
          <Button icon="check" mode="contained"
            style={{ width: '75%' }}>
            Xác nhận
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  btn: {
  
    flexDirection: "row",
    justifyContent: 'center'
  },
  markdown: {
    borderBottomColor: "#d0d7de",
    borderBottomWidth: 1,
    fontSize: 1.5,
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
});
