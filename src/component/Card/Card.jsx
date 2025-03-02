import { Flex, Rate, Badge, Card, Typography } from 'antd'
import { parseISO, format } from 'date-fns'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import useApi from '../../hook/useApi'
import useRating from '../../hook/useRating'
import GenresBox from '../GenresBox/GenresBox'

import style from './Card.module.scss'

const { Title, Text, Paragraph } = Typography

function MyCard({ onRated, ...props }) {
  const [imageError, setImageError] = useState(false)
  const [dataRate, setDataRate] = useState({})
  const api = useApi()
  const { ratings, updateRating } = useRating()

  const {
    id,
    title,
    release_date: date,
    genre_ids: genreIds,
    rating: rate = 0,
    poster_path: imgPath,
    overview,
  } = props

  useEffect(() => {
    const storedRatings = JSON.parse(localStorage.getItem('moviesRating')) || {}
    setDataRate(storedRatings)
  }, [])

  const onChangeRate = async (movieId, rateValue) => {
    updateRating(movieId, rateValue)
    const objRate = JSON.parse(localStorage.getItem('moviesRating')) || {}
    const newObjRate = { ...objRate, [movieId]: rateValue }
    localStorage.setItem('moviesRating', JSON.stringify(newObjRate))

    const guestSesObj = localStorage.getItem('guestSessionId')
    if (!guestSesObj) return

    const { guestSessionId } = JSON.parse(guestSesObj)
    await api.postAddRateByMovieId(movieId, guestSessionId, rateValue)
  }

  const setBageColor = (value) => {
    if (value >= 0 && value < 3) return '#E90000'
    if (value >= 3 && value < 5) return '#E97E00'
    if (value >= 5 && value < 7) return '#E9D100'
    return '#66E900'
  }

  const currentRating = ratings[id] || dataRate[id] || rate || 0
  return (
    <Card
      hoverable
      className={style.card}
      styles={{
        body: {
          padding: 0,
          overflow: 'hidden',
        },
      }}
    >
      <Flex align="start" style={{ padding: '0px' }}>
        {imgPath && !imageError ? (
          <img
            alt="Постер фильма"
            src={`https://image.tmdb.org/t/p/w500/${imgPath}`}
            className={style.card__image}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={style.card__imageFallback} />
        )}
        <Flex vertical align="start" className={style.card__content}>
          <Flex
            justify="space-between"
            align="baseline"
            style={{ width: '100%' }}
          >
            <Title level={4} className={style.card__title}>
              {title}
            </Title>
            <Badge
              style={{
                width: '35px',
                height: '35px',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black',
                fontSize: '16px',
                border: `4px solid ${setBageColor(currentRating)}`,
                borderRadius: '50%',
              }}
              count={currentRating}
              showZero
              color="#ffff"
            />
          </Flex>
          <Text type="secondary" className={style.card__date}>
            {date ? format(parseISO(date), 'MMMM d, y') : 'no date'}
          </Text>
          <GenresBox genres={genreIds} />
          <Paragraph className={style.card__text}>{overview}</Paragraph>
        </Flex>
      </Flex>

      <Rate
        className={style.card__rate}
        count={10}
        value={currentRating}
        onChange={(value) => onChangeRate(id, value)}
        allowHalf
      />
    </Card>
  )
}

MyCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  release_date: PropTypes.string,
  genre_ids: PropTypes.arrayOf(PropTypes.number),
  rate: PropTypes.number,
  poster_path: PropTypes.string,
  overview: PropTypes.string,
}

export default MyCard
