import React, { useState } from "react";
import { Text, StyleSheet, useColorScheme, View, TextInput as MyTextInput } from 'react-native';
import HeaderBack from "../../../common/header";
import { Screens } from "../../../common/constant";
import { SafeAreaView } from "react-native";
import { TextInput } from "@react-native-material/core";
import { DateToUnix, formatDateStringGMT } from "../../../common/common";
import { Button, Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView } from "react-native";
import { useEffect } from "react";
import { AuthServices, QuyTrinhServices } from "../../../services/danhmuc.service";
import { ToastMessage } from "../../../common/components";

export default function BangGhiDiem({ route }) {
    const { itemdiemdanh, item } = route.params;
    const [listLoaiDiem, setListLoaiDiem] = useState([]);
    const nav = useNavigation();

    const [obj_data, setObj_data] = useState({})

    // API ------ 
    const getAllOptions = async () => {
        let $loaidiem = QuyTrinhServices.SinhVien.GetListdmLoaiDiem({});
        let res = await  Promise.all([$loaidiem])
        setListLoaiDiem(res[0])
    }

    const GetBangDiemSinhVien = async () => {
        let currentUser = await AuthServices.currentUser();
        let data = {
            NgayKiemTraUnix: DateToUnix(item.Ngay),
            IddmCaHoc: itemdiemdanh.IddmCaHoc,
            listIddmLopHoc: itemdiemdanh.listIddmLopHoc,
            IddmLopHoc_Nhom: itemdiemdanh.IddmLopHoc_Nhom,
            IddmMonHoc: itemdiemdanh.IddmMonHoc,
            IdDSMonHoc: itemdiemdanh.IdDSMonHoc,
            IdUserGiaoVien: currentUser.Id,
        }
        let res = await QuyTrinhServices.SinhVien.GetBangDiemSinhVien(data);
        if (res) {
            setObj_data(res)
        }
    };
    useEffect(() => {
        getAllOptions();
        GetBangDiemSinhVien();
    }, []);
    // .end -----

    // function ------ 
    const setForm = (e, idx, prop) => {
        let temp = obj_data.listDanhSachSinhVien
        let _this = temp[idx]
        _this = {
            ..._this,
            itemBangDiemHangNgay: {
                ..._this.itemBangDiemHangNgay,
                [prop]: e,
            }
        }
        temp[idx] = _this
        let data = {
            ...obj_data,
            listDanhSachSinhVien: temp
        }
        setObj_data(data)
    }
    const GhiLai = async () => {
        let res = await QuyTrinhServices.SinhVien.SetBangDiemSinhVien(obj_data);
        if (res) {
            ToastMessage(res.Detail);
        }
    };
    // .end -----
    return (
        <SafeAreaView>
            <HeaderBack header={Screens.BangGhiDiem} />
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.items}>
                        <TextInput
                            label={'Môn'}
                            value={itemdiemdanh.TenMonHoc}
                            editable={false}
                            variant="standard" />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[styles.items, styles.flex]}>
                            <TextInput
                                style={styles.inputtext}
                                value={formatDateStringGMT(item.Ngay, "dd/mm/yyyy")}
                                editable={false}
                                label={"Ngày"}
                                variant="standard"
                            />
                        </View>
                        <View style={[styles.items, styles.flex]}>
                            <TextInput
                                label={'Buổi'}
                                value={itemdiemdanh.TenCaHoc}
                                editable={false}
                                variant="standard" />
                        </View>
                    </View>
                    <View style={styles.items}>
                        <TextInput
                            label={'Lớp'}
                            value={itemdiemdanh.TenLopHoc}
                            editable={false}
                            variant="standard" />
                    </View>
                </View>
                <View style={styles.body}>
                    <View>
                        <View style={styles.table_header}>
                            <View style={{ width: '45%' }}><Text style={styles.table_caption}>Họ Tên / MSV</Text></View>
                            <View style={{ width: '25%' }}><Text style={styles.table_caption}>Điểm</Text></View>
                            <View style={{ width: '30%' }}><Text style={styles.table_caption}>Loại điểm</Text></View>
                        </View>
                        <ScrollView style={{ height: 400 }}>
                            {
                                obj_data.listDanhSachSinhVien?.map((x, idx) => {
                                    return (
                                        <View style={styles.table_body}>
                                            <View style={{ width: '45%', }}><Text style={[styles.table_data, styles.ptop]}>{x.TenGhep}</Text></View>
                                            <View style={{ width: '25%', }}>
                                                <View>
                                                    <MyTextInput
                                                        style={styles.input_text}
                                                        keyboardType='number-pad'
                                                        value={x.itemBangDiemHangNgay.Diem?.toString()}
                                                        onChangeText={(e) => setForm(e, idx, 'Diem')}
                                                    />
                                                </View>
                                            </View>
                                            <View style={{
                                                width: '30%', flexDirection: "row", justifyContent: 'center'
                                            }}>
                                                <Dropdown
                                                    data={listLoaiDiem.map(x => {
                                                        return {
                                                            label: x.Ten,
                                                            value: x.Id
                                                        }
                                                    })}
                                                    labelField={'label'}
                                                    valueField={'value'}
                                                    style={[styles.dropdown, styles.flex]}
                                                    searchPlaceholder="Search..."
                                                    value={x.itemBangDiemHangNgay.IdLoaiDiem}
                                                    onChange={(e) => {
                                                        setForm(e.value, idx, 'IdLoaiDiem')
                                                    }} />
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.btn}>
                    <Button icon="check" mode="contained"
                        onPress={GhiLai}
                        style={{ width: '75%' }}>
                        Xác nhận
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = {
    btn: {
        paddingTop: 30,
        flexDirection: "row",
        justifyContent: 'center'
    },
    flex: {
        flex: 1,
    },
    container: {
        margin: 10,
    },
    items: {
        padding: 10,
    },
    table_header: {
        flexDirection: "row",
        backgroundColor: 'blue',
        padding: 10
    },
    table_body: {
        flexDirection: "row",
        padding: 10,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'blue',
        alignItems: 'center'
    },
    table_caption: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    table_data: {
        fontSize: 11,

    },
    ptop: {
        // paddingTop: 10
    },
    textAlign: {
        textAlign: 'center'
    },
    linedata: {
        flexDirection: "row",
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'blue',
    },
    w_45: {
        width: '45%'
    },
    dropdown: {
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
    input_text: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#ced4da',
        borderRadius: 8
    },
}