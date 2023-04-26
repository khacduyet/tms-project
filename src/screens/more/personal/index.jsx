import * as React from "react";
import { KeyboardAvoidingView } from "react-native";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import HeaderBack from "../../../common/header";
import { Screens } from "../../../common/constant";
import TabThongTin from "../personal/screen/tab-thong-tin";

export default function Canhan({ navigation }) {
    return (
        <SafeAreaView style={[styles.container]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <HeaderBack header={Screens.Personal} />
                <View>
                    <TabThongTin />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
}