import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View, StatusBar } from 'react-native';

export default function HeaderBack({ header, RightItem }) {
    const nav = useNavigation()
    return <>
        <View style={[styles.container]}>
            <View style={[styles.header]}>
                <TouchableOpacity style={[styles.headerArrow]} onPress={nav.goBack}>
                    <View>
                        <MaterialIcons name="arrow-back-ios" size={35} color="black" />
                    </View>
                </TouchableOpacity>
                <Text style={[styles.headerText]}>{`${header}`.toUpperCase()}</Text>
                {RightItem && <RightItem />}
            </View>
        </View>
    </>
}

const styles = {
    container: {
        width: "100%",
        height: 50,
    },
    header: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    headerArrow: {
        position: 'absolute',
        left: 10,
        top: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 600,
        textAlign: 'center'
    }
}