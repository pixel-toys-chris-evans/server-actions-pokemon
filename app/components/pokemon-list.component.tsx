"use client";

import { PokemonLoader } from "./pokemon-loader.component";
import { usePokemonStore } from "./pokemon-list.context";

export function PokemonList() {
  const { pokemon } = usePokemonStore();

  return (
    <>
      <ul className="m-8 p-0 flex flex-col gap-2 w-96">
        {pokemon.map((pokemon) => (
          <li
            key={pokemon.name}
            className="py-2 px-4 flex flex-row gap-4 items-center bg-white border-slate-200 border-[1px] rounded-lg capitalize text-lg shadow-md"
          >
            {pokemon.name}
          </li>
        ))}
      </ul>
      <PokemonLoader />
    </>
  );
}
