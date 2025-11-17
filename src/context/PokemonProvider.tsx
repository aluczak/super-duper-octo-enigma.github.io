import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { PokemonContext, type PokemonContextValue } from './PokemonContext'

const FAVORITES_KEY = 'pokemon-favorites'

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === 'undefined') {
      return []
    }

    try {
      const stored = window.localStorage.getItem(FAVORITES_KEY)
      return stored ? (JSON.parse(stored) as string[]) : []
    } catch (error) {
      console.warn('Unable to read favorites from localStorage', error)
      return []
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    } catch (error) {
      console.warn('Unable to persist favorites', error)
    }
  }, [favorites])

  const toggleFavorite = useCallback((name: string) => {
    setFavorites((previous) => {
      if (previous.includes(name)) {
        return previous.filter((item) => item !== name)
      }

      return [...previous, name]
    })
  }, [])

  const isFavorite = useCallback((name: string) => favorites.includes(name), [favorites])

  const value = useMemo<PokemonContextValue>(
    () => ({ searchQuery, setSearchQuery, favorites, toggleFavorite, isFavorite }),
    [favorites, isFavorite, searchQuery, toggleFavorite],
  )

  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
}
