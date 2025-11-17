import { usePokemonContext } from '../hooks/usePokemonContext'

const PokemonSearchBar = () => {
  const { searchQuery, setSearchQuery } = usePokemonContext()

  return (
    <div className="search-bar">
      <label htmlFor="pokemon-search">Search by name</label>
      <div className="search-bar__controls">
        <input
          id="pokemon-search"
          name="pokemon-search"
          type="search"
          placeholder="Start typing e.g. pikachu"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        {searchQuery && (
          <button type="button" className="ghost" onClick={() => setSearchQuery('')}>
            Clear
          </button>
        )}
      </div>
    </div>
  )
}

export default PokemonSearchBar
