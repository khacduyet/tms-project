import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View, StatusBar, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Screens } from './constant';

export default function ChatBotNav({ }) {
    const nav = useNavigation()
    return <>
        <TouchableOpacity style={[styles.container]} onPress={() => nav.navigate(Screens.ChatBot)}>
            <AntDesign name="questioncircle" size={60} color="#6e48aa" style={[styles.image]} />
            {/* <Image source={require('../resources/chatbot1.png')} style={[styles.image]} /> */}
        </TouchableOpacity>
    </>
}

const Size = 60
const styles = {
    container: {
        width: Size,
        height: Size,
        position: 'absolute',
        right: 20,
        bottom: 20,
        borderRadius: Size / 2,
    },
    image: {
        // width: "100%",
        // height: "100%",
        borderRadius: Size / 2,
        backgroundColor: '#fff'
    }
}