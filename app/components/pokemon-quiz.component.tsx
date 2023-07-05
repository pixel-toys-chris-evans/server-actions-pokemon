import Image from "next/image";
import { Pokemon } from "../pokemon";

export function PokemonQuizQuestion() {
  return (
    <header>
      <h2>Who&apos;s that Pokemon?</h2>
      <Image
        src="/clefairy-silhoutte.png"
        alt="An unknown pokemon!"
        width={384}
        height={384}
        style={{ imageRendering: "pixelated" }}
      />
    </header>
  );
}

function delayPromise<T>(promise: Promise<T>, delay: number): Promise<T> {
  return new Promise((resolve, reject) => {
    let status = "pending";
    let result: any;
    promise
      .then((_result) => {
        if (timeout) {
          result = _result;
          status = "success";
          return;
        }

        resolve(_result);
      })
      .catch((_result) => {
        if (timeout) {
          result = _result;
          status = "error";

          return;
        }

        reject(_result);
      });

    let timeout: NodeJS.Timeout | null = setTimeout(() => {
      if (status === "success") {
        resolve(result);
      } else if (status === "error") {
        reject(result);
      }

      timeout = null;
    }, delay);
  });
}

export async function PokemonQuizAnswer() {
  "use client";
  const response = await delayPromise(
    fetch("https://pokeapi.co/api/v2/pokemon/35"),
    2500
  );
  let pokemon: Pokemon | undefined;
  if (response.ok) {
    try {
      pokemon = (await response.json()) as Pokemon;
    } catch {
      throw new Error("HTTP Exception: Couldn't find that pokemon!");
    }
  } else {
    throw new Error("HTTP Exception: Couldn't find that pokemon!");
  }

  return (
    <header>
      <h2>It&apos;s {pokemon.name}!</h2>
      <Image
        src={pokemon.sprites.front_default}
        alt={`It's ${pokemon.name}!`}
        width={384}
        height={384}
        style={{ imageRendering: "pixelated" }}
      />
    </header>
  );
}
