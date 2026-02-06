import { StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";

function ErrorOverlay({ message }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={[styles.text, styles.title]}>An error occurred!</Text>
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  card: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: GlobalStyles.colors.primary50,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary200,
  },
  text: {
    color: GlobalStyles.colors.primary800,
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
