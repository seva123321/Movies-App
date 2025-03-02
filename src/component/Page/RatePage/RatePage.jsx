import './RatePage.module.scss'
import { Pagination } from 'antd'
import { useCallback, useEffect, useState } from 'react'

import CardsList from '../../CardsList/CardsList'
import SkeletonList from '../../SkeletonList/SkeletonList'
import NoNetError from '../../../service/ErrorHandler'
import Alert from '../../Alert/Alert'
import PageError from '../PagePageError'
import useApi from '../../../hook/useApi'

function RatePage() {
  const [current, setCurrent] = useState(1)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({
    isError: false,
    typeError: '',
    message: '',
  })

  const api = useApi()

  const handleChangePage = (page) => {
    setCurrent(page)
  }

  const onDataLoaded = (result) => {
    setData(result)
    setLoading(false)
  }

  const onError = (err) => {
    let type = 'someError'
    let message = 'Ошибка получения данных с сервера'
    let description = 'Попробуйте перезагрузить страницу.'
    if (err instanceof NoNetError) {
      type = 'noNet'
      message = 'Нет подключения к Интернету'
    } else {
      try {
        const errorData = JSON.parse(err.message)
        const {
          success,
          status_code: statusCode,
          status_message: statusMessage,
        } = errorData
        if (!success && statusCode === 34) {
          description = 'Please rate movies to make them appear in this field'
        }

        message = statusMessage || message
      } catch (e) {
        message = `Ошибка при парсинге данных об ошибке ${e}`
      }
    }

    setError((prev) => ({
      ...prev,
      isError: true,
      typeError: type,
      message,
      description,
    }))
    setLoading(false)
  }

  const fetchData = useCallback(async () => {
    const guestSesObj = localStorage.getItem('guestSessionId')
    const { guestSessionId } = JSON.parse(guestSesObj)

    await api
      .getRateForGuestSession(guestSessionId, current)
      .then(onDataLoaded)
      .catch(onError)
  }, [current, api])

  useEffect(() => {
    fetchData()
  }, [fetchData, current])

  const { typeError, isError, description, message } = error

  const hasData = !(loading || isError)
  const content = hasData ? <CardsList data={data.results} /> : null
  const skeleton = loading ? <SkeletonList /> : null
  const messageError = error.isError ? (
    <Alert message={message} description={description} />
  ) : null

  if (typeError === 'noConnectError' && isError) {
    return <PageError />
  }

  return (
    <>
      {content}
      {skeleton}
      {messageError}
      {data?.total_pages > 1 && (
        <Pagination
          onChange={handleChangePage}
          current={current}
          defaultCurrent={1}
          total={data?.total_results}
          pageSize={20}
          align="center"
        />
      )}
    </>
  )
}

export default RatePage
