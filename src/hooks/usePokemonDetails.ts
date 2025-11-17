import { useCallback, useEffect, useState } from 'react'
import { fetchPokemonDetail } from '../services/pokeapi'
import type { PokemonDetail } from '../types/pokemon'

export const usePokemonDetails = (nameOrId?: string) => {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadPokemon = useCallback(async () => {
    if (!nameOrId) return

    setIsLoading(true)
    setError(null)

    try {
      const detail = await fetchPokemonDetail(nameOrId)
      setPokemon(detail)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to load this Pokémon right now.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [nameOrId])

  useEffect(() => {
    void loadPokemon()
  }, [loadPokemon])

  return {
    pokemon,
    isLoading,
    error,
    refetch: loadPokemon,
  }
}
