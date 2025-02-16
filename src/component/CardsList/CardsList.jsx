import { Col, Row } from 'antd'

import Card from '../Card/Card'

import style from './CardsList.module.scss'

function CardsList({ data = [] }) {
  const { results } = data

  return (
    <Row gutter={[18, 18]} className={style.cardsList}>
      {results.map((res) => (
        <Col lg={12} xs={24} key={res.id}>
          <Card {...res} />
        </Col>
      ))}
      {/* <Col lg={12} xs={24}>
        <Card />
      </Col>
      <Col lg={12} xs={24}>
        <Card />
      </Col>
      <Col lg={12} xs={24}>
        <Card />
      </Col>
      <Col lg={12} xs={24}>
        <Card />
      </Col>
      <Col lg={12} xs={24}>
        <Card />
      </Col>
      <Col lg={12} xs={24}>
        <Card />
      </Col> */}
    </Row>
  )
}

export default CardsList
