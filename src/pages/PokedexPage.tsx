import { useMemo } from 'react'
import PokemonGrid from '../components/PokemonGrid'
import PokemonSearchBar from '../components/PokemonSearchBar'
import StatusMessage from '../components/StatusMessage'
import { usePokemonContext } from '../hooks/usePokemonContext'
import { usePokemonList } from '../hooks/usePokemonList'
import { formatPokemonName } from '../utils/format'

const PokedexPage = () => {
  const { pokemons, error, isInitialLoading, isLoadingMore, hasMore, loadMore, refresh } = usePokemonList()
  const { searchQuery, favorites } = usePokemonContext()

  const filteredPokemons = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase().trim()
    if (!normalizedQuery) return pokemons

    return pokemons.filter((pokemon) => pokemon.name.includes(normalizedQuery))
  }, [pokemons, searchQuery])

  const favoriteMatches = filteredPokemons.filter((pokemon) => favorites.includes(pokemon.name))
  const remainingPokemons = favoriteMatches.length
    ? filteredPokemons.filter((pokemon) => !favorites.includes(pokemon.name))
    : filteredPokemons

  const showEmpty = !isInitialLoading && filteredPokemons.length === 0

  return (
    <section className="page pokedex-page">
      <header>
        <p className="eyebrow">Live Pokédex</p>
        <h1>Search, star, and deep dive into any Pokémon.</h1>
        <p>
          Use the filters below to narrow the list. Tap a card to view full abilities, types, and battle-ready stats.
        </p>
      </header>

      <PokemonSearchBar />

      {error && (
        <StatusMessage tone="error">
          <p>{error}</p>
          <button className="ghost" type="button" onClick={refresh}>
            Try again
          </button>
        </StatusMessage>
      )}

      {favoriteMatches.length > 0 && (
        <div>
          <h2>Favorites</h2>
          <PokemonGrid pokemons={favoriteMatches} />
        </div>
      )}

      <div>
  <h2>All Pokémon</h2>
  <PokemonGrid pokemons={remainingPokemons} />
      </div>

      {isInitialLoading && <StatusMessage>Loading Pokédex entries…</StatusMessage>}

      {showEmpty && (
        <StatusMessage tone="warning">
          No Pokémon match “{formatPokemonName(searchQuery)}”. Try another name.
        </StatusMessage>
      )}

      <div className="page__actions">
        {hasMore && (
          <button className="primary" type="button" disabled={isLoadingMore} onClick={loadMore}>
            {isLoadingMore ? 'Loading more…' : 'Load more Pokémon'}
          </button>
        )}
      </div>
    </section>
  )
}

export default PokedexPage
