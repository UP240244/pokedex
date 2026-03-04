import React from "react";
import { Image, Text, View } from "react-native";

interface PokemonCardProps {
  name: string;
  url: string;
}

export default function PokemonCard(props: PokemonCardProps) {
  const id = props.url.split("/").filter(Boolean).at(-1);
  const pokemonImageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return (
    <View>
      <Image
        source={{ uri: pokemonImageURL }}
        style={{ width: 100, height: 100 }}
      ></Image>
      <Text>{props.name}</Text>
    </View>
  );
}
