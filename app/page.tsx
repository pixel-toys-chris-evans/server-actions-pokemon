import Image from "next/image";
import { fetchPokemon } from "./server";
import { Suspense } from "react";
import { PokemonList } from "./components/pokemon-list.component";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<h2>LOADING!</h2>}>
        <PokemonList />
      </Suspense>
    </main>
  );
}
