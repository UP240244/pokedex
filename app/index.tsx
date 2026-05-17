import PokemonCard from "@/components/PokemonCard";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface Pokemon {
  name: string;
  url: string;
}

export default function Index() {
  const [results, setResults] = useState<Pokemon[]>([]);
  const [text, setText] = useState("");
  const [allResults, setAllResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    try {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
      const response = await fetch(URL, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setResults(data.results);
        setAllResults(data.results);
      } else {
        console.log("Bad Request");
      }
    } catch (error) {
      console.log("Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  const filterPokemon = (value: string) => {
    const t = value.trim().toLowerCase();
    const filtered = allResults.filter((p) => p.name.toLowerCase().includes(t));
    setResults(filtered);
  };

  const handleChangeText = (value: string) => {
    setText(value);
    filterPokemon(value);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor="#16213e" />
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Pokedex</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          {loading
            ? "Cargando datos..."
            : `${results.length.toLocaleString()} de ${allResults.length.toLocaleString()} Pokémon`}
        </Text>
      </View>
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar Pokémon..."
            placeholderTextColor="#4a4e6e"
            value={text}
            onChangeText={handleChangeText}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {text.length > 0 && (
            <Text style={styles.clearBtn} onPress={() => handleChangeText("")}>
              ✕
            </Text>
          )}
        </View>
      </View>
      <View style={styles.divider} />
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#e84040" />
          <Text style={styles.loadingText}>Cargando Pokémon...</Text>
        </View>
      ) : results.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyEmoji}>😢</Text>
          <Text style={styles.emptyTitle}>Sin resultados</Text>
          <Text style={styles.emptySubtitle}>
            No se encontró ningún Pokémon llamado "{text}"
          </Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {results.map((item) => (
            <PokemonCard key={item.name} name={item.name} url={item.url} />
          ))}
          <View style={styles.listFooter}>
            <View style={styles.footerDot} />
            <Text style={styles.footerText}>
              {results.length.toLocaleString()} resultado
              {results.length !== 1 ? "s" : ""}
            </Text>
            <View style={styles.footerDot} />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
  header: {
    paddingTop: 52,
    paddingBottom: 18,
    paddingHorizontal: 24,
    backgroundColor: "#16213e",
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerEmoji: {
    fontSize: 26,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#e84040",
    letterSpacing: 4,
    textTransform: "uppercase",
  },
  headerSubtitle: {
    marginTop: 6,
    fontSize: 12,
    color: "#4a4e6e",
    letterSpacing: 1.2,
    fontWeight: "600",
  },
  searchWrapper: {
    backgroundColor: "#16213e",
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#0f3460",
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  searchIcon: {
    fontSize: 15,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#e2e2f0",
    fontWeight: "500",
    padding: 0,
  },
  clearBtn: {
    color: "#4a4e6e",
    fontSize: 14,
    paddingLeft: 10,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#0f3460",
    marginHorizontal: 20,
    marginBottom: 4,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingBottom: 60,
  },
  loadingText: {
    color: "#4a4e6e",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  emptyEmoji: {
    fontSize: 52,
    marginBottom: 4,
  },
  emptyTitle: {
    color: "#e2e2f0",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  emptySubtitle: {
    color: "#4a4e6e",
    fontSize: 13,
    textAlign: "center",
    paddingHorizontal: 40,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 36,
  },
  listFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingTop: 20,
  },
  footerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#0f3460",
  },
  footerText: {
    color: "#4a4e6e",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
