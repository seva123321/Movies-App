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
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({
    isError: false,
    typeError: '',
    message: '',
  })
  const api = useApi()

  const onDataLoaded = (result) => {
    setData(result)
    setTotalPages(result.total_pages)
    setLoading(false)
  }

  const handleChangePage = (page) => {
    setCurrent(page)
  }

  const onError = (err) => {
    let type = 'someError'
    let message = 'Ошибка получения данных с сервера'
    if (err instanceof NoNetError) {
      type = 'noNet'
      message = 'Нет подключения к Интернету'
    }

    setError((prev) => ({
      ...prev,
      isError: true,
      typeError: type,
      message,
    }))
    setLoading(false)
  }
  const fetchData = useCallback(async () => {
    const guestSesObj = localStorage.getItem('guestSessionId')
    const { guestSessionId } = JSON.parse(guestSesObj)

    await api
      .getRateForGuestSession(guestSessionId)
      .then(onDataLoaded)
      .catch(onError)
  }, [api])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const { typeError, isError, message } = error

  const hasData = !(loading || isError)
  const content = hasData ? <CardsList data={data} /> : null
  const skeleton = loading ? <SkeletonList /> : null
  const messageError = error.isError ? <Alert message={message} /> : null

  if (typeError === 'noConnectError' && isError) {
    return <PageError />
  }

  return (
    <>
      {/* <Input.Search
        placeholder="Try to search..."
        onChange={handleChangeSearch}
        value={label}
      /> */}
      {content}
      {skeleton}
      {messageError}
      <Pagination
        onChange={handleChangePage}
        current={current}
        defaultCurrent={1}
        total={totalPages}
        align="center"
      />
    </>
  )
}

export default RatePage
