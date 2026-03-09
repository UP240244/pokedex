import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";

export default function PokemonDetailsScreen() {
  const [pokemonData, setPokemonData] = useState([]);
  const params = useLocalSearchParams();

  useEffect(() => {
    getPokemonData();
  }, []);

  const getPokemonData = async () => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${params.name}`;
    const response = await fetch(URL, {
      method: "GET",
    });
    const data = await response.json();
    setPokemonData(data);
  };

  return (
    <ScrollView>
      <Text>{params.name}</Text>
      <Text>{JSON.stringify(pokemonData)}</Text>
    </ScrollView>
  );
}
