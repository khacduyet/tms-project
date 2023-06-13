import React, { useEffect, useState } from "react";
import { Text, StyleSheet, useColorScheme, View } from 'react-native';
import HeaderBack from "../../../common/header";
import { Screens } from "../../../common/constant";
import { SafeAreaView } from "react-native";
import { TextInput } from "@react-native-material/core";
import { Entypo } from "@expo/vector-icons";
import { Button, } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { QuyTrinhServices } from "../../../services/danhmuc.service";
import { ScrollView } from "react-native";
import Checkbox from 'expo-checkbox';
import { ToastMessage } from "../../../common/components";
import { Dimensions } from 'react-native'

export default function SoGiaoAn({ route }) {
    const { item } = route.params;
    const [obj_data, setObj_data] = useState({})
    const nav = useNavigation();

    // API ------ 
    // console.log(item);
    const GetQuyTrinhSoGiaoAn = async () => {
        let res = await QuyTrinhServices.LapThoiKhoaBieu.GetQuyTrinhSoGiaoAn(item.Id);
        if (res) {
            setObj_data(res)
        }
    };

    useEffect(() => {
        GetQuyTrinhSoGiaoAn();
    }, []);
    // .end -----

    // function ------ 
    const GhiLai = async () => {
        let res = await QuyTrinhServices.LapThoiKhoaBieu.SetQuyTrinhSoGiaoAn(obj_data);
        if (res) {
            ToastMessage(res.Detail);
        }
    }
    const setForm = (e, idx, prop) => {
        let temp = obj_data.DSBaiGiangs
        let _this = temp[idx]
        _this = {
            ..._this,
            [prop]: e,
        }
        temp[idx] = _this
        let data = {
            ...obj_data,
            DSBaiGiangs: temp
        }
        setObj_data(data)
    }
    // .end -----
    return (
        <SafeAreaView>
            <HeaderBack header={Screens.SoGiaoAn} />
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.items}>
                        <TextInput
                            label={'Môn'}
                            value={item.TenMonHoc}
                            editable={false}
                            variant="standard" />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[styles.items, styles.flex]}>
                            <TextInput
                                label={'Loại sổ'}
                                value={item.TenLoaiSo}
                                editable={false}
                                variant="standard" />
                        </View>
                        <View style={[styles.items, styles.flex]}>
                            <TextInput
                                label={'Mã sổ'}
                                value={obj_data.Ma}
                                editable={false}
                                variant="standard" />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[styles.items, styles.flex]}>
                            <TextInput
                                label={'Số sổ'}
                                keyboardType='numeric'
                                value={obj_data.SoSo?.toString()}
                                editable={false}
                                variant="standard" />
                        </View>
                        <View style={[styles.items, styles.flex]}>
                            <TextInput
                                label={'Lớp'}
                                value={obj_data.TenLop}
                                editable={false}
                                variant="standard" />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[styles.items, styles.flex]}>
                            <TextInput
                                label={'Số chương'}
                                keyboardType='numeric'
                                value={obj_data.SoChuong?.toString()}
                                editable={false}
                                variant="standard" />
                        </View>
                        <View style={[styles.items, styles.flex]}>
                            <TextInput
                                label={'Số bài'}
                                keyboardType='numeric'
                                value={obj_data.SoBai?.toString()}
                                editable={false}
                                variant="standard" />
                        </View>
                    </View>
                    <View style={styles.items}>
                        <TextInput
                            label={'Tên sổ'}
                            value={obj_data.TenSo}
                            editable={false}
                            variant="standard" />
                    </View>
                </View>
                <View style={styles.body}>
                    <View>
                        <View style={styles.table_header}>
                            <View style={{ width: '55%' }}><Text style={styles.table_caption}>Tên bài</Text></View>
                            <View style={{ width: '15%' }}><Text style={styles.table_caption}>Số TT bài</Text></View>
                            <View style={{ width: '15%' }}><Text style={styles.table_caption}>Đã dạy </Text></View>
                            <View style={{ width: '15%' }}><Text style={styles.table_caption}>Thao thác</Text></View>
                        </View>
                        <ScrollView style={{ height: Dimensions.get('window').width/2 }}>
                            {
                                obj_data.DSBaiGiangs?.map((x, idx) => {


                                    
                                    return (
                                        <View style={styles.table_body}>
                                            <View style={[styles.linedataLeft, styles.w_55]}><Text style={[styles.table_data, styles.ptop]}>{x.TenBai}</Text></View>
                                            <View style={[styles.linedata, styles.w_15]}><Text style={[styles.table_data, styles.ptop]}>Bài {x.SoBai}</Text></View>
                                            <View style={[styles.linedata, styles.w_15]}>
                                                <View>
                                                    <Checkbox
                                                        value={x?.IsDaDay}
                                                        onValueChange={(e) => {
                                                            setForm(e, idx, 'IsDaDay')
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                            <View style={[styles.linedata, styles.w_15]}>
                                                <View>
                                                    <Entypo name="edit" size={24} color="blue" onPress={() => {
                                                        nav.navigate(Screens.ChiTietBaiGiang, { item: x })
                                                    }} />
                                                </View>
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
                        style={{ width: '75%', backgroundColor: "#037bff" }}>
                        Xác nhận
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = {
    body: {
       
    },
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
        // padding: 10,
        // borderLeftWidth: 1,
        // borderRightWidth: 1,
        // borderBottomWidth: 1,
        // borderColor: 'blue',
        // alignItems: 'center'
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
        padding: 10
    },
    linedataLeft: {
        flexDirection: "row",
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'blue',
        padding: 10
    },
    w_55: {
        width: '55%'
    },
    w_45: {
        width: '45%'
    },
    w_25: {
        width: '25%'
    },
    w_15: {
        width: '15%'
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
}