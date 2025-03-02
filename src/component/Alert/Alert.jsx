import { Alert } from 'antd'

import style from './Alert.module.scss'

function AlertError({
  message,
  description = 'Попробуйте перезагрузить страницу.',
}) {
  return (
    <Alert
      className={style.alert}
      message={message}
      description={description}
      type="error"
      closable
    />
  )
}

export default AlertError
