import { Alert } from 'antd'

import style from './Alert.module.scss'

function AlertError({ message }) {
  return (
    <Alert
      className={style.alert}
      message={message}
      description="Попробуйте перезагрузить страницу."
      type="error"
      closable
    />
  )
}

export default AlertError
