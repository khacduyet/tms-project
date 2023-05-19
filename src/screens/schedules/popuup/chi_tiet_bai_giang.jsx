import React, { useRef, useState } from "react";
import { Text, View, TextInput as MyTextInput } from 'react-native';
import HeaderBack from "../../../common/header";
import { Screens } from "../../../common/constant";
import { SafeAreaView } from "react-native";
import { TextInput } from "@react-native-material/core";
import { Entypo } from "@expo/vector-icons";
import { Button, Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from 'react-native-element-dropdown';
import { TouchableOpacity } from "react-native";
import { ScrollView } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import { formatDateStringGMT } from "../../../common/common";
import { useEffect } from "react";
import { QuyTrinhServices } from "../../../services/danhmuc.service";
import { Dimensions } from "react-native";
import RenderHTML from "react-native-render-html";


export default function ChiTietBaiGiang({ route }) {
    const { item } = route.params;
    const [isPopUp, setisPopUp] = React.useState(false)
    const [obj_Popup, setobj_Popup] = React.useState({})
    const showPopUp = (value, title, prop) => {
        let data = {
            title: title,
            [prop]: value
        }
        setisPopUp(true)
        setobj_Popup(data)
    };
    const hidePopUp = () => setisPopUp(false);
    return (
        <SafeAreaView>
            <HeaderBack header={Screens.ChiTietBaiGiang} />
            <ScrollView style={{ height: Dimensions.get('window').height }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.items, styles.flex]}>
                                <TextInput
                                    label={'Tên chương'}
                                    keyboardType='numeric'
                                    value={item?.TenChuong?.toString()}
                                    editable={false}
                                    variant="standard" />
                            </View>
                            <View style={[styles.items, styles.flex]}>
                                <TextInput
                                    label={'Số TT bài'}
                                    value={item.SoBai}
                                    editable={false}
                                    variant="standard" />
                            </View>
                        </View>
                        <View style={styles.items}>
                            <TextInput
                                label={'Tên bài'}
                                value={item.TenBai}
                                editable={false}
                                variant="standard" />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.items, styles.flex]}>
                                <TextInput
                                    label={'Tổng số giờ thực hiện'}
                                    keyboardType='numeric'
                                    value={item.TongSoGio?.toString()}
                                    editable={false}
                                    variant="standard" />
                            </View>
                            <View style={[styles.items, styles.flex]}>
                                <TextInput
                                    label={'Ghi chú'}
                                    value={item.GhiChu}
                                    editable={false}
                                    variant="standard" />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.items, styles.flex]}>
                                <TextInput
                                    label={'Từ ngày'}
                                    value={formatDateStringGMT(item.NgayBatDau, "dd/mm/yyyy")}
                                    editable={false}
                                    variant="standard" />
                            </View>
                            <View style={[styles.items, styles.flex]}>
                                <TextInput
                                    label={'Đến ngày'}
                                    value={formatDateStringGMT(item.NgayKetThuc, "dd/mm/yyyy")}
                                    editable={false}
                                    variant="standard" />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => {
                            showPopUp(item?.NoiDungTomTat, 'Nội dung', 'NoiDungTomTat')
                        }}>
                            <View style={styles.items}>
                                <TextInput
                                    label={'Nội dung'}
                                    value={item?.NoiDungTomTat}
                                    editable={false}
                                    variant="standard" />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.items}>
                            <TextInput
                                label={'Mục tiêu giảng dạy'}
                                value={item?.MucTieu}
                                editable={false}
                                variant="standard" />
                        </View>
                    </View>
                    <View>
                        <TabIndex item={item} />
                    </View>
                </View>
                <Portal>
                    <Dialog visible={isPopUp} onDismiss={hidePopUp}>
                        <Dialog.Title>
                            {obj_Popup.title}
                        </Dialog.Title>
                        <Dialog.ScrollArea>
                            <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
                                <View style={styles.items}>
                                    <Text>
                                        {obj_Popup.NoiDungTomTat}
                                    </Text>
                                </View>
                            </ScrollView>
                        </Dialog.ScrollArea>
                        <Dialog.Actions>
                            <Button onPress={hidePopUp}>Đóng</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ScrollView>
        </SafeAreaView>
    )
}
// ---- Tab index --------

function TabIndex({ item }) {
    const [tabIndex, setTabIndex] = useState(0);
    const TextButtonTab = {
        DayHoc: "Đồ dùng dạy học",
        BaiHoc: "Thực hiên bài học",
        GiangDay: "Tài liệu giảng dạy",
    };
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
                            {TextButtonTab.DayHoc}
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
                            {TextButtonTab.BaiHoc}
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
                            {TextButtonTab.GiangDay}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[bodys.container]}>
                    {tabIndex === 0 && <DayHocT dodung={item.DoDungs} />}
                    {tabIndex === 1 && <BaiHocT ThucHien={item.ThucHiens} />}
                    {tabIndex === 2 && <GiangDayT FileDinhKem={item.FileDinhKems} />}
                </View>
            </View>
        </SafeAreaView>
    )
}

const DayHocT = ({ dodung }) => {
    return (
        <Table dodung={dodung} />
    )
}

const BaiHocT = ({ ThucHien }) => {
    const [visible, setVisible] = React.useState(false)
    const [obj_Popup, setobj_Popup] = React.useState({})
    const showDialog = (x) => {
        setVisible(true)
        setobj_Popup(x)
    };
    const hideDialog = () => setVisible(false);
    const source = {
        html: `
      <p style='text-align:center;'>
        Hello World!
      </p>`
    };
    return (
        <View style={styles.body}>
            <View>
                <View style={styles.table_header}>
                    <View style={{ width: '60%' }}><Text style={styles.table_caption}>Nội dung</Text></View>
                    <View style={{ width: '25%' }}><Text style={styles.table_caption}>Thời gian</Text></View>
                    <View style={{ width: '15%' }}><Text style={styles.table_caption}>Chi tiết</Text></View>
                </View>
                <ScrollView style={{ height: 400 }}>
                    {
                        ThucHien.map((x, idx) => {
                            return (
                                <View style={styles.table_body}>
                                    <View style={[styles.linedata, styles.w_60]}><Text style={[styles.table_data, styles.ptop]}>{x.NoiDung}</Text></View>
                                    <View style={[styles.linedata, styles.w_25]}><Text style={[styles.table_data, styles.ptop]}>{x.ThoiGian} phút</Text></View>
                                    <View style={[styles.linedata, styles.w_15]}>
                                        <View>
                                            <Entypo name="edit" size={24} color="blue" onPress={() => { showDialog(x) }} />
                                        </View>
                                    </View>
                                    <Portal>
                                        <Dialog visible={visible} onDismiss={hideDialog}>
                                            <Dialog.Title>{obj_Popup.NoiDung}</Dialog.Title>
                                            <Dialog.ScrollArea>
                                                <ScrollView contentContainerStyle={{ paddingHorizontal: 4 }}>
                                                    <View style={[styles.items,]}>
                                                        <Text style={{ fontWeight: 'bold', paddingBottom: 8 }}>Thời gian (phút) </Text>
                                                        <View style={styles.textAreaContainer} >
                                                            <MyTextInput
                                                                style={styles.textInput}
                                                                value={x?.ThoiGian.toString()}
                                                                editable={false}
                                                                underlineColorAndroid="transparent"
                                                            />
                                                        </View>
                                                    </View>
                                                    <View style={[styles.items,]}>
                                                        <Text style={{ fontWeight: 'bold', paddingBottom: 8 }}>Giáo viên</Text>
                                                        <View style={styles.textAreaContainer} >
                                                            {/* <MyTextInput
                                                                style={styles.textArea}
                                                                underlineColorAndroid="transparent"
                                                                placeholder="Type something"
                                                                value={obj_Popup?.HoatDongGV}
                                                                numberOfLines={8}
                                                                multiline={true}
                                                            /> */}
                                                            <RenderHTML
                                                                source={{
                                                                    html: `${obj_Popup?.HoatDongGV}
                                                                `}}
                                                            />
                                                        </View>
                                                    </View>
                                                    <View style={[styles.items,]}>
                                                        <Text style={{ fontWeight: 'bold', paddingBottom: 8 }}>Sinh viên</Text>
                                                        <View style={styles.textAreaContainer} >
                                                            <MyTextInput
                                                                style={styles.textArea}
                                                                underlineColorAndroid="transparent"
                                                                value={obj_Popup?.HoatDongSV}
                                                                placeholder="Type something"
                                                                numberOfLines={8}
                                                                multiline={true}
                                                            />
                                                        </View>
                                                    </View>
                                                </ScrollView>
                                            </Dialog.ScrollArea>
                                            <Dialog.Actions>
                                                <Button onPress={hideDialog}>Đóng</Button>
                                            </Dialog.Actions>
                                        </Dialog>
                                    </Portal>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>

    )
}

const GiangDayT = ({ FileDinhKem }) => {
    const [visible, setVisible] = React.useState(false)
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    return (
        <View style={styles.body}>
            <View>
                <View style={styles.table_header}>
                    <View style={{ width: '35%' }}><Text style={styles.table_caption}>Tệp</Text></View>
                    <View style={{ width: '50%' }}><Text style={styles.table_caption}>Đường dẫn</Text></View>
                    <View style={{ width: '15%' }}><Text style={styles.table_caption}>Chi tiết</Text></View>
                </View>
                <ScrollView style={{ height: 400 }}>
                    {
                        FileDinhKem.map((x, idx) => {
                            return (
                                <View style={styles.table_body}>
                                    <View style={[styles.linedata, styles.w_35]}><Text style={[styles.table_data, styles.ptop]}>{x.FileName}</Text></View>
                                    <View style={[styles.linedata, styles.w_50]}><Text style={[styles.table_data, styles.ptop]}>{x.LinkNgoai}</Text></View>
                                    <View style={[styles.linedata, styles.w_15]}>
                                        <View>
                                            <Entypo name="edit" size={24} color="blue" onPress={showDialog} />
                                        </View>
                                    </View>
                                    <Portal>
                                        <Dialog visible={visible} onDismiss={hideDialog}>
                                            <Dialog.ScrollArea>
                                                <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                                                    <View>
                                                        <Text>Người tải lên: {x?.NguoiUp}</Text>
                                                    </View>
                                                    <View>
                                                        <Text>Thời gian tải lên tải lên: {formatDateStringGMT(x?.NgayUp, "dd/mm/yyyy")} </Text>
                                                    </View>
                                                </ScrollView>
                                            </Dialog.ScrollArea>
                                            <Dialog.Actions>
                                                <Button onPress={hideDialog}>Done</Button>
                                            </Dialog.Actions>
                                        </Dialog>
                                    </Portal>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>

    )
}

const Table = ({ dodung }) => {
    const [visible, setVisible] = React.useState(false)
    const showDialog = (x) => {
        setVisible(true)
        setobj_Popup(x)
    };
    const hideDialog = () => setVisible(false);
    const [obj_Popup, setobj_Popup] = React.useState({})
    return (
        <View style={styles.body}>
            <View>
                <View style={styles.table_header}>
                    <View style={{ width: '25%' }}><Text style={styles.table_caption}>Mã</Text></View>
                    <View style={{ width: '45%' }}><Text style={styles.table_caption}>Tên đồ dùng</Text></View>
                    <View style={{ width: '15%' }}><Text style={styles.table_caption}>Số lượng </Text></View>
                    <View style={{ width: '15%' }}><Text style={styles.table_caption}>Chi tiết</Text></View>
                </View>
                <ScrollView style={{ height: 400 }}>
                    {
                        dodung.map((x, idx) => {
                            return (
                                <View style={styles.table_body}>
                                    <View style={[styles.linedata, styles.w_25]}><Text style={[styles.table_data, styles.ptop]}>{x.Ma}</Text></View>
                                    <View style={[styles.linedata, styles.w_45]}>
                                        <Text style={[styles.table_data, styles.ptop]}>{x?.TenDoDung}</Text>
                                    </View>
                                    <View style={[styles.linedata, styles.w_15]}>
                                        <View>
                                            <Text style={[styles.table_data, styles.ptop]}>{x?.SoLuong}</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.linedata, styles.w_15]}>
                                        <View>
                                            <Entypo name="edit" size={24} color="blue" onPress={() => { showDialog(x) }} />
                                        </View>
                                    </View>
                                    <Portal>
                                        <Dialog visible={visible} onDismiss={hideDialog}>
                                            <Dialog.Title>
                                                {obj_Popup.Ma} - {obj_Popup?.TenDoDung}
                                            </Dialog.Title>
                                            <Dialog.ScrollArea>
                                                <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
                                                    <View style={styles.items}>
                                                        <TextInput
                                                            label={'Mục đích sử dụng'}
                                                            value={obj_Popup?.MucDich}
                                                            editable={false}
                                                            variant="standard" />
                                                    </View>
                                                    <View style={styles.items}>
                                                        <TextInput
                                                            label={'Ghi chú'}
                                                            value={obj_Popup?.GhiChu}
                                                            editable={false}
                                                            variant="standard" />
                                                    </View>
                                                </ScrollView>
                                            </Dialog.ScrollArea>
                                            <Dialog.Actions>
                                                <Button onPress={hideDialog}>Đóng</Button>
                                            </Dialog.Actions>
                                        </Dialog>
                                    </Portal>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    )
}

const styles = {
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
        // borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'blue',
        padding: 10,
        alignItems: 'center'
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
    textAreaContainer: {
        borderColor: '#929292',
        borderWidth: 1,
        padding: 5,
        borderRadius: 8
    },
    textArea: {
        height: 100,
        justifyContent: "flex-start"
    },
    textInput: {
        height: 20,
        justifyContent: "flex-start"
    }
}

const bodys = {
    container: {
        width: "100%",
        height: "100%",
    },
};