import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}
interface PokemonType {
  type: { name: string };
}
interface PokemonAbility {
  ability: { name: string };
  is_hidden: boolean;
}
interface PokemonData {
  id: number;
  height: number;
  weight: number;
  base_experience: number;
  stats: PokemonStat[];
  types: PokemonType[];
  abilities: PokemonAbility[];
  sprites: {
    front_default: string;
    front_shiny: string;
  };
}
const TYPE_COLORS: Record<string, string> = {
  fire: "#e84040",
  water: "#4a90d9",
  grass: "#4caf7d",
  electric: "#f5c542",
  psychic: "#c14fa3",
  ice: "#74cfc3",
  dragon: "#6b4de6",
  dark: "#4a4a60",
  fairy: "#e08cba",
  normal: "#9e9e9e",
  fighting: "#d84315",
  flying: "#7986cb",
  poison: "#ab47bc",
  ground: "#c8a96e",
  rock: "#9e8f6e",
  bug: "#8bc34a",
  ghost: "#5c6bc0",
  steel: "#78909c",
};
const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SP.ATK",
  "special-defense": "SP.DEF",
  speed: "SPD",
};

export default function PokemonDetailsScreen() {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();

  useEffect(() => {
    getPokemonData();
  }, []);

  const getPokemonData = async () => {
    try {
      const URL = `https://pokeapi.co/api/v2/pokemon/${params.name}`;
      const response = await fetch(URL, { method: "GET" });
      const data = await response.json();
      setPokemonData(data);
    } catch (error) {
      console.log("Error al cargar el Pokémon");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#e84040" />
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </View>
    );
  }
  if (!pokemonData) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorEmoji}>⚠️</Text>
        <Text style={styles.errorText}>No se pudo cargar el Pokémon</Text>
      </View>
    );
  }

  const paddedId = String(pokemonData.id).padStart(3, "0");
  const primaryType = pokemonData.types[0]?.type.name ?? "normal";
  const accentColor = TYPE_COLORS[primaryType] ?? "#e84040";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.hero, { borderBottomColor: accentColor }]}>
        <View style={styles.heroMeta}>
          <Text style={[styles.heroId, { color: accentColor }]}>
            #{paddedId}
          </Text>
          <Text style={styles.heroName}>
            {String(params.name).charAt(0).toUpperCase() +
              String(params.name).slice(1)}
          </Text>
          <View style={styles.typesRow}>
            {pokemonData.types.map((t) => (
              <View
                key={t.type.name}
                style={[
                  styles.typeBadge,
                  { backgroundColor: TYPE_COLORS[t.type.name] ?? "#555" },
                ]}
              >
                <Text style={styles.typeText}>{t.type.name.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        </View>
        <Image
          source={{ uri: pokemonData.sprites.front_default }}
          style={styles.sprite}
          resizeMode="contain"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Info</Text>
        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Text style={styles.infoValue}>
              {(pokemonData.height / 10).toFixed(1)} m
            </Text>
            <Text style={styles.infoLabel}>Altura</Text>
          </View>
          <View style={styles.infoSeparator} />
          <View style={styles.infoCard}>
            <Text style={styles.infoValue}>
              {(pokemonData.weight / 10).toFixed(1)} kg
            </Text>
            <Text style={styles.infoLabel}>Peso</Text>
          </View>
          <View style={styles.infoSeparator} />
          <View style={styles.infoCard}>
            <Text style={styles.infoValue}>{pokemonData.base_experience}</Text>
            <Text style={styles.infoLabel}>Exp. base</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estadísticas</Text>
        {pokemonData.stats.map((s) => {
          const ratio = Math.min(s.base_stat / 255, 1);
          return (
            <View key={s.stat.name} style={styles.statRow}>
              <Text style={styles.statLabel}>
                {STAT_LABELS[s.stat.name] ?? s.stat.name.toUpperCase()}
              </Text>
              <Text style={[styles.statValue, { color: accentColor }]}>
                {s.base_stat}
              </Text>
              <View style={styles.statBarBg}>
                <View
                  style={[
                    styles.statBarFill,
                    {
                      width: `${ratio * 100}%` as any,
                      backgroundColor: accentColor,
                    },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Habilidades</Text>
        <View style={styles.abilitiesRow}>
          {pokemonData.abilities.map((a) => (
            <View
              key={a.ability.name}
              style={[
                styles.abilityBadge,
                a.is_hidden && styles.abilityBadgeHidden,
              ]}
            >
              <Text style={styles.abilityText}>
                {a.ability.name.replace("-", " ")}
              </Text>
              {a.is_hidden && <Text style={styles.hiddenTag}> · oculta</Text>}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
  content: {
    paddingBottom: 48,
  },
  centered: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    color: "#4a4e6e",
    fontSize: 14,
    fontWeight: "600",
  },
  errorEmoji: { fontSize: 48 },
  errorText: {
    color: "#4a4e6e",
    fontSize: 15,
    fontWeight: "600",
  },
  hero: {
    backgroundColor: "#16213e",
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
  },
  heroMeta: {
    flex: 1,
    gap: 6,
  },
  heroId: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  heroName: {
    fontSize: 26,
    fontWeight: "900",
    color: "#e2e2f0",
    letterSpacing: 0.5,
    textTransform: "capitalize",
  },
  typesRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  typeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  sprite: {
    width: 120,
    height: 120,
  },
  section: {
    marginTop: 24,
    marginHorizontal: 20,
    backgroundColor: "#16213e",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#0f3460",
    padding: 18,
  },
  sectionTitle: {
    color: "#4a4e6e",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  infoCard: {
    alignItems: "center",
    flex: 1,
  },
  infoValue: {
    color: "#e2e2f0",
    fontSize: 18,
    fontWeight: "800",
  },
  infoLabel: {
    color: "#4a4e6e",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginTop: 2,
  },
  infoSeparator: {
    width: 1,
    height: 36,
    backgroundColor: "#0f3460",
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  statLabel: {
    color: "#4a4e6e",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
    width: 58,
  },
  statValue: {
    fontSize: 13,
    fontWeight: "800",
    width: 32,
    textAlign: "right",
  },
  statBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: "#0f3460",
    borderRadius: 3,
    overflow: "hidden",
  },
  statBarFill: {
    height: "100%",
    borderRadius: 3,
  },
  abilitiesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  abilityBadge: {
    backgroundColor: "#0f3460",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  abilityBadgeHidden: {
    borderWidth: 1,
    borderColor: "#e84040",
    borderStyle: "dashed",
  },
  abilityText: {
    color: "#e2e2f0",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  hiddenTag: {
    color: "#e84040",
    fontSize: 11,
    fontWeight: "600",
  },
});
