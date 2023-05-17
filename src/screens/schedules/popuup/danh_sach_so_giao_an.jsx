import React, { useEffect, useState } from "react";
import { Text, StyleSheet, useColorScheme, View, TouchableOpacity, FlatList } from 'react-native';
import HeaderBack from "../../../common/header";
import { Screens } from "../../../common/constant";
import { SafeAreaView } from "react-native";
import { TextInput } from "@react-native-material/core";
import { Entypo } from "@expo/vector-icons";
import { Button, Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthServices, QuyTrinhServices } from "../../../services/danhmuc.service";

export default function DanhSachSoGiaoAn({ route }) {
    const { itemdiemdanh, item } = route.params;
    const [obj_data, setObj_data] = useState({})
    const [arr, setArr] = useState([])
    // API ------ 

    const GetListSoGiaoAn = async () => {
        let currentUser = await AuthServices.currentUser();
        let data = {
            IddmCaHoc: itemdiemdanh.IddmCaHoc,
            listIddmLopHoc: itemdiemdanh.listIddmLopHoc,
            IddmLopHoc_Nhom: itemdiemdanh.IddmLopHoc_Nhom,
            IddmMonHoc: itemdiemdanh.IddmMonHoc,
            IdDSMonHoc: itemdiemdanh.IdDSMonHoc,
            IdUserGiaoVien: currentUser.Id,
        }
        let res = await QuyTrinhServices.LapThoiKhoaBieu.GetListSoGiaoAn(data);
        if (res) {
            console.log('res', res);
            setArr(res)
        }
    };
    useEffect(() => {
        GetListSoGiaoAn();
    }, []);
    // .end -----
    const nav = useNavigation();
    return (
        <SafeAreaView>
            <HeaderBack header={Screens.DanhSachSoGiaoAn} />
            <FlatList
                data={arr}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {
                        nav.navigate(Screens.SoGiaoAn, {
                            item: item
                        })
                    }}>
                        <ListGiaoAn item={item} />
                    </TouchableOpacity>
                )}
                ListFooterComponent={
                    <View style={{ width: "100%", height: 450 }}></View>
                }
                keyExtractor={(x) => x.Id}
            />
        </SafeAreaView>
    )
}

const ListGiaoAn = ({ item }) => {
    const nav = useNavigation();
    return (
        <View style={giaoan.items}>
            <View style={giaoan.item_title}>
                <View style={giaoan.flex}>
                    <Entypo name="open-book" size={24} color="black" />
                    <Text style={giaoan.item_title_header}>Môn học</Text>
                </View>
            </View>
            <View style={giaoan.item_content}>
                <View>

                    <View style={giaoan.caption}><Text>Tên sổ: {item.TenSo}</Text></View>
                    <View style={giaoan.caption}><Text>Môn học: {item.TenMonHoc}</Text></View>
                    <View style={giaoan.caption}><Text>Lớp: {item.TenLop}</Text></View>
                    <View style={giaoan.caption}><Text>Trình độ: {item.TenCapGiangDay}</Text></View>
                    <View style={giaoan.caption}><Text>Hình thức: {item.TenHinhThucDaoTao}</Text></View>
                </View>
                <View>
                    <View style={giaoan.caption}><Text>Loại sổ: {item.TenLoaiSo}</Text></View>
                    <View style={giaoan.caption}><Text>số sổ: {item.SoSo}</Text></View>
                    <View style={giaoan.caption}><Text>Số chương: {item.SoChuong}</Text></View>
                    <View style={giaoan.caption}><Text>Số bài: {item.SoBai}</Text></View>
                </View>
            </View>
        </View>
    )
}

const giaoan = {
    items: {
        borderColor: '#C6E2FF',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16
    },
    flex: {
        flexDirection: 'row',
    },
    item_title: {
        backgroundColor: '#C6E2FF',
        padding: 8
    },
    item_title_header: {
        paddingLeft: 5,
        fontSize: 15,
        fontWeight: 'bold'
    },
    item_content: {
        backgroundColor: '#fff',
        padding: 8,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    caption: {
        padding: 8,
        width: '80%'
    }
}
