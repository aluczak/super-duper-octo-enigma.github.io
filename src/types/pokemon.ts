export type PokemonListItem = {
  id: number
  name: string
  image: string
  types: string[]
}

export type PokemonStat = {
  name: string
  value: number
}

export type PokemonDetail = PokemonListItem & {
  height: number
  weight: number
  abilities: string[]
  stats: PokemonStat[]
}
