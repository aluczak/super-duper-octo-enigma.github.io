import { createContext } from 'react'

export type PokemonContextValue = {
  searchQuery: string
  setSearchQuery: (value: string) => void
  favorites: string[]
  toggleFavorite: (name: string) => void
  isFavorite: (name: string) => boolean
}

export const PokemonContext = createContext<PokemonContextValue | undefined>(undefined)
