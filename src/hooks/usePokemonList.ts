import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchPokemonPage } from '../services/pokeapi'
import type { PokemonListItem } from '../types/pokemon'

const PAGE_SIZE = 24

export const usePokemonList = () => {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([])
  const [nextOffset, setNextOffset] = useState<number | null>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPage = useCallback(async (offset: number) => {
    setIsLoading(true)
    setError(null)

    try {
      const { pokemons: pageItems, nextOffset: newOffset } = await fetchPokemonPage(PAGE_SIZE, offset)

      setPokemons((previous) => (offset === 0 ? pageItems : [...previous, ...pageItems]))
      setNextOffset(newOffset)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something unexpected happened.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchPage(0)
  }, [fetchPage])

  const loadMore = useCallback(() => {
    if (isLoading || nextOffset === null) {
      return
    }

    void fetchPage(nextOffset)
  }, [fetchPage, isLoading, nextOffset])

  const refresh = useCallback(() => {
    if (isLoading) return
    void fetchPage(0)
  }, [fetchPage, isLoading])

  const status = useMemo(
    () => ({
      isInitialLoading: pokemons.length === 0 && isLoading,
      isLoadingMore: pokemons.length > 0 && isLoading,
      hasMore: nextOffset !== null,
    }),
    [isLoading, nextOffset, pokemons.length],
  )

  return {
    pokemons,
    error,
    ...status,
    loadMore,
    refresh,
  }
}
