import { Flex, Rate, Badge, Card, Typography } from 'antd'
import { parseISO, format } from 'date-fns'
import { useState } from 'react'

import useApi from '../../hook/useApi'
import GenresBox from '../GenresBox/GenresBox'

import style from './Card.module.scss'

const { Title, Text, Paragraph } = Typography

function MyCard({ ...props }) {
  const [rate, setRate] = useState({})
  const [imageError, setImageError] = useState(false)

  const {
    id,
    title,
    release_date: date,
    genre_ids: genreIds,
    rating = 0,
    poster_path: imgPath,
    overview,
  } = props

  const api = useApi()

  const onChangeRate = async (movieId, rateValue) => {
    setRate((prev) => ({ ...prev, [movieId]: rateValue }))

    const guestSesObj = localStorage.getItem('guestSessionId')
    const { guestSessionId } = JSON.parse(guestSesObj)
    await api.postAddRateByMovieId(movieId, guestSessionId, rateValue)
  }

  const setBageColor = (value) => {
    switch (true) {
      case value >= 0 && value < 3:
        return '#E90000'

      case value >= 3 && value < 5:
        return '#E97E00'

      case value >= 5 && value < 7:
        return '#E9D100'

      default:
        return '#66E900'
    }
  }

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
          <div className={style.card__image_skelet} />
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
                border: `4px solid ${setBageColor(rating || rate[id] || 0)}`,
                borderRadius: '50%',
              }}
              count={rating || rate[id] || 0}
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
        value={rating || rate[id] || 0}
        onChange={(value) => onChangeRate(id, value)}
        allowHalf
      />
    </Card>
  )
}

export default MyCard
