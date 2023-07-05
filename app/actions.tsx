"use server";

import "server-only";
import { fetchPokemon } from "./server";
import { PokemonReference } from "./pokemon";

export async function loadPokemon(
  nextUrl?: string
): Promise<{ next: string; pokemon: PokemonReference[] }> {
  const { results, next } = await fetchPokemon(nextUrl);

  return {
    next,
    pokemon: results,
  };
}
