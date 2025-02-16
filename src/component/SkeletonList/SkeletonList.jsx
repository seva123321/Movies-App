import { Row, Col, Skeleton } from 'antd'
import React from 'react'

function SkeletonList() {
  return (
    <Row gutter={[18, 18]}>
      <Col lg={12} xs={24}>
        <Skeleton active />
      </Col>
      <Col lg={12} xs={24}>
        <Skeleton active />
      </Col>
      <Col lg={12} xs={24}>
        <Skeleton active />
      </Col>
      <Col lg={12} xs={24}>
        <Skeleton active />
      </Col>
      <Col lg={12} xs={24}>
        <Skeleton active />
      </Col>
      <Col lg={12} xs={24}>
        <Skeleton active />
      </Col>
    </Row>
  )
}

export default SkeletonList
