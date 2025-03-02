import { useContext } from 'react'

import { RatingContext } from '../service/Context'

export default function useRating() {
  return useContext(RatingContext)
}
