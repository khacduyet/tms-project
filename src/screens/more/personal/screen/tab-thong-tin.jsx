import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Colors, height,Button,TextButton } from "../../../../common/constant";

// import tab
import ThongTin from '../screen/infor'
import LienHe from '../screen/lien-he'
import Family from '../screen/family'

const TextButtonTab = {
    ThongTin: "Lý lịch",
    LienHe: "Liên hệ",
    Family: "Gia đình",
};

export default function TabThongTin() {
    const [tabIndex, setTabIndex] = useState(0);
    return <SafeAreaView>
        <View style={[styles.container]}>
            <View style={[styles.tab]}>
                <TouchableOpacity style={[styles.buttonTab, tabIndex === 0 && styles.buttonTabActive]}
                    onPress={() => {
                        setTabIndex(0);
                    }}>
                    <Text style={[
                        styles.buttonTabText,
                        tabIndex === 0 && styles.buttonTabTextActive,
                    ]}>
                        {TextButtonTab.ThongTin}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonTab, tabIndex === 1 && styles.buttonTabActive]}
                    onPress={() => {
                        setTabIndex(1);
                    }}>
                    <Text style={[
                        styles.buttonTabText,
                        tabIndex === 1 && styles.buttonTabTextActive,
                    ]}>
                        {TextButtonTab.LienHe}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonTab, tabIndex === 2 && styles.buttonTabActive]}
                    onPress={() => {
                        setTabIndex(2);
                    }}>
                    <Text style={[
                        styles.buttonTabText,
                        tabIndex === 2 && styles.buttonTabTextActive,
                    ]}>
                        {TextButtonTab.Family}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={[bodys.container]}>
                {tabIndex === 0 && <ThongTin />}
                {tabIndex === 1 && <LienHe />}
                {tabIndex === 2 && <Family />}
            </View>
        </View>
    </SafeAreaView>
}

const styles = {
    container: {
        height: "100%",
        width: "100%",
    },
    tab: {
        flexDirection: "row",
    },
    buttonTab: {
        flex: 1,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        marginTop: 0,
    },
    buttonTabActive: {
        borderBottomWidth: 2,
        borderColor: "#2f4bfb",
        borderRadius: 5,
    },
    buttonTabTextActive: {
        color: "#2f4bfb",
    },
    buttonTabText: {},
};
const bodys = {
    container: {
      width: "100%",
      height: "100%",
    },
    weekWrap: {
      flexDirection: "row",
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 15,
      marginTop: 0,
    },
    wrapTop: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    wrapContent: {
      height: "100%",
    },
    dateButton: {
      borderWidth: 1,
      borderRadius: 5,
      flex: 1,
      margin: 5,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
    dateText: {
      fontSize: 16,
    },
    dropdown: {
      flex: 3,
      margin: 5,
    },
    dropdownBox: {
      paddingHorizontal: 15,
    },
    dropdownText: {
      fontSize: 13,
    },
  
    itemFlat: {
      width: "100%",
      // backgroundColor: "#fff",
      paddingHorizontal: 15,
      marginBottom: 15,
      flexDirection: "row",
    },
    itemFlatLeft: {
      flex: 1,
      borderRightWidth: 2,
      borderColor: "blue",
    },
    itemFlatRight: {
      marginLeft: 10,
      flex: 3,
    },
    itemFlatLeftCircle: {
      height: 80,
      width: 80,
      borderRadius: 80 / 2,
      borderWidth: 3,
      borderColor: Colors.Primary,
      alignItems: "center",
      justifyContent: "center",
    },
  };