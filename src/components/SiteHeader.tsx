import { NavLink } from 'react-router-dom'
import { usePokemonContext } from '../hooks/usePokemonContext'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/pokedex', label: 'Pokédex' },
]

const SiteHeader = () => {
  const { favorites } = usePokemonContext()

  return (
    <header className="site-header">
      <div className="site-header__brand">
        <span className="site-header__eyebrow">PokéScope</span>
        <strong>Pokédex Explorer</strong>
      </div>

      <nav className="site-header__nav">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="site-header__meta">
        <span>{favorites.length} favorite{favorites.length === 1 ? '' : 's'}</span>
      </div>
    </header>
  )
}

export default SiteHeader
