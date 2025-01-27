import { Text, View, StyleSheet } from "react-native";

export default function Achievements() {
  return (
    <View style = {styles.container}>
      <Text style = {styles.text}>Achievements Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e"
  },
  text: {
    color: "white"
  },
})