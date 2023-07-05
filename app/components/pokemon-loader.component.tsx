"use client";

import { useTransition } from "react";
import { loadPokemon } from "../actions";
import { usePokemonStore } from "./pokemon-list.context";

export function PokemonLoader() {
  const { setPokemon, setUrl, next: url } = usePokemonStore();

  const [isLoading, startTransition] = useTransition();

  function onLoadMore() {
    if (!isLoading) {
      startTransition(() => {
        // N.B: Transitions cannot be asynchronous, so we wrap our task to execute in an anonymous async function and invoke its
        const task = async () => {
          const { next, pokemon } = await loadPokemon(url);

          setPokemon!((state) => [...state, ...pokemon]);
          setUrl!(next);
        };

        task();
      });
    }
  }

  const buttonText = isLoading ? "Loading..." : "Load More";
  return (
    // TODO: Conditionaly display 'Spinner' while 'isLoading'.
    <button
      type="button"
      className="py-4 px-6 bg-white border-slate-200 border-[1px] rounded-lg shadow-md uppercase font-bold"
      onClick={() => {
        onLoadMore();
      }}
    >
      {buttonText}{" "}
    </button>
  );
}
