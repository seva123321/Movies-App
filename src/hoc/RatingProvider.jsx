import { useState, useMemo, useCallback } from 'react'

import { RatingContext } from '../service/Context'

function RatingProvider({ children }) {
  const [ratings, setRatings] = useState({})

  const updateRating = useCallback((movieId, rating) => {
    setRatings((prev) => ({ ...prev, [movieId]: rating }))
  }, [])

  const contextValue = useMemo(
    () => ({ ratings, updateRating }),
    [ratings, updateRating]
  )

  return (
    <RatingContext.Provider value={contextValue}>
      {children}
    </RatingContext.Provider>
  )
}
export default RatingProvider
