import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";

interface PokemonCardProps {
  name: string;
  url: string;
}

export default function PokemonCard(props: PokemonCardProps) {
  const id = props.url.split("/").filter(Boolean).at(-1);
  const pokemonImageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return (
    <Pressable
      onPress={() => router.push(`/pokemon/${props.name}`)}
      style={({ pressed }) => [
        styles.pressableStyle,
        pressed && {
          opacity: 0.5,
        },
      ]}
    >
      <Image
        source={{ uri: pokemonImageURL }}
        style={{ width: 100, height: 100 }}
      ></Image>
      <Text>{props.name}</Text>
      <Text>{props.url}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableStyle: {
    borderWidth: 1,
    alignItems: "center",
    backgroundColor: "#84a0eb",
  },
});
