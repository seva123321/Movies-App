import { Col, Row } from 'antd'

import Card from '../Card/Card'

import style from './CardsList.module.scss'

function CardsList({ data = [] }) {
  const { results } = data

  return (
    <Row gutter={[24, 24]} className={style.cardsList} justify="center">
      {results?.map((res) => (
        <Col
          xxl={8}
          lg={12}
          md={18}
          xs={24}
          key={res.id}
          style={{ maxWidth: '600px' }}
        >
          <Card {...res} />
        </Col>
      ))}
    </Row>
  )
}

export default CardsList
