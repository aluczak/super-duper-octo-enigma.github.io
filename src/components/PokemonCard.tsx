import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { usePokemonContext } from '../hooks/usePokemonContext'
import type { PokemonListItem } from '../types/pokemon'
import { formatPokemonId, formatPokemonName } from '../utils/format'

type Props = {
  pokemon: PokemonListItem
}

const PokemonCard = ({ pokemon }: Props) => {
  const { toggleFavorite, isFavorite } = usePokemonContext()
  const favorite = isFavorite(pokemon.name)

  const handleFavorite = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    toggleFavorite(pokemon.name)
  }

  return (
    <article className="pokemon-card">
      <button
        type="button"
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        className={`pokemon-card__favorite ${favorite ? 'is-active' : ''}`}
        onClick={handleFavorite}
      >
        {favorite ? '★' : '☆'}
      </button>
      <Link to={`/pokemon/${pokemon.name}`} className="pokemon-card__link">
        <div className="pokemon-card__image">
          <img src={pokemon.image} alt={pokemon.name} loading="lazy" width="160" height="160" />
        </div>
        <div className="pokemon-card__body">
          <span className="pokemon-card__id">{formatPokemonId(pokemon.id)}</span>
          <h3>{formatPokemonName(pokemon.name)}</h3>
        </div>
      </Link>
    </article>
  )
}

export default PokemonCard
