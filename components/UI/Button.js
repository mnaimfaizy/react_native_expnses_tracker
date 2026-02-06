import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Button({ children, onPress, mode, style }) {
  const isFlat = mode === "flat";

  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: GlobalStyles.colors.primary100 }}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
      >
        <View style={[styles.button, isFlat && styles.flat]}>
          <Text style={[styles.buttonText, isFlat && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 8,
    overflow: "hidden",
  },
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.85,
  },
});
