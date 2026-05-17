import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface PokemonCardProps {
  name: string;
  url: string;
}

export default function PokemonCard(props: PokemonCardProps) {
  const id = props.url.split("/").filter(Boolean).at(-1);
  const pokemonImageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  const paddedId = String(id).padStart(3, "0");
  return (
    <Pressable
      onPress={() => router.push(`/pokemon/${props.name}`)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.idBadge}>
        <Text style={styles.idText}>#{paddedId}</Text>
      </View>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: pokemonImageURL }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.name}>
        {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
      </Text>
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#16213e",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#0f3460",
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  cardPressed: {
    opacity: 0.7,
    borderColor: "#e84040",
    elevation: 0,
    shadowOpacity: 0,
  },
  idBadge: {
    backgroundColor: "#0f3460",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 50,
    alignItems: "center",
  },
  idText: {
    color: "#4a4e6e",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  imageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1a1a2e",
    borderWidth: 1,
    borderColor: "#0f3460",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 52,
    height: 52,
  },
  name: {
    flex: 1,
    color: "#e2e2f0",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  arrow: {
    color: "#0f3460",
    fontSize: 24,
    fontWeight: "300",
    lineHeight: 26,
  },
});
