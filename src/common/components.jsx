import { Text, TouchableOpacity, View, TextInput } from "react-native";
import Toast from "react-native-root-toast";
import { Octicons } from "@expo/vector-icons";

export function Button({ icon, text, onPress, style, disabled }) {
  return (
    <View style={[s.container]}>
      <TouchableOpacity
        style={[
          s.button,
          style?.button,
          {
            opacity: disabled ? 0.7 : 1,
          },
        ]}
        onPress={!disabled && onPress}
        disabled={disabled}
      >
        <View style={[s.wrapperMiddle]}>
          {icon}
          <Text
            style={[
              s.wrapperText,
              style?.buttonText,
              {
                alignItems: icon ? "flex-start" : "center",
                justifyContent: icon ? "flex-start" : "center",
              },
            ]}
          >
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const BORDER = `#b4b4b4`;

export const FindInput = ({ props }) => {
  return (
    <View style={[s.wrapInput]}>
      <Octicons name="search" size={24} color={BORDER} />
      <TextInput
        value={props.value}
        style={[s.wrapTextInput]}
        placeholder="Tìm kiếm"
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

export const ToastMessage = (message, duration, position) => {
  Toast.show(message, {
    duration: duration ? duration : Toast.durations.LONG,
    position: position ? position : Toast.positions.TOP,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
};

const s = {
  container: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "90%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2f7bff",
    borderRadius: 50,
  },
  wrapperMiddle: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrapperText: {
    fontSize: 18,
    color: "#fff",
  },
  wrapInput: {
    borderWidth: 1,
    borderColor: BORDER,
    flexDirection: "row",
    padding: 4,
    borderRadius: 5,
  },
  wrapTextInput: {
    paddingLeft: 5,
    flex: 1,
  },
};
