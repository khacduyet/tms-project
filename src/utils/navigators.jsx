import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import AcademicPage from "../screens/accademics";
import ChatPage from "../screens/chat";
import SchedulePage from "../screens/schedules";
import { BlurView } from "expo-blur";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Entypo } from "@expo/vector-icons";
import HomePage from "../screens/home";
import HomeMore from "../screens/more/index";
import { Colors, Screens } from "../common/constant";
import HomeNavBar from "../screens/home/navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={[
      {
        top: -20,
        justifyContent: "center",
        alignItems: "center",
      },
    ]}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#fff",
        ...styles.shadow,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

export function TabNavigatior() {
  const currentUser = useSelector((state) => state.currentUser);
  const nav = useNavigation();

  useEffect(() => {
    if (currentUser && currentUser?.Error === 0) {
      nav.navigate(Screens.Login);
    }
  }, [currentUser]);

  return (
    <SafeAreaView
      style={{ width: "100%", height: Platform.OS === "ios" ? "105%" : "100%" }}
    >
      <Tab.Navigator
        initialRouteName="HomeIndex"
        screenOptions={{
          tabBarShowLabel: false,
          header: ({ navigation }) => {
            return <HomeNavBar currentUser={currentUser} />;
          },
          // tabBarBackground: () => (
          //   <Image
          //     source={require("../resources/bg-blue.png")}
          //     style={{
          //       width: "100%",
          //       height: "100%",
          //       borderTopLeftRadius: 20,
          //       borderTopRightRadius: 20,
          //       // borderRadius: 15
          //     }}
          //     resizeMode="stretch"
          //   />
          // ),
          tabBarActiveTintColor: Colors.Primary,
          tabBarStyle: {
            // position: 'absolute',
            // bottom: 0,
            // left: 20,
            // right: 0,
            // borderTopLeftRadius: 35,
            // borderTopRightRadius: 35,
            height: Platform.OS === "ios" ? 80 : 60,
          },
        }}
      >
        <Tab.Screen
          name={Screens.Schedula}
          component={SchedulePage}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return (
                <>
                  {focused && <View style={styles.tabBarFocus}></View>}
                  <Image
                    source={require("../resources/icons/calendar.png")}
                    style={[
                      styles.tabBarImage,
                      {
                        tintColor: focused ? Colors.Primary : "#748c94",
                      },
                    ]}
                    resizeMode="stretch"
                  />
                  <Text
                    style={[
                      styles.tabBarText,
                      {
                        color: focused ? Colors.Primary : "#748c94",
                      },
                    ]}
                  >
                    {Screens.Schedula}
                  </Text>
                </>
              );
            },
          }}
        />
        <Tab.Screen
          name={Screens.Chat}
          component={ChatPage}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return (
                <>
                  {focused && <View style={styles.tabBarFocus}></View>}
                  <Ionicons
                    name="chatbox-ellipses-outline"
                    size={24}
                    color={focused ? Colors.Primary : "#748c94"}
                  />
                  <Text
                    style={[
                      styles.tabBarText,
                      {
                        color: focused ? Colors.Primary : "#748c94",
                      },
                    ]}
                  >
                    {Screens.Chat}
                  </Text>
                </>
              );
            },
          }}
        />
        <Tab.Screen
          name="HomeIndex"
          component={HomePage}
          options={{
            // tabBarBadge: 3,
            tabBarIcon: ({ focused }) => {
              return (
                <>
                  {focused && (
                    <View
                      style={{
                        width: "100%",
                        borderRadius: 50,
                        height: "100%",
                        // backgroundColor: Colors.Primary,
                        borderWidth: 2,
                        borderColor: "blue",
                        position: "absolute",
                        top: 0,
                      }}
                    ></View>
                  )}
                  <Entypo
                    name="home"
                    size={30}
                    color="black"
                    style={[
                      {
                        color: focused ? Colors.Primary : "#748c94",
                      },
                    ]}
                  />
                </>
              );
            },
            tabBarButton: (props) => {
              return <CustomBarButton {...props} />;
            },
          }}
        />
        <Tab.Screen
          name={Screens.Academic}
          component={AcademicPage}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return (
                <>
                  {focused && <View style={styles.tabBarFocus}></View>}
                  <Image
                    source={require("../resources/icons/book.png")}
                    style={[
                      styles.tabBarImage,
                      {
                        tintColor: focused ? Colors.Primary : "#748c94",
                      },
                    ]}
                    resizeMode="stretch"
                  />
                  <Text
                    style={[
                      styles.tabBarText,
                      {
                        color: focused ? Colors.Primary : "#748c94",
                      },
                    ]}
                  >
                    {Screens.Academic}
                  </Text>
                </>
              );
            },
          }}
        />
        <Tab.Screen
          name={Screens.More}
          component={HomeMore}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return (
                <>
                  {focused && <View style={styles.tabBarFocus}></View>}
                  <Entypo
                    name="dots-three-horizontal"
                    size={30}
                    color="black"
                    style={[
                      styles.tabBarImage,
                      {
                        color: focused ? Colors.Primary : "#748c94",
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.tabBarText,
                      {
                        color: focused ? Colors.Primary : "#748c94",
                      },
                    ]}
                  >
                    {Screens.More}
                  </Text>
                </>
              );
            },
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabBarImageHome: {
    width: 50,
    height: 50,
  },
  tabBarFocus: {
    width: "50%",
    height: 2,
    backgroundColor: Colors.Primary,
    position: "absolute",
    top: 0,
  },
  tabBarImage: {
    width: 30,
    height: 30,
  },
  tabBarText: {
    fontSize: 12,
  },
  shadow: {
    shadowColor: "#636363", // IOS
    shadowOffset: { height: 2, width: 1 }, // IOS
    shadowOpacity: 2, // IOS
    shadowRadius: 2, //IOS
    elevation: 20, // Android
  },
});
