import { useContext } from 'react'
import { PokemonContext, type PokemonContextValue } from '../context/PokemonContext'

export const usePokemonContext = (): PokemonContextValue => {
  const context = useContext(PokemonContext)

  if (!context) {
    throw new Error('usePokemonContext must be used within PokemonProvider')
  }

  return context
}
