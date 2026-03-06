import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function PokemonDetailsScreen() {
  const params = useLocalSearchParams();

  return (
    <View>
      <Text>{params.name}</Text>
    </View>
  );
}
