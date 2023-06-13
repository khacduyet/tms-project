import React, { useState } from "react";
import { Text, StyleSheet, useColorScheme, View, TextInput as MyTextInput, Modal, FlatList, } from 'react-native';
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
import { Dimensions } from "react-native";
import { useMemo } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Pressable } from 'react-native';

export default function BangGhiDiem({ route }) {
    const { itemdiemdanh, item } = route.params;
    const [listLoaiDiem, setListLoaiDiem] = useState([]);
    const nav = useNavigation();
    const [activeIndex, setActiveIndex] = useState(null)

    const [obj_data, setObj_data] = useState({})
    // API ------ 
    const getAllOptions = async () => {
        let $loaidiem = QuyTrinhServices.SinhVien.GetListdmLoaiDiem({});
        let res = await Promise.all([$loaidiem])
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

    const [modalVisible, setModalVisible] = useState(false);
    const [index, setIndex] = useState(null);
    const [reload, setReload] = useState(false);
    const getTenLoaiDiem = (id) => {
        let _thisLD = listLoaiDiem.find(x => x.Id === id);
        if (_thisLD)
            return _thisLD.Ten;
        return ``
    }
    const getShow = (index) => {
        let arr = obj_data.listDanhSachSinhVien.map((ele, idx) => {
            return {
                ...ele,
                isShow: ele.isShow ? (!ele.isShow) : (idx === index ? true : false)
            }
        });
        let data = {
            ...obj_data,
            listDanhSachSinhVien: arr
        }
        setObj_data(data)
    }
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
                {/* <View style={styles.body}>
                    <View>
                        <View style={styles.table_header}>
                            <View style={{ width: '45%' }}><Text style={styles.table_caption}>Họ Tên / MSV</Text></View>
                            <View style={{ width: '25%' }}><Text style={styles.table_caption}>Điểm</Text></View>
                            <View style={{ width: '30%' }}><Text style={styles.table_caption}>Loại điểm</Text></View>
                        </View>
                        <ScrollView style={{ height: Dimensions.get("window").height / 2.5 }}>
                            {
                                obj_data.listDanhSachSinhVien?.map((x, idx) => {
                                    return (
                                        <View style={styles.table_body}>
                                            <View style={{ width: '45%', }}>
                                                <Text style={[styles.table_data, styles.ptop]}>{x.TenGhep}</Text>
                                                <Text style={[styles.table_data, styles.ptop]}>{x.MaSinhVien}</Text></View>
                                            <View style={{ width: '25%', }}>
                                                <View>
                                                    <TextInput
                                                        keyboardType='numeric'
                                                        value={x.itemBangDiemHangNgay.Diem?.toString()}
                                                        onChangeText={(e) => setForm(e, idx, 'Diem')} />
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
                                                    placeholder="Chọn"
                                                    style={[styles.dropdown, styles.flex]}
                                                    maxHeight={250}
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
                </View> */}
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize:'18',margin: 10
                
                
                
                }}>Danh sách sinh viên</Text>
                </View>
                <View style={{ borderTopWidth: 1, borderColor: '#666666', margin: 10 }}>
                    <ScrollView style={{ height: Dimensions.get("window").height / 2.5 }}>
                        {
                            obj_data.listDanhSachSinhVien?.map((x, idx) => {
                                return (
                                    <View style={styles.itemTable}>
                                        <View style={[styles.sinhvien, styles.d_flex, styles.justifyContent_between]}>
                                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                                <View style={{ width: 152 }}><Text>{idx + 1}.18A10010121</Text></View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}><Text >{x.TenGhep}</Text></View>
                                            </View>
                                            <View>
                                                <Pressable onPress={() => {
                                                    // setActiveIndex(idx)

                                                    // if (activeIndex) {
                                                    //     setActiveIndex(null)
                                                    // } else setActiveIndex(idx)
                                                    // setReload(!reload)
                                                    getShow(idx)
                                                    setReload(!reload)
                                                }}>
                                                    {/* {activeIndex === idx ? <SimpleLineIcons name="arrow-up" size={23} color="black" /> : <SimpleLineIcons name="arrow-down" size={23} color="black" />} */}
                                                    {x.isShow ? <SimpleLineIcons name="arrow-up" size={23} color="black" />
                                                        : <SimpleLineIcons name="arrow-down" size={23} color="black" />}
                                                </Pressable>
                                            </View>
                                        </View>
                                        {x.isShow && <View style={{ paddingLeft: 16 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 20, }}>
                                                <View style={{ width: 100 }}><Text>Điểm</Text></View>
                                                <TextInput
                                                    keyboardType='numeric'
                                                    style={{ flex: 1, paddingLeft: 35 }}
                                                    inputContainerStyle={{ height: 50 }}
                                                    value={x.itemBangDiemHangNgay.Diem?.toString()}
                                                    onChangeText={(e) => setForm(e, idx, 'Diem')} />

                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Dropdown
                                                    data={listLoaiDiem.map(x => {
                                                        return {
                                                            label: x.Ten,
                                                            value: x.Id
                                                        }
                                                    })}
                                                    autoScroll
                                                    itemContainerStyle={{}}
                                                    labelField={'label'}
                                                    valueField={'value'}
                                                    placeholder="Chọn loại điểm"
                                                    style={[styles.dropdown, styles.flex]}
                                                    maxHeight={250}
                                                    searchPlaceholder="Search..."
                                                    value={x.itemBangDiemHangNgay.IdLoaiDiem}
                                                    onChange={(e) => {
                                                        setForm(e.value, idx, 'IdLoaiDiem')
                                                    }} />
                                            </View>
                                        </View>}
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
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

const Select = (props) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props?.visible}
            onRequestClose={() => {
            }}
        >
            <View style={select.modalView}>
                <View style={select.content}>
                    <View style={select.header}>
                        <Text>Chọn Loại Điểm</Text>
                        <Text style={{ color: 'red' }}
                            onPress={() => {
                                props.onHide(false)
                            }}>Đóng</Text>
                    </View>
                    <View style={select.body}>
                        {
                            <FlatList
                                data={props.listLoaiDiem}
                                renderItem={({ item }) => {
                                    return (
                                        <View>
                                            <Text style={{ textAlign: 'center', padding: 16 }} onPress={() => { props.onSelect(item.Id) }}>
                                                {item.Ten}</Text>
                                        </View>
                                    )
                                }}
                                keyExtractor={item => item.Id}
                            />
                        }
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const select = {
    modalView: {
        flex: 1,
        backgroundColor: '#000000AA'
    },
    content: {
        bottom: 0,
        position: 'absolute',
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: Dimensions.get('window').height * 0.4,
        maxHeight: Dimensions.get('window').height * 0.4,
    },
    header: {
        borderBottomWidth: 1,
        borderColor: '#C0C0C0',
        height: Dimensions.get('window').height * 0.06,
        maxHeight: Dimensions.get('window').height * 0.06,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16
    },
    title: {

    },
    textAlign_center: {
        textAlign: 'center'
    },
    textAlign_right: {
        textAlign: 'right'
    }
}

const styles = {
    itemTable: {
        paddingTop: 20,
        paddingBottom: 20, borderBottomWidth: 1, borderColor: '#666666'
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
        width: '100%'
    },
    input_text: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#ced4da',
        borderRadius: 8
    },
    d_flex: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    justifyContent_between: {
        justifyContent: 'space-between'
    }
}