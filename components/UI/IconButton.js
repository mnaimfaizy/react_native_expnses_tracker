import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: GlobalStyles.colors.primary100 }}
      style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 8,
    marginHorizontal: 8,
    marginVertical: 2,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.85,
  },
});
