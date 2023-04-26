import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-root-toast";

export function Button({ icon, text, onPress, style, disabled }) {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={[
          styles.button,
          style?.button,
          {
            opacity: disabled ? 0.7 : 1,
          },
        ]}
        onPress={!disabled && onPress}
        disabled={disabled}
      >
        <View style={[styles.wrapperMiddle]}>
          {icon}
          <Text
            style={[
              styles.wrapperText,
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

export const ToastMessage = (message, duration, position) => {
  Toast.show(message, {
    duration: duration ? duration : Toast.durations.LONG,
    position: position ? position : Toast.positions.TOP,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
};

const styles = {
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
    borderRadius: 10,
  },
  wrapperMiddle: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrapperText: {
    fontSize: 18,
    color: "#fff",
  },
};
