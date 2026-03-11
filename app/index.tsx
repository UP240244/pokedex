import PokemonCard from "@/components/PokemonCard";
import { useEffect, useState } from "react";
import { ScrollView, TextInput } from "react-native";

interface Pokemon {
  name: string;
  url: string;
}

export default function Index() {
  const [results, setResults] = useState<Pokemon[]>([]);
  const [text, setText] = useState("");
  const [allResults, setAllResults] = useState<Pokemon[]>([]);
  useEffect(() => {
    console.log("Entre en pantalla");
    getPokemons();
  }, []);

  const getPokemons = async () => {
    try {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
      const response = await fetch(URL, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setResults(data.results);
        setAllResults(data.results);
      } else {
        console.log("Bard Request");
      }
    } catch (error) {
      console.log("Ocurrió un error");
    }
  };

  const filterPokemon = (text: string) => {
    const t = text.trim().toLowerCase();
    const arrayFiltered = allResults.filter((p) =>
      p.name.toLowerCase().includes(t),
    );
    setResults(arrayFiltered);
  };

  const handleChangeText = (text: string) => {
    setText(text);
    filterPokemon(text);
  };

  return (
    <ScrollView>
      <TextInput
        placeholder="Buscar..."
        value={text}
        onChangeText={handleChangeText}
      />
      {results.map((item) => {
        return (
          <PokemonCard
            key={item.name}
            name={item.name}
            url={item.url}
          ></PokemonCard>
        );
      })}
    </ScrollView>
  );
}
