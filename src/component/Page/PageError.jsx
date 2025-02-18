import { Row, Col, Typography, Flex } from 'antd'

const { Title, Paragraph } = Typography

function PageError() {
  return (
    <Row>
      <Col span={12} offset={6} xs={24} lg={14}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="0 0 200 200"
        >
          <g
            fill="none"
            stroke="#1E90FF"
            strokeWidth="10"
            strokeLinecap="round"
          >
            <path d="M100 50C70 50 40 60 20 80" />
            <path d="M100 50c30 0 60 10 80 30" />
            <path d="M100 80c20 0 40 10 50 20" />
            <path d="M100 80c-20 0-40 10-50 20" />
            <circle cx="100" cy="120" r="10" />
          </g>
          <text
            x="100"
            y="160"
            fontFamily="Arial, sans-serif"
            fontSize="20"
            fill="#1E90FF"
            textAnchor="middle"
          >
            Disconnect
          </text>
        </svg>
        <Flex vertical>
          <Title level={2}>Нет подключения к Интернету</Title>
          <Paragraph style={{ fontSize: '20px' }}>
            Проверьте соединение с Интеренетом и перезагрузите страницу
          </Paragraph>
        </Flex>
      </Col>
    </Row>
  )
}

export default PageError
