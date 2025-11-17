import type { PokemonListItem } from '../types/pokemon'
import PokemonCard from './PokemonCard'

type Props = {
  pokemons: PokemonListItem[]
}

const PokemonGrid = ({ pokemons }: Props) => {
  if (!pokemons.length) {
    return null
  }

  return (
    <div className="pokemon-grid" data-testid="pokemon-grid">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}

export default PokemonGrid
