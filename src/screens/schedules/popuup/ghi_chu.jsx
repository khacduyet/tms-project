import * as React from 'react';
import { StyleSheet, Text, View, Pressable, } from "react-native";
import { TextInput } from "@react-native-material/core";
import { useState, useEffect } from "react";
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
import HeaderBack from '../../../common/header';
import { Screens } from '../../../common/constant';

export default function GhiChu() {
    const [syll, setSyll] = useState({
        TenGhep: '',
        GioiTinh: 0,
        NgaySinh: null,
        itemSYLL: {},
    })
    const setForm = (value, prop, propObj) => {
        if (value !== undefined) {
            if (propObj) {
                setSyll({
                    ...syll,
                    [propObj]: {
                        ...syll[propObj],
                        [prop]: value,
                    }
                })
                return;
            }
            setSyll({
                ...syll,
                [prop]: value,
            })
        }
    }

    const GhiLai = async () => {
        // let res = await QuyTrinhServices.ThongTinCaNhan.SetSoYeuLyLichSinhVien(syll)
        // if (res) {
        //     ToastMessage(res)
        // }
    }

    return (
        <SafeAreaView>
            <HeaderBack header={Screens.GhiChu} />
            <View style={styles.container}>
                <View style={styles.items}>
                    <TextInput
                        // onChangeText={(e) => setForm(e, 'DienThoai', 'itemSYLL')}
                        // value={syll.itemSYLL?.DienThoai}
                        label={'Lý do'}
                        variant="standard" />
                </View>
                <View style={styles.btn}>
                    <Button icon="check" mode="contained"
                        style={{ width: '75%' }}>
                        Xác nhận
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    btn: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: 'center',
    },
})