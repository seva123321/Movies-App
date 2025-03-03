import { Col, Row } from 'antd'
import PropTypes from 'prop-types'

import Card from '../Card'

import style from './CardsList.module.scss'

function CardsList({ data = [] }) {
  return (
    <Row gutter={[24, 24]} className={style.cardsList} justify="center">
      {data?.map((res) => (
        <Col xxl={8} lg={12} xs={24} key={res.id} style={{ maxWidth: '500px' }}>
          <Card {...res} />
        </Col>
      ))}
    </Row>
  )
}

CardsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object || null),
}

export default CardsList
