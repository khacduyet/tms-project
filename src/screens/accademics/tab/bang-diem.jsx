import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";

//import componet
import DropDowns from "../share-componet/DropDown/DropDown";
import ItemMonHoc from "./screen/item-poup-bang-diem/item-mon-hoc";
import { useState } from "react";
import { QuyTrinhServices } from "../../../services/danhmuc.service";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { createGuid } from "../../../common/common";
import { useSelector } from "react-redux";
import { Dropdown } from 'react-native-element-dropdown';

export const listNam = [
  { label: "2022-2023", value: "1" },
  { label: "2023-2024", value: "2" },
];
export const listKy = [
  { label: "Kỳ I", value: "I" },
  { label: "Kỳ II", value: "II" },
];

export default function BangDiem() {
  const currentUser = useSelector((state) => state.currentUser);

  const [object, setObject] = useState({
    Nam: null,
    Ki: listKy[0].value,
    IdKhoa: 49
  });
  const [lstGiaoVien, setGiaoVien] = useState([]);
  const [searchGiaoVien, setSearchGiaoVien] = useState([]);
  const [IdUserGiaoVien, setIdUserGiaoVien] = useState(currentUser.Id);
  const [listBoPhan, setListBoPhan] = useState([]);

  const GetDanhSachBoPhanTheoLoai = async () => {
    let res = await QuyTrinhServices.DanhMuc.GetDanhSachBoPhanTheoLoai();
    if (res) {
      setListBoPhan(res)
    }
  }
  const getData = async () => {
    let data = {
      Nam: 2022,
      Ki: object.Ki,
      IdUserGiaoVien: '',
      IdKhoa: object.IdKhoa
    }
    let res = await QuyTrinhServices.DanhSachMonHoc.GetListThucGiangGiaoVien(data);
    if (res) {
      let arr = Array.isArray(res) ? res : [];
      setGiaoVien(arr);
      arr = arr.filter(x => x.IdUserGiaoVien === IdUserGiaoVien);
      setSearchGiaoVien(arr.length ? arr : [])
    }
  };

  useEffect(() => {
    GetDanhSachBoPhanTheoLoai()
    getData();
  }, [object]);

  const ChonGiaoVien = (item) => {
    let arr = lstGiaoVien.filter(x => x.IdUserGiaoVien === item.value);
    setIdUserGiaoVien(item.value)
    setSearchGiaoVien(arr)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View><Text style={{textAlign:'center',fontWeight:'bold', fontSize:20,paddingTop:10, paddingBottom:10}}>Thực giảng giáo viên</Text></View>
        <View style={styles.dropdown}>
          <DropDowns
            data={listBoPhan.map(x => {
              return {
                label: x.TenBoPhan,
                value: x.Id
              }
            })}
            object={object}
            setObject={setObject}
            header={"IdKhoa"}
          />
        </View>
        <View style={styles.dropdown}>
          <View style={styles.flex}>
            <TouchableOpacity style={styles.justify_content_between}>
              <View style={styles.left}>
                <DropDowns
                  data={listNam}
                  object={object}
                  setObject={setObject}
                  header={"Nam"}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.justify_content_between}>
              <View style={styles.right}>
                <DropDowns
                  data={listKy}
                  object={object}
                  setObject={setObject}
                  header={"Ki"}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Dropdown
            data={lstGiaoVien.map(x => {
              return {
                label: x.TenGiaoVien,
                value: x.IdUserGiaoVien
              }
            })}
            search
            labelField="label"
            valueField="value"
            style={styles.dropdowns}
            value={IdUserGiaoVien}
            onChange={item => {
              ChonGiaoVien(item)
            }}
          />
        </View>
      </View>
      <View style={styles.content}>
        <FlatList
          data={searchGiaoVien}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <ItemMonHoc item={item} />
            </TouchableOpacity>
          )}
          ListFooterComponent={
            <View style={{ width: "100%", height: 450 }}></View>
          }
          keyExtractor={() => createGuid()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  header: {},
  flex: {
    flexDirection: "row",
  },
  justify_content_between: {
    flex: 1,
  },
  dropdown: {
    marginBottom: 16,
  },
  left: {
    marginRight: 8,
  },
  right: {
    marginLeft: 8,
  },
  content: {
    marginTop: 16,
    marginBottom: 16,
  },
  marginBottom_16: {
    marginBottom: 16,
  },
  dropdowns: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
