"use server";

import "server-only";
import { fetchPokemon } from "./server";

export async function loadPokemon(
  nextUrl?: string
): Promise<{ next: string; html: JSX.Element }> {
  const { results, next } = await fetchPokemon(nextUrl);

  return {
    next,
    html: (
      <>
        {results.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </>
    ),
  };
}
