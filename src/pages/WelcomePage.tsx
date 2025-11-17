import { Link } from 'react-router-dom'

const highlights = [
  {
    title: 'Live Pokédex data',
    description: 'Always up-to-date information pulled straight from the public PokeAPI.',
  },
  {
    title: 'Powerful search',
    description: 'Filter by name instantly and jump into detailed stats with a single tap.',
  },
  {
    title: 'Favorites sync',
    description: 'Star the Pokémon you love and find them later on this device.',
  },
]

const WelcomePage = () => (
  <section className="page welcome-page">
    <div className="welcome-page__hero">
      <p className="eyebrow">Welcome to PokéScope</p>
      <h1>Track every Pokémon in one clean interface.</h1>
      <p>
        Browse official artwork, stats, abilities, and type matchups for every Pokémon. Build your own favorites list and keep exploring with lightning-fast search backed by React and Vite.
      </p>
      <div className="welcome-page__cta">
        <Link to="/pokedex" className="primary">
          Browse the Pokédex
        </Link>
        <a
          href="https://pokeapi.co/"
          target="_blank"
          rel="noreferrer"
          className="ghost"
        >
          Learn about PokeAPI
        </a>
      </div>
    </div>

    <div className="welcome-page__grid">
      {highlights.map((highlight) => (
        <article key={highlight.title} className="info-card">
          <h3>{highlight.title}</h3>
          <p>{highlight.description}</p>
        </article>
      ))}
    </div>
  </section>
)

export default WelcomePage
