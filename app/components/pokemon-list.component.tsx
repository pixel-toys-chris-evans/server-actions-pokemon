"use client";

import { useState, useTransition } from "react";
import { loadPokemon } from "../actions";

export async function PokemonList() {
  const [isLoading, startTransition] = useTransition();

  const [pokemon, setPokemon] = useState<JSX.Element[]>([]);
  const [nextUrl, setUrl] = useState<string | undefined>(undefined);

  function onLoadMore() {
    if (!isLoading) {
      startTransition(async () => {
        const { next, html } = await loadPokemon(nextUrl);

        setPokemon((state) => [...state, html]);
        setUrl(next);
      });
    }
  }

  const buttonText = isLoading ? "Loading..." : "Load More";

  return (
    <>
      <ul>{pokemon}</ul>
      <button
        type="button"
        onClick={() => {
          onLoadMore();
        }}
      >
        {buttonText}{" "}
      </button>
    </>
  );
}
