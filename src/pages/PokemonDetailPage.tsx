import { Link, useNavigate, useParams } from 'react-router-dom'
import PokemonStats from '../components/PokemonStats'
import StatusMessage from '../components/StatusMessage'
import { usePokemonContext } from '../hooks/usePokemonContext'
import { usePokemonDetails } from '../hooks/usePokemonDetails'
import { formatHeight, formatPokemonId, formatPokemonName, formatWeight } from '../utils/format'

const PokemonDetailPage = () => {
  const { name } = useParams<{ name: string }>()
  const navigate = useNavigate()
  const { pokemon, isLoading, error, refetch } = usePokemonDetails(name)
  const { toggleFavorite, isFavorite } = usePokemonContext()

  if (isLoading) {
    return (
      <section className="page detail-page">
        <StatusMessage>Loading Pokémon data…</StatusMessage>
      </section>
    )
  }

  if (error || !pokemon) {
    return (
      <section className="page detail-page">
        <StatusMessage tone="error">
          <p>{error ?? 'We could not load this Pokémon.'}</p>
          <div className="page__actions">
            <button className="ghost" type="button" onClick={refetch}>
              Retry
            </button>
            <button className="ghost" type="button" onClick={() => navigate(-1)}>
              Go back
            </button>
          </div>
        </StatusMessage>
      </section>
    )
  }

  const favorite = isFavorite(pokemon.name)

  return (
    <section className="page detail-page">
      <Link to="/pokedex" className="ghost">
        ← Back to Pokédex
      </Link>

      <header className="detail-page__hero">
        <div>
          <p className="eyebrow">{formatPokemonId(pokemon.id)}</p>
          <div className="detail-page__title">
            <h1>{formatPokemonName(pokemon.name)}</h1>
            <button className="ghost" type="button" onClick={() => toggleFavorite(pokemon.name)}>
              {favorite ? '★ Remove favorite' : '☆ Add to favorites'}
            </button>
          </div>
          <div className="type-chips">
            {pokemon.types.map((type) => (
              <span key={type}>{formatPokemonName(type)}</span>
            ))}
          </div>
        </div>
        <div className="detail-page__image">
          <img src={pokemon.image} alt={pokemon.name} width="240" height="240" />
        </div>
      </header>

      <div className="detail-page__meta">
        <article>
          <h2>Vitals</h2>
          <ul>
            <li>
              <strong>Height:</strong> {formatHeight(pokemon.height)}
            </li>
            <li>
              <strong>Weight:</strong> {formatWeight(pokemon.weight)}
            </li>
          </ul>
        </article>

        <article>
          <h2>Abilities</h2>
          <ul>
            {pokemon.abilities.map((ability) => (
              <li key={ability}>{formatPokemonName(ability)}</li>
            ))}
          </ul>
        </article>
      </div>

      <section>
        <h2>Stats</h2>
        <PokemonStats stats={pokemon.stats} />
      </section>
    </section>
  )
}

export default PokemonDetailPage
