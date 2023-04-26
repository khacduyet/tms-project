import * as React from 'react';
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper";

const dataRadio = [
    {
        label: `Lớp`,
        value: 0
    },
    {
        label: `Khoa`,
        value: 1
    },
]

export default function Radio({ _objCtx }) {
    return (

        <RadioButton.Group
            onValueChange={(newValue) => _objCtx.setValue(newValue)}
            value={_objCtx.value}
            buttonColor="red"
            color="red"
        >
            <View style={styles.flex}>
            {dataRadio.map((x, index) => {
                return <View style={styles.flex} key={index}>
                    <RadioButton.Android value={x.value} />
                    <Text>{x.label}</Text>
                </View>
            })}
        </View>
        </RadioButton.Group >
      
    );
}

const styles = StyleSheet.create({
    flex: {
        flexDirection: "row",
        alignItems: "center",
    },
});