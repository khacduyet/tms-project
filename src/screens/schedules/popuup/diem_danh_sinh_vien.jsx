import React from "react";
import { Text, StyleSheet, useColorScheme, View, ScrollView } from 'react-native';
import HeaderBack from "../../../common/header";
import { Screens } from "../../../common/constant";
import { SafeAreaView } from "react-native";
import { TextInput } from "@react-native-material/core";
import { Entypo } from "@expo/vector-icons";
import { DateToUnix, UnixToDate, formatDateStringGMT } from "../../../common/common";
import { Button, Dialog } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthServices, QuyTrinhServices } from "../../../services/danhmuc.service";
import { useEffect, useState } from "react";
import Checkbox from 'expo-checkbox';
import { Modal, Portal } from 'react-native-paper';
import { ToastMessage } from "../../../common/components";
import { useMemo } from "react";

export default function DiemDanhSinhVien({ route }) {
    const { itemdiemdanh, item } = route.params;
    const [obj_data, setObj_data] = useState({})
    const [visible, setVisible] = React.useState(false)
    const showDialog = () => setVisible(true);
    const hideDialog = () => {
        setForm(obj_GhiChu.LyDoNghi, obj_GhiChu.index, 'LyDoNghi')
        setVisible(false)
    };
    const [obj_GhiChu, setObjGhiChu] = useState({})
    const GetDiemDanhSinhVien = async () => {
        let currentUser = await AuthServices.currentUser();
        let data = {
            NgayDiemDanhUnix: DateToUnix(item.Ngay),
            IddmCaHoc: itemdiemdanh.IddmCaHoc,
            listIddmLopHoc: itemdiemdanh.listIddmLopHoc,
            IddmLopHoc_Nhom: itemdiemdanh.IddmLopHoc_Nhom,
            IddmMonHoc: itemdiemdanh.IddmMonHoc,
            IdDSMonHoc: itemdiemdanh.IdDSMonHoc,
            IdUserGiaoVien: currentUser.Id,
            Nam: 0,
            Thang: 0,
            ThangNamUnix: 0
        }

        let res = await QuyTrinhServices.SinhVien.GetDiemDanhSinhVien(data);
        if (res) {
            setObj_data(res)
        }
    };
    const GhiLai = async () => {
        let res = await QuyTrinhServices.SinhVien.SetDiemDanhSinhVien(obj_data);
        if (res) {
            ToastMessage(res.Detail);
        }
    };
    useEffect(() => {
        GetDiemDanhSinhVien();
    }, []);


    const SiSo = useMemo(() => {
        let svNghi = (obj_data.listDanhSachSinhVien?.filter(ele => ele.itemDiemDanhHangNgay.isVangMat)?.length);
        let svTong = (obj_data.listDanhSachSinhVien?.length);
        return `${svNghi}/${svTong}`;
    }, [obj_data.listDanhSachSinhVien])
    const nav = useNavigation();
    const setForm = (e, idx, prop) => {
        let temp = obj_data.listDanhSachSinhVien
        let _this = temp[idx]
        _this = {
            ..._this,
            itemDiemDanhHangNgay: {
                ..._this.itemDiemDanhHangNgay,
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
    return (
        <SafeAreaView style={{}}>
            <HeaderBack header={Screens.DiemDanhSinhVien} />
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
                                label={"Ngày"}
                                variant="standard"
                                editable={false}
                                value={formatDateStringGMT(item.Ngay, "dd/mm/yyyy")}
                            />
                        </View>
                        <View style={[styles.items, styles.flex]}>
                            <TextInput
                                label={'Buổi'}
                                editable={false}
                                value={itemdiemdanh.TenCaHoc}
                                variant="standard" />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[styles.items, styles.flex]}>
                            <TextInput
                                label={'Lớp'}
                                editable={false}
                                value={itemdiemdanh.TenLopHoc}
                                variant="standard" />
                        </View>
                        <View style={[styles.items, styles.flex]}>
                            <TextInput
                                label={'Sĩ số'}
                                value={SiSo}
                                editable={false}
                                variant="standard" />
                        </View>
                    </View>
                </View>
                <View style={styles.body}>
                    <View>
                        <View style={styles.table_header}>
                            <View style={{ width: '45%' }}><Text style={styles.table_caption}>Họ Tên / MSV</Text></View>
                            <View style={{ width: '15%' }}><Text style={styles.table_caption}>Nghỉ</Text></View>
                            <View style={{ width: '25%' }}><Text style={styles.table_caption}>Số giờ nghỉ</Text></View>
                            <View style={{ width: '15%' }}><Text style={styles.table_caption}>Lý do</Text></View>
                        </View>
                        <ScrollView style={{ height: 400 }}>
                            {
                                obj_data.listDanhSachSinhVien?.map((x, idx) => {
                                    return (
                                        <View style={styles.table_body}>
                                            <View style={{ width: '45%' }}><Text style={[styles.table_data, styles.ptop]}>{x.TenGhep}</Text></View>
                                            <View style={{ width: '15%', flexDirection: "row", justifyContent: 'center' }}>
                                                <View>
                                                    <Checkbox
                                                        value={x.itemDiemDanhHangNgay.isVangMat}
                                                        onValueChange={(e) => {
                                                            setForm(e, idx, 'isVangMat')
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                            <View style={{ width: '25%' }}>
                                                <View>
                                                    <TextInput
                                                        keyboardType='number-pad'
                                                        value={x.itemDiemDanhHangNgay.SoGioNghi      }
                                                        onChangeText={(e) => setForm(e, idx, 'SoGioNghi')} />

                                                </View>
                                            </View>
                                            <View style={{ width: '15%', flexDirection: "row", justifyContent: 'center' }}>
                                                <Entypo name="open-book" size={24} color="black"
                                                    onPress={() => {
                                                        setObjGhiChu({
                                                            index: idx,
                                                            LyDoNghi: x.itemDiemDanhHangNgay.LyDoNghi
                                                        })
                                                        showDialog()
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
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Ghi chú</Dialog.Title>
                    <Dialog.ScrollArea>
                        <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                            <View>
                                <TextInput
                                    value={obj_GhiChu?.LyDoNghi}
                                    onChangeText={(e) => setObjGhiChu({
                                        ...obj_GhiChu,
                                        LyDoNghi: e
                                    })}
                                    variant="standard" />
                            </View>
                        </ScrollView>
                    </Dialog.ScrollArea>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Xác nhận </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

        </SafeAreaView>
    )
}
const styles = {
    btn: {
        paddingTop: 30,
        flexDirection: "row",
        justifyContent: 'center'
    },
    container: {
        margin: 10,
    },
    items: {
        padding: 10,
    },
    flex: {
        flex: 1,
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
    }
}