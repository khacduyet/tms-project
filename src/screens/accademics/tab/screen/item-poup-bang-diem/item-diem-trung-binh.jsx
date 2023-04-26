import * as React from 'react';
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function ItemDiemTrungBinh({Diem,TC,title}) {
    return (
        <View>
            <TouchableOpacity style={styles.items}>
                <View style={styles.flex}>
                    <Text style={styles.item_title}>Điểm TB {title}:</Text>
                    <Text style={styles.item_title}>{Diem}</Text>
                </View>
                <View style={styles.flex}>
                    <Text style={styles.item_title}>Số TC {title}:</Text>
                    <Text style={styles.item_title}>{TC}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    items: {
        backgroundColor: '#C6E2FF',
        borderColor: '#C6E2FF',
        borderWidth: 1,
        borderRadius:8,
        padding:8,
    },
    flex: {
        flexDirection: 'row',
    },
    item_title: {
        padding:2
    },
});