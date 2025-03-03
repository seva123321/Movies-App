import { Flex, Button } from 'antd'
import { useEffect, useState } from 'react'

import useGenre from '@/hook/useGenre'

import style from './GenreBox.module.scss'

function GenresBox({ genres }) {
  const [genreNames, setGenreNames] = useState([])
  const genresLibrary = useGenre()

  useEffect(() => {
    const arr = genres
      .map((id) => {
        const genre = genresLibrary.find((genreItem) => +genreItem.id === +id)
        return genre ? genre.name : null
      })
      .filter(Boolean)

    setGenreNames(arr)
  }, [genresLibrary, genres])

  return (
    <Flex className={style.ganreBox}>
      {genreNames.map((genreName) => (
        <Button key={genreName} className={style.ganreBox__btn}>
          {genreName}
        </Button>
      ))}
    </Flex>
  )
}

export default GenresBox
