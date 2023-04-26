import { Button, Pressable, TouchableOpacity } from "react-native"
import { StyleSheet, Text, View } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { TextButton, width } from "./constant";
import { verticalSafeBottomMargin } from "../utils/render-util";
import { TouchableHighlight } from "react-native";
import { useState } from "react";
import { Picker } from '@react-native-picker/picker';


export function ModalGeneral({ isVisible, onClose, onFinish, children }) {
    return <Modal
        style={styles.container}
        isVisible={isVisible}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        useNativeDriver={true}>
        <View style={styles.content}>
            <View style={styles.header}>
                <TouchableHighlight style={styles.headerBtn} onPress={onClose}>
                    <Text style={styles.headerBtnText}>{TextButton.Cancel}</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.headerBtn} onPress={onFinish}>
                    <Text style={styles.headerBtnText}>{TextButton.Accept}</Text>
                </TouchableHighlight>
            </View>
            {children}
        </View>
    </Modal>
}

export function ModalMonHoc({ isVisible, title, onClose, children }) {
    return <Modal
        style={styles.container}
        isVisible={isVisible}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        useNativeDriver={true}>
        <View style={styles.content}>
            <View style={styles.header}>
                <Text style={styles.headerBtnText}>{title}</Text>
                <TouchableOpacity style={styles.headerBtn} onPress={onClose}>
                    <Text style={styles.headerBtnText}>{TextButton.Close}</Text>
                </TouchableOpacity>
            </View>
            {children}
        </View>
    </Modal>
}

export function MonthPicker({ data, isVisible, onClose, onFinish }) {
    const [date, setDate] = useState(null)

    const children = () => {
        return <View>
            <Picker
                style={styles.picker}
                itemStyle={styles.twoPickerItems}
                selectedValue={date}
                // mode={`dropdown`}
                selectionColor={`#ccc`}
                onValueChange={(itemValue) => setDate(itemValue)}
            >
                {data.map((x, index) => {
                    return <Picker.Item label={x.label} value={x.value} key={index} />
                })}
            </Picker>
        </View>
    }

    return <ModalGeneral isVisible={isVisible} onClose={onClose} children={children()} onFinish={() => onFinish(date)} />
}


const styles = StyleSheet.create({
    container: {
        width: width,
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: 0,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    content: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingBottom: 20 + verticalSafeBottomMargin(),
        alignItems: 'center',
        justifyContent: 'center',
    },
    picker: {
        width: width - 40,
    },
    title: {
        color: '#343434',
        fontSize: 18,
        fontWeight: '700',
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    headerBtn: {
        height: 40,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerBtnText: {
        color: 'blue',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
