import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NewScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🚧</Text>
      <Text style={styles.title}>Próximamente</Text>
      <Text style={styles.subtitle}>Esta pantalla está en construcción</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  emoji: {
    fontSize: 52,
    marginBottom: 8,
  },
  title: {
    color: "#e2e2f0",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 1,
  },
  subtitle: {
    color: "#4a4e6e",
    fontSize: 14,
    fontWeight: "500",
  },
});
