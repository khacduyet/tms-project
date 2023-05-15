import React, { useState } from "react";
import { Text, StyleSheet, useColorScheme, View, TextInput as MyTextInput } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useDispatch, useSelector } from "react-redux";
import HeaderBack from "../../../common/header";
import { Screens } from "../../../common/constant";
import { SafeAreaView } from "react-native";
import { TextInput } from "@react-native-material/core";
import { Entypo } from "@expo/vector-icons";
import { Button, RadioButton, } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from 'react-native-element-dropdown';
import { MultiSelect } from 'react-native-element-dropdown';
import { TouchableOpacity } from "react-native";
import { ScrollView } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import { DateToUnix, formatDateStringGMT } from "../../../common/common";
import { useEffect } from "react";
import { AuthServices, QuyTrinhServices } from "../../../services/danhmuc.service";
import AntDesign from '@expo/vector-icons/AntDesign';
import { ToastMessage } from "../../../common/components";
import { OPT } from "..";

export default function KhaiBaoThucGiang({ route }) {
    const nav = useNavigation();
    const { itemdiemdanh, item, opt } = route.params;

    const [value, setValue] = useState(null);
    const [isChecked, setChecked] = useState(false);
    const [listBoPhan, setListBoPhan] = useState([]);
    const [listKiemNhiem, setListKiemNhiem] = useState([]);
    const [selected, setSelected] = useState([]);
    const [quyTrinh, setQuyTrinh] = useState({
        Id: null,
        listChiTiet: []
    })

    const getQuyTrinh = async () => {
        if (opt === OPT.UPDATE) {
            let res = await QuyTrinhServices.DanhSachMonHoc.GetQuyTrinhKhaiBaoGioGiang(itemdiemdanh.IdQuyTrinhKhaiBaoGioGiang);
            if (res) {
                // console.log('res qt', res);
                setQuyTrinh(res)
            }
        }
    }

    const GetDanhSachBoPhanTheoLoai = async () => {
        let res = await QuyTrinhServices.DanhMuc.GetDanhSachBoPhanTheoLoai();
        if (res) {
            setListBoPhan(res)
        }
    }
    const GetListdmQuyDinhKiemNhiem = async () => {
        let res = await QuyTrinhServices.DanhMuc.GetListdmQuyDinhKiemNhiem({});
        if (res) {
            setListKiemNhiem(res)
        }
    }

    useEffect(() => {
        GetDanhSachBoPhanTheoLoai();
        GetListdmQuyDinhKiemNhiem();
        getQuyTrinh();
    }, []);

    return (
        <SafeAreaView>
            <HeaderBack header={Screens.KhaiBaoThucGiang} />
            <ScrollView style={{ height: '90%', }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.items}>
                            <Dropdown
                                data={listBoPhan.map(x => {
                                    return {
                                        label: x.TenBoPhan,
                                        value: x.Id
                                    }
                                })}
                                labelField={'label'}
                                valueField={'value'}
                                style={[styles.dropdown, styles.flex]}
                                value={quyTrinh?.IdBoPhan}
                                onChange={(e) => {
                                    setQuyTrinh({ ...quyTrinh, IdBoPhan: e.value })
                                }}
                            />
                        </View>
                        <View style={styles.items}>
                            <TextInput
                                label={'Lớp'}
                                value={itemdiemdanh.TenLopHoc}
                                editable={false}
                                variant="standard" />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.items, styles.flex]}>
                                <TextInput
                                    label={'Ngày'}
                                    editable={false}
                                    value={formatDateStringGMT(item.Ngay, "dd/mm/yyyy")}
                                    variant="standard" />
                            </View>
                            <View style={[styles.items, styles.flex]}>
                                <TextInput
                                    label={'Buổi'}
                                    value={itemdiemdanh.TenCaHoc}
                                    editable={false}
                                    variant="standard" />
                            </View>
                        </View>
                        <View style={styles.items}>
                            <TextInput
                                label={'Môn'}
                                value={itemdiemdanh?.TenMonHoc}
                                editable={false}
                                variant="standard" />
                        </View>
                        {/* <View style={styles.items}>
                            <Text>Vị trí kiêm nghiệm</Text>
                            <MultiSelect
                                style={styles.dropdownp}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                search
                                data={listKiemNhiem.map(a => {
                                    return {
                                        label: a.Ten,
                                        value: a.Id
                                    }
                                })}
                                labelField="label"
                                valueField="value"
                                placeholder="Chọn "
                                searchPlaceholder="Search..."
                                value={quyTrinh?.}
                                onChange={item => {
                                    setSelected(item);
                                }}
                                renderLeftIcon={() => (
                                    <AntDesign
                                        style={styles.icon}
                                        color="black"
                                        name="Safety"
                                        size={20}

                                    />
                                )}
                                selectedStyle={styles.selectedStyle} />
                        </View> */}
                        <View style={styles.items}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Checkbox
                                    value={isChecked}
                                    onValueChange={setChecked}
                                    color={isChecked ? '#4630EB' : undefined}
                                />
                                <Text style={{ paddingLeft: 8 }}>Xác nhận đã dạy: {itemdiemdanh.SoTietHoc}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.markdown}></View>
                    <View>
                        <TabIndex itemdiemdanh={itemdiemdanh} item={item} isChecked={isChecked} quyTrinh={quyTrinh} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
// ---- Tab index --------

function TabIndex({ itemdiemdanh, item, isChecked, quyTrinh }) {
    const [tabIndex, setTabIndex] = useState(0);
    const TextButtonTab = {
        NoiDung: "Cập nhật nội dung",
        QuanLy: "Quản lý HS/SV",
        DanhGia: "Đánh giá",
    };
    const [arr, setArr] = useState([])
    const [obj, setObj] = useState({
        listChiTiet_DanhGia: [],
        listChiTiet_HSCaBiet: []
    })
    const currentUser = useSelector((state) => state.currentUser);
    const GetListSoGiaoAnByLopMon = async () => {
        let data = {
            ListIddmLopHoc: itemdiemdanh.listIddmLopHoc,
            IdDanhSachMonHoc: itemdiemdanh.IdDSMonHoc
        }
        let res = await QuyTrinhServices.DanhSachMonHoc.GetListSoGiaoAnByLopMon(data);
        if (res) {
            setArr(res)
        }
    }

    useEffect(() => {
        GetListSoGiaoAnByLopMon();
    }, []);

    const GhiLai = async () => {
        let data = {
            IdBoPhan: quyTrinh.IdBoPhan,
            IdUserGiaoVien: currentUser.Id,
            Nam: new Date(item.Ngay).getFullYear(),
            ToiTuan: item.Tuan,
            TuTuan: item.Tuan,
            listChiTiet: [
                {
                    Ngay: item.Ngay,
                    NgayUnix: 1678070878,
                    listChiTiet_DanhGia: obj.listChiTiet_DanhGia,
                    listChiTiet_HSCaBiet: obj.listChiTiet_HSCaBiet,
                    listChiTiet_Lop: itemdiemdanh.listIddmLopHoc.map(x => {
                        return {
                            IddmLop: x
                        }
                    }),
                    listChiTiet_NoiDung: obj.listChiTiet_NoiDung,
                    listChiTiet_SiSo: [],
                    listChiTiet_TietHoc: itemdiemdanh.ListChiTietTietHoc.map(x => {
                        return {
                            IddmTietHoc: x.IddmTietHoc,
                            LoaiTiet: x.LoaiTiet
                        }
                    }),
                    listIddmLop: itemdiemdanh.listIddmLopHoc,
                    listIddmQuyDinhKiemNhiem: []
                }
            ]
        }
        // console.log('data', data);
        let res = await QuyTrinhServices.DanhSachMonHoc.SetQuyTrinhKhaiBaoGioGiang(data);
        if (res) {
            ToastMessage(res.Detail);
        }
    }
    return (
        <SafeAreaView>
            <View style={[styles.container]}>
                <View style={[styles.tab]}>
                    <TouchableOpacity style={[styles.buttonTab, tabIndex === 0 && styles.buttonTabActive]}
                        onPress={() => {
                            setTabIndex(0);
                        }}>
                        <Text style={[
                            styles.buttonTabText,
                            tabIndex === 0 && styles.buttonTabTextActive,
                        ]}>
                            {TextButtonTab.NoiDung}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonTab, tabIndex === 1 && styles.buttonTabActive]}
                        onPress={() => {
                            setTabIndex(1);
                        }}>
                        <Text style={[
                            styles.buttonTabText,
                            tabIndex === 1 && styles.buttonTabTextActive,
                        ]}>
                            {TextButtonTab.QuanLy}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonTab, tabIndex === 2 && styles.buttonTabActive]}
                        onPress={() => {
                            setTabIndex(2);
                        }}>
                        <Text style={[
                            styles.buttonTabText,
                            tabIndex === 2 && styles.buttonTabTextActive,
                        ]}>
                            {TextButtonTab.DanhGia}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[bodys.container, {

                }]}>
                    {tabIndex === 0 && <Table quyTrinh={quyTrinh} listSo={arr} itemdiemdanh={itemdiemdanh} item={item} obj={
                        {
                            obj: obj,
                            setObj: setObj
                        }
                    } />}
                    {tabIndex === 1 && <QuanLy listSo={arr} itemdiemdanh={itemdiemdanh} item={item} obj={
                        {
                            obj: obj,
                            setObj: setObj
                        }
                    } />}
                    {tabIndex === 2 && <DanhGia listSo={arr} itemdiemdanh={itemdiemdanh} item={item} obj={
                        {
                            obj: obj,
                            setObj: setObj
                        }
                    } />}
                </View>
                <View style={[styles.btn, {}]}>
                    <Button icon="check" mode="contained"
                        disabled={!isChecked}
                        onPress={GhiLai}
                        style={{ width: '75%' }}>
                        Xác nhận
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

const QuanLy = ({ listSo, itemdiemdanh, item, obj }) => {
    const [obj_data, setObj_data] = useState({})
    const [listSinhVien, setListSinhVien] = useState([])
    const GetListSinhVienLop = async () => {
        let res = await QuyTrinhServices.DanhSachMonHoc.GetListSinhVienLop(itemdiemdanh.listIddmLopHoc)
        if (res) {
            setListSinhVien(res)
        }
    }
    useEffect(() => {
        GetListSinhVienLop();
    }, []);
    const [refresh, setRefresh] = useState(false)
    // FC -----
    const setForm = (e, idx, prop) => {
        let temp = obj.obj.listChiTiet_HSCaBiet
        let _this = temp[idx]
        _this = {
            ..._this,
            [prop]: e,
        }
        temp[idx] = _this
        obj.setObj({
            ...obj.obj,
            listChiTiet_HSCaBiet: temp
        });
    }
    const add = () => {
        let data = {
            NoiDung: '',
            IdSinhVien: ''
        }
        let arr = [...(obj.obj.listChiTiet_HSCaBiet ? obj.obj.listChiTiet_HSCaBiet : [])];
        arr.push(data)
        obj.setObj({
            ...obj.obj,
            listChiTiet_HSCaBiet: arr
        });
    }
    const Xoa = (idx) => {
        let arr = obj.obj.listChiTiet_HSCaBiet;
        arr.splice(idx, 1)
        obj.setObj({
            ...obj.obj,
            listChiTiet_HSCaBiet: arr
        });
    }
    // .end------
    console.log('obj', obj);
    return (
        <View style={styles.body}>
            <View>
                <View style={styles.table_header}>
                    <View style={{ width: '60%' }}><Text style={styles.table_caption}>Sinh viên</Text></View>
                    <View style={{ width: '25%' }}><Text style={styles.table_caption}>Nội dung</Text></View>
                    <View style={{ width: '15%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}><Entypo name="plus" size={24} color="#fff"
                            onPress={add}
                        /></View>
                    </View>
                </View>
                {
                    obj.obj.listChiTiet_HSCaBiet?.map((x, idx) => {
                        return (
                            <View style={styles.table_body}>
                                <View style={[styles.linedata, styles.w_60]}>
                                    <Dropdown
                                        data={listSinhVien.map(a => {
                                            return {
                                                label: a.TenSinhVien,
                                                value: a.IdSinhVien
                                            }
                                        })}
                                        labelField="label"
                                        valueField="value"
                                        style={[styles.dropdown, styles.flex]}
                                        searchPlaceholder="Search..."
                                        value={x?.IdSinhVien}
                                        onChange={item => {
                                            setForm(item.value, idx, 'IdSinhVien')
                                        }} />
                                </View>
                                <View style={[styles.linedata, styles.w_25]}>
                                    <View>
                                        <MyTextInput
                                            style={styles.input_text}
                                            value={x.NoiDung?.toString()}
                                            onChangeText={(e) => setForm(e, idx, 'NoiDung')}
                                        />
                                    </View>
                                </View>
                                <View style={[styles.linedata, styles.w_15]}>
                                    <View>
                                        <Entypo name="trash" size={24} color="black" onPress={() => {
                                            Xoa(idx)
                                        }} />
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </View>

    )
}

const DanhGia = ({ listSo, itemdiemdanh, item, obj }) => {
    const [listDanhGia, setListDanhGia] = useState([])
    const GetListSinhVienLop = async () => {
        let res = await QuyTrinhServices.DanhMuc.GetListdmDanhGia({})
        if (res) {
            setListDanhGia(res)
        }
    }
    useEffect(() => {
        GetListSinhVienLop();
    }, []);
    // FC -----
    const setForm = (e, idx, prop) => {
        let temp = obj.obj.listChiTiet_DanhGia
        let _this = temp[idx]
        _this = {
            ..._this,
            [prop]: e,
        }
        temp[idx] = _this
        obj.setObj({
            ...obj.obj,
            listChiTiet_DanhGia: temp
        });
    }
    const add = () => {
        let data = {
            NoiDung: '',
            IddmDanhGia: ''
        }
        let arr = [...(obj.obj.listChiTiet_DanhGia ? obj.obj.listChiTiet_DanhGia : [])];
        arr.push(data)
        obj.setObj({
            ...obj.obj,
            listChiTiet_DanhGia: arr
        });
    }
    const Xoa = (idx) => {
        let arr = obj.obj.listChiTiet_DanhGia;
        arr.splice(idx, 1)
        obj.setObj({
            ...obj.obj,
            listChiTiet_DanhGia: arr
        });
    }
    // .end------
    return (
        <View style={styles.body}>
            <View>
                <View style={styles.table_header}>
                    <View style={{ width: '60%' }}><Text style={styles.table_caption}>Loại đánh giá</Text></View>
                    <View style={{ width: '25%' }}><Text style={styles.table_caption}>Nội dung</Text></View>
                    <View style={{ width: '15%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}><Entypo name="plus" size={24} color="#fff"
                            onPress={add}
                        /></View>
                    </View>
                </View>
                {
                    obj.obj.listChiTiet_DanhGia?.map((x, idx) => {
                        return (
                            <View style={styles.table_body}>
                                <View style={[styles.linedata, styles.w_60]}>
                                    <Dropdown
                                        data={listDanhGia.map(a => {
                                            return {
                                                label: a.Ten,
                                                value: a.Id
                                            }
                                        })}
                                        labelField="label"
                                        valueField="value"
                                        style={[styles.dropdown, styles.flex]}
                                        searchPlaceholder="Search..."
                                        value={x?.IddmDanhGia}
                                        onChange={item => {
                                            setForm(item.value, idx, 'IddmDanhGia')
                                        }} />
                                </View>
                                <View style={[styles.linedata, styles.w_25]}>
                                    <View>
                                        <MyTextInput
                                            style={styles.input_text}
                                            value={x.NoiDung?.toString()}
                                            onChangeText={(e) => setForm(e, idx, 'NoiDung')}
                                        />
                                    </View>
                                </View>
                                <View style={[styles.linedata, styles.w_15]}>
                                    <View>
                                        <Entypo name="trash" size={24} color="black" onPress={() => {
                                            Xoa(idx)
                                        }} />
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </View>

    )
}

const Table = ({ quyTrinh, listSo, itemdiemdanh, item, obj }) => {
    const [isThoiGian, setIsThoiGian] = React.useState(1);
    const [visible, setVisible] = React.useState(false)
    const [index, setIndex] = useState(0);
    const [listGiangDay, setListGiangDay] = useState([]);
    const [selected, setSelected] = useState([]);
    const showDialog = (idx) => {
        if (selected.length) {
            let arr = [];
            let obj = {}
            selected?.forEach(x => {
                obj = listSo.find((a) => a.Id === x)
            })
            arr.push(obj);
            setListGiangDay(arr)
            setIndex(idx)
            setVisible(true)
        }
        else ToastMessage('Vui lòng chọn lấy từ sổ giáo án');
    };

    const hideDialog = () => {
        let list = arrChua;
        let _obj = list[index];
        let str = '';
        listCheck.forEach(ele => {
            str += `${ele.NoiDungTomTat} \n`
        })
        _obj.NoiDung = str
        list[index] = _obj;
        setArrChua(list)
        obj.setObj({
            ...obj.obj,
            listChiTiet_NoiDung: list
        });
        setVisible(false)
    };

    useEffect(() => {
        let arr = []
        if (isThoiGian === 0) {
            arr = itemdiemdanh.ListChiTietTietHoc.map(x => {
                return {
                    ...x,
                    Ten: x.TenTietHoc
                }
            })

        }
        else {
            arr = item.ListCaHoc.map(x => {
                return {
                    ...x,
                    Ten: x.TenCaHoc
                }
            })
        }
        obj.setObj({
            ...obj.obj,
            listChiTiet_NoiDung: arr
        });
        setArrChua(arr)
    }, [isThoiGian])

    // FC
    const [arrChua, setArrChua] = useState([]);
    const [listCheck, setListCheck] = useState([]);
    // const [listGiangDay, setListGiangDay] = useState([]);
    // const [selected, setSelected] = useState([]);
    // const checkGioGiang = (item) => {
    //     let arr = [];
    //     let obj = {}
    //     item.forEach(x => {
    //         obj = listSo.find((a) => a.Id === x)
    //     })
    //     arr.push(obj);
    //     setListGiangDay(arr)
    // }
    //  
    return (
        <View style={styles.body}>
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton.Android
                            value={0}
                            status={isThoiGian === 0 ? 'checked' : 'unchecked'}
                            onPress={() => setIsThoiGian(0)}
                        />
                        <Text>Theo tiết</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RadioButton.Android
                            value="second"
                            status={isThoiGian === 1 ? 'checked' : 'unchecked'}
                            onPress={() => setIsThoiGian(1)}
                        />
                        <Text>Theo Buổi</Text>
                    </View>
                </View>
                <View style={{ paddingTop: 16, paddingBottom: 16 }}>
                    {/* <MultiSelect
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        search
                        data={listSo.map(a => {
                            return {
                                label: a.TenSo,
                                value: a.Id
                            }
                        })}
                        labelField="label"
                        valueField="value"
                        placeholder="Select item"
                        searchPlaceholder="Search..."
                        value={selected}
                        onChange={item => {
                            checkGioGiang(item);
                            setSelected(item);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color="black"
                                name="Safety"
                                size={20}
                            />
                        )}
                        selectedStyle={styles.selectedStyle}
                    /> */}

                    <MultiSelect
                        style={styles.dropdownp}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        search
                        data={listSo.map(a => {
                            return {
                                label: a.TenSo,
                                value: a.Id
                            }
                        })}
                        labelField="label"
                        valueField="value"
                        placeholder="Chọn sổ giáo án"
                        searchPlaceholder="Search..."
                        value={selected}
                        onChange={item => {
                            setSelected(item);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color="black"
                                name="Safety"
                                size={20}

                            />
                        )}
                        selectedStyle={styles.selectedStyle} />
                </View>
            </View>
            <View>
                <View style={styles.table_header}>
                    <View style={{ width: '25%' }}><Text style={styles.table_caption}>{isThoiGian === 0 ? 'Tiết' : 'Buổi'}</Text></View>
                    <View style={{ width: '75%' }}><Text style={styles.table_caption}>Nội dung</Text></View>
                </View>
                <ScrollView style={{ height: 100, }}>
                    {
                        arrChua?.map((x, idx) => {
                            return (
                                <View ew style={styles.table_body}>
                                    <View style={[styles.linedata, styles.w_25]}><Text style={[styles.table_data, styles.ptop]}>{x?.Ten}</Text></View>
                                    <View style={[styles.linedata, styles.w_75]}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <View style={styles.textAreaContainer}>
                                                <Text numberOfLines={1}>{x?.NoiDung}</Text>
                                                {/* <MyTextInput
                                                style={styles.textArea}
                                                // value={x?.NoiDung.toString()}
                                                editable={false}
                                                underlineColorAndroid="transparent"
                                            /> */}
                                            </View>
                                            <View style={{ borderColor: 'blue', borderWidth: 1, borderRadius: 8, padding: 5 }}>
                                                <Text onPress={() => showDialog(idx)}>Chọn bài giảng</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
                <Portal>
                    <Dialog visible={visible} >
                        <Dialog.Title>Chọn bài từ sổ giáo án</Dialog.Title>
                        <Dialog.ScrollArea>
                            <ScrollView contentContainerStyle={{ paddingHorizontal: 2 }}>
                                {
                                    listGiangDay?.map((bg, idx_bg) => {
                                        return (
                                            <View>
                                                <Text>Sổ giáo án tiếng anh - tích hợp</Text>
                                                <View style={styles.table_header}>
                                                    <View style={{ width: '15%' }}></View>
                                                    <View style={{ width: '25%' }}><Text style={styles.table_caption}>Số TT bài</Text></View>
                                                    <View style={{ width: '60%' }}><Text style={styles.table_caption}>Tên bài</Text></View>
                                                </View>
                                                {
                                                    bg.DSBaiGiangs.map((baigiang, idx_chitiet) => {
                                                        return (
                                                            <View style={styles.table_body}>
                                                                <View style={[styles.linedata, styles.w_15]}>
                                                                    <Checkbox value={listCheck.includes(baigiang)} onValueChange={(e) => {
                                                                        if (listCheck.includes(baigiang)) {
                                                                            setListCheck((prev) => [...prev].filter(x => x.Id !== baigiang.Id));
                                                                        }
                                                                        else {
                                                                            setListCheck((prev) => [...prev, baigiang]);
                                                                        }
                                                                    }} />
                                                                </View>
                                                                <View style={[styles.linedata, styles.w_25]}>
                                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                                                                    </View>
                                                                </View>
                                                                <View style={[styles.linedata, styles.w_60]}><Text style={[styles.table_data, styles.ptop]}>{baigiang.TenBai}</Text></View>
                                                            </View>
                                                        )
                                                    })
                                                }
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                        </Dialog.ScrollArea>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </View>
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
        borderLeftWidth: 1,
        borderColor: 'blue',
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
    },
    textAlign: {
        textAlign: 'center'
    },
    linedata: {
        flexDirection: "row",
        justifyContent: 'center',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'blue',
        padding: 10,
        alignItems: 'center'
    },
    w_75: {
        width: '75%'
    },
    w_60: {
        width: '60%'
    },
    w_50: {
        width: '50%'
    },
    w_55: {
        width: '55%'
    },
    w_45: {
        width: '45%'
    },
    w_35: {
        width: '35%'
    },
    w_25: {
        width: '25%'
    },
    w_15: {
        width: '15%'
    },
    dropdown: {
        height: 45,
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
    markdown: {
        borderBottomColor: "#d0d7de",
        borderBottomWidth: 1,
        fontSize: 1.5,
    },
    // TAb index
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
    input_text: {
        height: 40,
        // margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#ced4da',
        borderRadius: 8,
    },
    textAreaContainer: {
        borderColor: '#929292',
        borderWidth: 1,
        padding: 5,
        borderRadius: 8,
        flex: 1
    },
    textArea: {
        height: 100,
        justifyContent: "flex-start"
    },
    // 
    dropdownp: {
        height: 50,
        backgroundColor: 'transparent',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    selectedStyle: {
        borderRadius: 12,
    },
}

const bodys = {
    container: {
        width: "100%",
        // height: "100%",
    },
};