import * as React from 'react';
import { useEffect, useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Feather } from '@expo/vector-icons';

export default function SearchBar({input,setInput}) {
    return (
        <View style={styles.searchbar}>
            <Feather name="search" size={23} style={styles.icon} color="black" />
            <TextInput style={styles.input} placeholder='Search'
            value={input}
            onChangeText={(text) => setInput(text)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchbar: {
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        height: 40,
        paddingLeft: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    input: {
        fontSize: 15
    },
    icon: {
        marginLeft: 1,
        marginRight: 4
    }
});