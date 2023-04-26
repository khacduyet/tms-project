import * as React from 'react';
import { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';


export default function DropDown({ data, object, setObject, header, setKyByNam }) {
    return (
        <View>
            <TouchableOpacity>
                <Dropdown
                    data={data}
                    search
                    labelField="label"
                    valueField="value"
                    placeholder="Chọn"
                    style={styles.dropdown}
                    searchPlaceholder="Search..."
                    // disable={object.isDisable}
                    value={object[header]}
                    onChange={item => {
                        if (header === `Nam` && item.value === '0') {
                            setKyByNam(item.value)
                            return;
                        }
                        setObject({
                            ...object,
                            [header]: item.value
                        });
                    }}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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
});