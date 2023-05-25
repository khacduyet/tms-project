import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View, StatusBar, Image } from 'react-native';
import { Screens } from './constant';

export default function ChatBotNav({ }) {
    const nav = useNavigation()
    return <>
        <TouchableOpacity style={[styles.container]} onPress={() => nav.navigate(Screens.ChatBot)}>
            <Image source={require('../resources/chatbot1.png')} style={[styles.image]} />
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
        width: Size,
        height: Size,
        borderRadius: Size / 2,
        backgroundColor: 'red'
    }
}