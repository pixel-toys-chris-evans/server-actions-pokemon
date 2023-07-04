import "server-only";
import { PokemonListing, PokemonReference } from "./pokemon";

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

export async function fetchPokemon(nextUrl?: string): Promise<PokemonListing> {
  const response = await fetch(
    nextUrl ??
      `https://pokeapi.co/api/v2/pokemon/?limit=${DEFAULT_LIMIT}&offset=${DEFAULT_OFFSET}`
  );

  if (response.ok) {
    try {
      const pokemon = (await response.json()) as PokemonListing;

      return pokemon;
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw e;
      }
    }
  }

  throw new Error("HTTP Exception: Unable to fetch Pokemon.");
}
