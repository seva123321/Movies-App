import { useState, useEffect } from 'react'

import { GenreContext } from '../service/Context'
import ApiService from '../service/apiService'

function GenreProvider({ children }) {
  const [genres, setGenres] = useState([])
  useEffect(() => {
    const api = new ApiService()

    const fetchGenres = async () => {
      try {
        const response = await api.getGenreMovie()
        setGenres(response.genres)
      } catch (error) {
        setGenres([])
      }
    }

    fetchGenres()
  }, [])

  return (
    <GenreContext.Provider value={genres}>{children}</GenreContext.Provider>
  )
}

export default GenreProvider
