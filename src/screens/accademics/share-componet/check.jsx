import * as React from 'react';
import { useEffect, useState } from "react";
import { StyleSheet, View,Text, TouchableOpacity } from "react-native";
import { Checkbox } from "react-native-paper";

export default function CheckBox({data,checked,setChecked}) {
   
    return (
        <View style={styles.flex}>
            <Checkbox.Android
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
            />
             <Text>{data}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    flex: {
        flexDirection: "row",
        alignItems: "center",
      },
});