import type { PokemonStat } from '../types/pokemon'
import { formatPokemonName } from '../utils/format'

type Props = {
  stats: PokemonStat[]
}

const PokemonStats = ({ stats }: Props) => (
  <div className="stats-list">
    {stats.map((stat) => (
      <div key={stat.name} className="stats-list__row">
        <span className="stats-list__label">{formatPokemonName(stat.name)}</span>
        <div className="stats-list__bar">
          <div style={{ width: `${Math.min(stat.value, 150) / 150 * 100}%` }} />
        </div>
        <span className="stats-list__value">{stat.value}</span>
      </div>
    ))}
  </div>
)

export default PokemonStats
