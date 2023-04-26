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
                    <Text style={styles.item_title_header}>{item.MaMonHoc} - {item.TenMonHoc} ({item.TinChi} TC) </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.item_content}>
                <View>
                    <View style={styles.flex}>
                        <Text style={styles.item_title_diem}> Điểm trung bình:  </Text>
                        <Text style={styles.item_title_number_diem}> {item.DiemTB} </Text>
                        <Pressable onPress={() => {
                            setDisplay(!isDisplay);
                        }}>
                            {isDisplay ? <SimpleLineIcons name="arrow-up" size={23} color="black" /> : <SimpleLineIcons name="arrow-down" size={23} color="black" />}

                        </Pressable>
                    </View>
                    {isDisplay && <View>
                        <View>
                            <Text style={styles.item_title_diem}> Điểm kiểm tra thường xuyên </Text>
                            <View style={styles.flex}>
                                {item.listDiemKTThuongXuyen.map(x => {
                                    let _key = createGuid()
                                    return <Text style={styles._diem} key={_key}> {x.Diem} </Text>
                                })}
                            </View>
                        </View>
                        <View style={styles.item_title_diem}>
                            <Text> Điểm kiểm tra định kỳ </Text>
                            <View style={styles.flex}>
                                {item.listDiemKTDinhKy.map(x => {
                                    let _key = createGuid()
                                    return <Text style={styles._diem} key={_key}> {x.Diem} </Text>
                                })}
                            </View>
                        </View>
                        <View style={styles.border_bottom}></View>
                    </View>}
                </View>
                <View style={styles.flex}>
                    <Text style={styles.item_title_diem}> Điểm thi: </Text>
                    <Text style={styles.item_title_number_diem}> {item.DiemThi} </Text>
                </View>
                <View style={styles.flex}>
                    <Text style={[styles.item_title_diem]}> Điểm tổng kết: </Text>
                    <Text style={[item.DiemTongKet > 5 ? styles.item_number_diem_dat : styles.item_number_diem_truot,]}> {Math.round(item.DiemTongKet)} </Text>
                    <View style={[styles.item_xet_diem_thi,{flex:1}]}>
                        <Text style={[item.DiemTongKet > 5 ? styles.item_number_diem_dat : styles.item_number_diem_truot, {textAlign:'right',flex:1}]}> {item.KetQua} </Text>
                    </View>
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
        paddingRight: 5
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
        marginBottom:16
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