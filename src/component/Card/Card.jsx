import { Flex, Rate, Badge, Card, Skeleton, Button, Typography } from 'antd'
import { parseISO, format } from 'date-fns'

import style from './Card.module.scss'

const { Title, Text, Paragraph } = Typography

function MyCard({ ...props }) {
  const {
    title,
    release_date: date,
    vote_average: starsRating,
    poster_path: imgPath,
    overview,
  } = props

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
              // className={style.card__badge}
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
              count={+starsRating.toFixed(1)}
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
      <Rate
        className={style.card__rate}
        count={10}
        defaultValue={starsRating}
        disabled
        allowHalf
      />
    </Card>
  )
}

export default MyCard

// import {
//   Flex,
//   Rate,
//   Badge,
//   Space,
//   Col,
//   Row,
//   Card,
//   Skeleton,
//   Button,
//   Typography,
// } from 'antd'
// import { parseISO, format } from 'date-fns'

// import style from './Card.module.scss'

// const { Title, Text, Paragraph } = Typography

// function MyCard({ ...props }) {
//   const {
//     title,
//     release_date: date,
//     vote_average: starsRating,
//     poster_path: imgPath,
//     overview,
//   } = props

//   return (
//     <Card
//       hoverable
//       className={style.card}
//       styles={{
//         body: {
//           padding: 0,
//           overflow: 'hidden',
//         },
//       }}
//     >
//       <Row gutter={{ xs: 10, lg: 20 }}>
//         <Col
//           xs={{ span: 4 }}
//           lg={{ span: 10 }}
//           // style={{ display: 'inline-block' }}
//         >
//           {imgPath ? (
//             <img
//               alt="Постер фильма"
//               src={`https://image.tmdb.org/t/p/w500/${imgPath}`}
//               className={style.card__image}
//             />
//           ) : (
//             <div className={style.card__image_skelet} />
//           )}
//         </Col>
//         <Col
//           xs={{ span: 20 }}
//           lg={{ span: 14 }}
//           align="start"
//           // style={{ padding: '0' }}
//           className={style.card__content}
//         >
//           {/* <Flex
//             justify="space-between"
//             align="baseline"
//             style={{ width: '100%' }}
//           > */}
//           <Flex justify="space-between">
//             <Title
//               level={4}
//               className={style.card__title}
//               // style={{ display: 'block' }}
//             >
//               {title}
//             </Title>

//             <Badge
//               // className={style.card__badge}
//               style={{
//                 width: '35px',
//                 height: '35px',
//                 textAlign: 'center',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 color: 'black',
//                 fontSize: '16px',
//                 border: '4px solid #faad14',
//                 borderRadius: '50%',
//               }}
//               count={+starsRating.toFixed(1)}
//               showZero
//               color="#ffff"
//             />
//           </Flex>
//           <Text
//             type="secondary"
//             className={style.card__date}
//             // style={{ display: 'block' }}
//           >
//             {date ? format(parseISO(date), 'MMMM d, y') : 'no date'}
//           </Text>

//           <Flex className={style.card__ganre}>
//             <Button style={{ height: '20px', width: '46px', fontSize: '12px' }}>
//               Action
//             </Button>
//             <Button style={{ height: '20px', width: '46px', fontSize: '12px' }}>
//               Drama
//             </Button>
//           </Flex>
//         </Col>
//         <Col
//           xs={{ span: 22, offset: 1 }}
//           lg={{ span: 10 }}
//           style={{ padding: '0' }}
//         >
//           <Paragraph className={style.card__text}>{overview}</Paragraph>
//           <Rate
//             count={10}
//             defaultValue={starsRating}
//             disabled
//             allowHalf
//           />
//         </Col>
//       </Row>
//     </Card>
//   )
// }

// export default MyCard
