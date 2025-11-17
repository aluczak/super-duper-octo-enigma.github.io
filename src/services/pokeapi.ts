import type { PokemonDetail, PokemonListItem, PokemonStat } from '../types/pokemon'

type PokemonAPIStat = {
  stat: { name: string }
  base_stat: number
}

type PokemonAPIDetail = {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    other?: {
      ['official-artwork']?: {
        front_default?: string
      }
    }
  }
  abilities: { ability: { name: string } }[]
  types: { type: { name: string } }[]
  stats: PokemonAPIStat[]
}

type PokemonListResponse = {
  next: string | null
  results: { name: string; url: string }[]
}

const API_BASE = 'https://pokeapi.co/api/v2'
const ARTWORK_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'

const getPokemonIdFromUrl = (url: string) => {
  const segments = url.split('/').filter(Boolean)
  return Number(segments[segments.length - 1])
}

const normalizeName = (name: string) => name.toLowerCase().trim()

const mapStats = (stats: PokemonAPIStat[]): PokemonStat[] =>
  stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }))

const mapDetail = (data: PokemonAPIDetail): PokemonDetail => ({
  id: data.id,
  name: data.name,
  image: data.sprites?.other?.['official-artwork']?.front_default ?? `${ARTWORK_BASE}/${data.id}.png`,
  height: data.height,
  weight: data.weight,
  abilities: data.abilities.map((ability) => ability.ability.name),
  types: data.types.map((type) => type.type.name),
  stats: mapStats(data.stats),
})

export type PokemonPageResponse = {
  pokemons: PokemonListItem[]
  nextOffset: number | null
}

export const fetchPokemonPage = async (
  limit = 24,
  offset = 0,
): Promise<PokemonPageResponse> => {
  const response = await fetch(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`)

  if (!response.ok) {
    throw new Error('Unable to load Pokémon list right now.')
  }

  const payload: PokemonListResponse = await response.json()

  const pokemons: PokemonListItem[] = payload.results.map((result: { name: string; url: string }) => {
    const id = getPokemonIdFromUrl(result.url)
    return {
      id,
      name: result.name,
      image: `${ARTWORK_BASE}/${id}.png`,
      types: [],
    }
  })

  let nextOffset: number | null = null

  if (payload.next) {
    const nextUrl = new URL(payload.next)
    const offsetParam = nextUrl.searchParams.get('offset')
    nextOffset = offsetParam ? Number(offsetParam) : null
  }

  return {
    pokemons,
    nextOffset,
  }
}

export const fetchPokemonDetail = async (nameOrId: string): Promise<PokemonDetail> => {
  const normalizedName = normalizeName(nameOrId)
  const response = await fetch(`${API_BASE}/pokemon/${normalizedName}`)

  if (!response.ok) {
    throw new Error('We could not find that Pokémon. Please try another name.')
  }

  const payload: PokemonAPIDetail = await response.json()

  return mapDetail(payload)
}
