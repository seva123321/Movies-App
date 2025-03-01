import { useContext } from 'react'

import { GenreContext } from '../service/Context'

export default function useGenre() {
  return useContext(GenreContext)
}
