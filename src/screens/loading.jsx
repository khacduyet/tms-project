import { Image, Text, View } from "react-native";


export default function Loading() {

    return <View style={styles.container}>
        <View style={{
            width: "100%", height: "100%", position: "relative", justifyContent: "center",
            alignItems: "center"
        }}>
            <View style={{ position: "absolute", top: 0, left: 0 }}></View>
            <Image source={require("../../src/resources/loadingtrans.gif")} style={styles.image} resizeMode='stretch' />
            <Text style={styles.text}>Đang tải...</Text>
        </View>

    </View>
}

const styles = {
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        zIndex: 1
    },
    image: {
        width: 150,
        height: 75
    },
    text: {

    }
}