"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { PokemonReference } from "../pokemon";

export type PokemonStore = {
  next?: string;
  setUrl?: Dispatch<SetStateAction<string | undefined>>;
  pokemon: PokemonReference[];
  setPokemon?: Dispatch<SetStateAction<PokemonReference[]>>;
};

const INITIAL_VALUE: PokemonStore = {
  next: undefined,
  pokemon: [],
};

const PokemonContext = createContext(INITIAL_VALUE);

type PokemonProviderProps = {
  initial: PokemonReference[];
  children?: ReactNode;
};

export function PokemonProvider({ initial, children }: PokemonProviderProps) {
  const [pokemon, setPokemon] = useState<PokemonReference[]>(initial);
  const [next, setUrl] = useState<string | undefined>(undefined);

  return (
    <PokemonContext.Provider value={{ pokemon, setPokemon, next, setUrl }}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemonStore() {
  const store = useContext(PokemonContext);
  return store;
}
