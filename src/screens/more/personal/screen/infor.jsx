import * as React from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { TextInput } from "@react-native-material/core";
import { RadioButton } from "react-native-paper";
import { Button } from "react-native-paper";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState, useEffect } from "react";
import { UnixToDate, formatDateStringGMT } from "../../../../common/common";
import { QuyTrinhServices } from "../../../../services/danhmuc.service";
import { ToastMessage } from "../../../../common/components";
import { DateToUnix } from "../../../../common/common";

export default function Infor() {
  const [syll, setSyll] = useState({
    TenGhep: "",
    GioiTinh: 0,
    NgaySinh: null,
    itemSYLL: {},
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [nameProp, setNameProp] = useState({
    prop: "",
    propParent: "",
    isParent: true,
  });

  const [date, setDate] = React.useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    let unix = [nameProp.prop] + "Unix";
    if (nameProp.isParent) {
      setSyll({
        ...syll,
        [nameProp.prop]: new Date(date),
        [unix]: DateToUnix(new Date(date)),
      });
    } else {
      let obj = {
        ...syll,
        [nameProp.propParent]: {
          ...syll[nameProp.propParent],
          [nameProp.prop]: new Date(date),
          [unix]: DateToUnix(new Date(date)),
        },
      };
      setSyll(obj);
    }
    hideDatePicker();
  };
  // ------ Api ------
  const GetSoYeuLyLichSinhVien = async () => {
    let res = await QuyTrinhServices.ThongTinCaNhan.GetSoYeuLyLichSinhVien();
    if (res) {
      res = {
        ...res,
        NgaySinh: new Date(res.NgaySinh),
      };
      setSyll(res);
    }
  };
  useEffect(() => {
    GetSoYeuLyLichSinhVien();
  }, []);

  const GhiLai = async () => {
    let res = await QuyTrinhServices.ThongTinCaNhan.SetSoYeuLyLichSinhVien(
      syll
    );
    if (res) {
      ToastMessage(res);
    }
  };

  const setForm = (value, prop, propObj) => {
    if (value !== undefined) {
      if (propObj) {
        setSyll({
          ...syll,
          [propObj]: {
            ...syll[propObj],
            [prop]: value,
          },
        });
        return;
      }
      setSyll({
        ...syll,
        [prop]: value,
      });
    }
  };

  return (
    <ScrollView>
      <View>
        <View style={styles.items}>
          <TextInput
            style={styles.inputtext}
            onChangeText={(e) => setForm(e, "TenGhep")}
            value={syll.TenGhep}
            label={"Họ và tên"}
            variant="standard"
          />
        </View>
        <View style={styles.items}>
          <Text style={styles.label}>Giới tính:</Text>
          <View>
            <RadioButton.Group
              onValueChange={(e) => setForm(e, "GioiTinh")}
              value={syll.GioiTinh}
              buttonColor="red"
              color="red"
            >
              <View style={styles.flex}>
                <View style={styles.flex}>
                  <RadioButton.Android value={0} />
                  <Text>Nam</Text>
                </View>
                <View style={styles.flex}>
                  <RadioButton.Android value={1} />
                  <Text>Nữ</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
        </View>
        <View style={styles.items}>
          <TextInput
            style={styles.inputtext}
            onChangeText={(e) => setForm(e, "CCCD", "itemSYLL")}
            value={syll.itemSYLL?.CCCD}
            label={"CCCD"}
            variant="standard"
          />
        </View>
        <View style={styles.items}>
          <TextInput
            style={styles.inputtext}
            label={"Ngày"}
            variant="standard"
            value={formatDateStringGMT(syll?.NgaySinh, "dd/mm/yyyy")}
            onFocus={() => {
              setNameProp({
                prop: "NgaySinh",
                isParent: true,
              });
              setDate(syll?.NgaySinh);
              showDatePicker();
            }}
          />
        </View>

        <View style={styles.items}>
          <TextInput
            style={styles.inputtext}
            onChangeText={(e) =>
              setForm(e, "HoKhauThuongTruDiaChi", "itemSYLL")
            }
            value={syll.itemSYLL?.HoKhauThuongTruDiaChi}
            label={"Hộ khẩu thường trú"}
            variant="standard"
          />
        </View>
        <View style={styles.items}>
          <TextInput
            style={styles.inputtext}
            onChangeText={(e) => setForm(e, "DanToc", "itemSYLL")}
            value={syll.itemSYLL?.DanToc}
            label={"Dân tộc"}
            variant="standard"
          />
        </View>
        <View style={styles.items}>
          <TextInput
            onChangeText={(e) => setForm(e, "TonGiao", "itemSYLL")}
            value={syll.itemSYLL?.TonGiao}
            label={"Tôn giáo"}
            variant="standard"
          />
        </View>
        <View style={styles.items}>
          <TextInput
            style={styles.inputtext}
            label={"Ngày vào đoàn"}
            variant="standard"
            value={formatDateStringGMT(
              syll?.itemSYLL?.NgayKetNapDoan,
              "dd/mm/yyyy"
            )}
            onFocus={() => {
              setNameProp({
                prop: "NgayKetNapDoan",
                propParent: "itemSYLL",
                isParent: false,
              });
              setDate(syll?.itemSYLL?.NgayKetNapDoan);
              showDatePicker();
            }}
          />
        </View>
        <View style={styles.items}>
          <TextInput
            style={styles.inputtext}
            label={"Ngày vào đảng"}
            variant="standard"
            value={formatDateStringGMT(
              syll?.itemSYLL?.NgayThamGiaDang,
              "dd/mm/yyyy"
            )}
            onFocus={() => {
              setNameProp({
                prop: "NgayThamGiaDang",
                propParent: "itemSYLL",
                isParent: false,
              });
              setDate(syll?.itemSYLL?.NgayThamGiaDang);
              showDatePicker();
            }}
          />
        </View>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
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
      <DateTimePickerModal
        date={date ? date : new Date()}
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
