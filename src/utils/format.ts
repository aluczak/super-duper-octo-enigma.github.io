export const formatPokemonName = (name: string) =>
  name
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ')

export const formatPokemonId = (id: number) => `#${id.toString().padStart(4, '0')}`

export const formatWeight = (weight: number) => `${(weight / 10).toFixed(1)} kg`

export const formatHeight = (height: number) => `${(height / 10).toFixed(1)} m`
