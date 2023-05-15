import * as React from 'react';
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { SimpleLineIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { createGuid } from '../../../../../common/common';

export default function ItemMonHoc({ item }) {
    const [isDisplay, setDisplay] = useState(false);
    return (
        <View style={styles.items}>
            <View style={styles.item_title}>
                <View style={styles.flex}>
                    <Entypo name="open-book" size={24} color="black" />
                    <Text style={styles.item_title_header}>{item.TenGiaoVien}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.item_content}>
                <View style={styles.flex}>
                    <Text style={styles.item_title_diem}> Chức danh: </Text>
                    <Text style={styles.item_title_number_diem}> {item.ChucDanh} </Text>
                </View>
                <View style={styles.flex}>
                    <Text style={styles.item_title_diem}> Học vị: </Text>
                    <Text style={styles.item_title_number_diem}> {item.HocVi} </Text>
                </View>
                <View>
                    <View style={styles.flex}>
                        <Text style={styles.item_title_diem}> Tổng số giờ giảng:  </Text>
                        <Text style={styles.item_title_number_diem}> {item.TongSoGioGiang} </Text>
                        <Pressable onPress={() => {
                            setDisplay(!isDisplay);
                        }}>
                            {isDisplay ? <SimpleLineIcons name="arrow-up" size={23} color="black" /> : <SimpleLineIcons name="arrow-down" size={23} color="black" />}

                        </Pressable>
                    </View>
                    {isDisplay && <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',padding:5 }}>
                            <View>
                                <View><Text>Lý thuyết</Text></View>
                                <View><Text style={styles.item_title_number_diem}>{item.LyThuyet}</Text></View>
                            </View>
                            <View>
                                <View><Text>Thực hành</Text></View>
                                <View><Text style={styles.item_title_number_diem}>{item.ThucHanh}</Text></View>
                            </View>
                            <View>
                                <View><Text>Kiêm nhiệm quy đổi</Text></View>
                                <View><Text style={styles.item_title_number_diem}>{item.QuyDoiGioGiang}</Text></View>
                            </View>
                        </View>
                        <View style={styles.border_bottom}></View>
                    </View>}
                </View>
                <View style={styles.flex}>
                    <Text style={styles.item_title_diem}> Giờ chuẩn: </Text>
                    <Text style={styles.item_title_number_diem}> {item.GioTieuChuan} </Text>
                </View>
                <View style={styles.flex}>
                    <Text style={styles.item_title_diem}> Giờ cố vấn học tập: </Text>
                    <Text style={styles.item_title_number_diem}> {item.GioCoVan} </Text>
                </View>
                <View style={styles.flex}>
                    <Text style={styles.item_title_diem}> Giờ thiếu: </Text>
                    <Text style={styles.item_title_number_diem}> {item.GioThieu} </Text>
                </View>
                <View style={styles.flex}>
                    <Text style={styles.item_title_diem}> Giờ vượt: </Text>
                    <Text style={styles.item_title_number_diem}> {item.GioVuot} </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    item_number_diem_dat: {
        color: '#00FF33',
        fontSize: 15,
        paddingBottom: 5,
        paddingRight: 5
    },
    item_number_diem_truot: {
        color: 'red',
        fontSize: 15,
        paddingBottom: 5,
        paddingRight: 5
    },
    item_title_number_diem: {
        fontSize: 15,
        paddingBottom: 5,
        paddingRight: 5,
        color:'blue',
        textAlign:'center'
    },
    item_xet_diem_thi: {
        flexDirection: 'row',
        // justifyContent: 'flex-end',
        // paddingLeft: 150
    },
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
    item_content: {
        backgroundColor: '#fff',
        padding: 8
    },
    _diem: {
        paddingLeft: 5,
        paddingTop: 3,
        color: 'blue'
    },
    item_title_header: {
        paddingLeft: 5,
        fontSize: 15,
        fontWeight: 'bold'
    },
    cursor: {
        cursor: 'pointer'
    },
    border_bottom: {
        borderColor: '#C6E2FF',
        borderWidth: 1,
        marginBottom: 8,
        marginTop: 8
    },
    item_title_diem: {
        fontSize: 15,
        paddingBottom: 5,
        paddingBottom: 5,
        width: 150
    },
});