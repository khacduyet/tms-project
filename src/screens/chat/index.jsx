import { SafeAreaView, Text, View } from "react-native";

export default function ChatPage() {
  return (
    <SafeAreaView>
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Trò chuyện</Text>
      </View>
    </SafeAreaView>
  );
}
