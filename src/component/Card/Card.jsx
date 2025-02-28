import { Flex, Rate, Badge, Card, Skeleton, Button, Typography } from 'antd'
import { parseISO, format } from 'date-fns'
import { useState } from 'react'

import useApi from '../../hook/useApi'

import style from './Card.module.scss'

const { Title, Text, Paragraph } = Typography

function MyCard({ ...props }) {
  const [rate, setRate] = useState(0)
  const {
    id,
    title,
    release_date: date,
    // vote_average: starsRating,
    poster_path: imgPath,
    overview,
  } = props

  const api = useApi()

  const onChangeRate = async (movieId, rateValue) => {
    setRate(rateValue)

    const guestSesObj = localStorage.getItem('guestSessionId')
    const { guestSessionId } = JSON.parse(guestSesObj)
    await api.postAddRateByMovieId(movieId, guestSessionId, rateValue)
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
        {imgPath ? (
          <img
            alt="Постер фильма"
            src={`https://image.tmdb.org/t/p/w500/${imgPath}`}
            className={style.card__image}
            placeholder={<Skeleton.Image active className={style.badge} />}
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
                border: '4px solid #faad14',
                borderRadius: '50%',
              }}
              count={rate}
              showZero
              color="#ffff"
            />
          </Flex>
          <Text type="secondary" className={style.card__date}>
            {date ? format(parseISO(date), 'MMMM d, y') : 'no date'}
          </Text>
          <Flex className={style.card__ganre}>
            <Button style={{ height: '20px', width: '46px', fontSize: '12px' }}>
              Action
            </Button>
            <Button style={{ height: '20px', width: '46px', fontSize: '12px' }}>
              Drama
            </Button>
          </Flex>
          <Paragraph className={style.card__text}>{overview}</Paragraph>
        </Flex>
      </Flex>
      {/* <Paragraph className={style.card__text}>{overview}</Paragraph> */}
      <Rate
        className={style.card__rate}
        count={10}
        defaultValue={rate}
        // defaultValue={starsRating}
        // disabled
        onChange={(value) => onChangeRate(id, value)}
        allowHalf
      />
    </Card>
  )
}

export default MyCard
