import { Image, SafeAreaView, Text, View, TouchableOpacity, Switch, ImageBackground } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutSubmit } from "../../redux/actions/loginAction";
import { BASE_URL, Screens } from "../../common/constant";
import HeaderBack from "../../common/header";
import { StatusBar } from "expo-status-bar";

export default function Setting({ navigation }) {

    const [fingerPrint, setFingerPrint] = useState(false);
    const dispatch = useDispatch();

    const handleFingerPrint = async () => {
        let fp = !fingerPrint
        setFingerPrint(fp);
        await AsyncStorage.setItem(
            'fingerPrint',
            `${fp}`
        );
    }

    const handleChangePassword = () => {
        navigation.navigate(Screens.ChangePassword)
    }

    const getFinger = async () => {
        let func = await AsyncStorage.getItem('fingerPrint')
        if (func) {
            let bool = func === "true"
            setFingerPrint(bool)
        }
    }

    useEffect(() => {
        getFinger()
    }, [])

    return <SafeAreaView style={[styles.container]}>
        <HeaderBack header={Screens.Setting} />

        <View style={[bodys.wrapper]}>
            <TouchableOpacity style={[bodys.buttonComponent]}>
                <View style={[bodys.wrapperLeft]}>
                    <MaterialIcons name="fingerprint" size={35} color="#1e20e7" />
                </View>
                <View style={[bodys.wrapperMiddle]}>
                    <Text style={[bodys.wrapperText]}>Đăng nhập vân tay</Text>
                </View>
                <View style={[bodys.wrapperRight]}>
                    <Switch
                        style={[bodys.switch]}
                        onValueChange={handleFingerPrint}
                        value={fingerPrint}
                    />
                </View>
            </TouchableOpacity>
        </View>

        <View style={[bodys.wrapper]}>
            <TouchableOpacity style={[bodys.buttonComponent]} onPress={() => {
                handleChangePassword()
            }}>
                <View style={[bodys.wrapperLeft]}>
                    <AntDesign name="lock" size={35} color="#1e20e7" />
                </View>
                <View style={[bodys.wrapperMiddle]}>
                    <Text style={[bodys.wrapperText]}>Đổi mật khẩu</Text>
                </View>
                <View style={[bodys.wrapperRight]}>
                    <MaterialIcons name="keyboard-arrow-right" size={35} color="black" />
                </View>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
}


const styles = {
    container: {
        flex: 1,
        // width: "100%",
        // height: "100%",
    },

}


const bodys = {
    container: {
        width: "100%",
        height: "100%",
        flexDirection: 'column',
        paddingTop: 30,
        backgroundColor: "#f3f3f3"
    },
    wrapper: {
        width: "100%",
        height: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonComponent: {
        width: "90%",
        height: "100%",
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10
    },
    buttonComponentLogout: {
        backgroundColor: '#fcdede'
    },
    wrapperLeft: {
        flex: 1,
        alignItems: "flex-end",
    },
    wrapperMiddle: {
        flex: 4
    },
    wrapperMiddleLogout: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapperText: {
        fontSize: 16,
        fontWeight: 500,
        paddingLeft: 20
    },
    wrapperTextLogout: {
        color: 'red',
        paddingLeft: 5
    },
    wrapperRight: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        paddingRight: 10
    },
    buttonWrap: {
        width: "100%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    button: {
        width: "90%",
        borderRadius: 10,
        height: "100%",
        backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    buttonText: {
        fontSize: 18,
    }
}