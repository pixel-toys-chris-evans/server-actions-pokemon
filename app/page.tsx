import { Suspense } from "react";
import { PokemonList } from "./components/pokemon-list.component";
import { PokemonProvider } from "./components/pokemon-list.context";
import { fetchPokemon } from "./server";
import {
  PokemonQuizAnswer,
  PokemonQuizQuestion,
} from "./components/pokemon-quiz.component";

export default async function Home() {
  const pokemon = await fetchPokemon();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Suspense fallback={<PokemonQuizQuestion />}>
        <PokemonQuizAnswer />
      </Suspense>
      <PokemonProvider pokemon={pokemon.results} next={pokemon.next}>
        <PokemonList />
      </PokemonProvider>
    </main>
  );
}
