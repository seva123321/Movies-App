import React from 'react'
import { Radio } from 'antd'

function RadioGroup() {
  return (
    <Radio.Group style={{ marginBottom: 8 }}>
      <Radio.Button value="top">Search</Radio.Button>
      <Radio.Button value="left">Rated</Radio.Button>
    </Radio.Group>
  )
}

export default RadioGroup
