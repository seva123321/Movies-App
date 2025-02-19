import './Page.module.scss'
import { Input, Pagination } from 'antd'
import { useCallback, useEffect, useState } from 'react'

import RadioGroup from '../RaioGroup/RadioGroup'
import CardsList from '../CardsList/CardsList'
import SkeletonList from '../SkeletonList/SkeletonList'
import ApiService from '../../service/ApiService'
import debounce from '../../service/Utils'
import NoNetError from '../../service/ErrorHandler'
import Alert from '../Alert/Alert'

import PageError from './PageError'

const api = new ApiService()
// let data = await api.getMovies(1)

function Page() {
  const [label, setLabel] = useState('')
  const [current, setCurrent] = useState(1)
  const [data, setData] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({
    isError: false,
    typeError: '',
    message: '',
  })

  const onDataLoaded = (result) => {
    setData(result)
    setTotalPages(result.total_pages)
    setLoading(false)
  }

  const handleChangePage = (page) => {
    setCurrent(page)
  }

  const handleChangeSearch = async (e) => {
    const searchWords = e.target.value
    setLabel(searchWords)
    setCurrent(1)
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
    if (!label) {
      await api.getMovies(current).then(onDataLoaded).catch(onError)
      return
    }
    await api.getSearchMovies(label, current).then(onDataLoaded).catch(onError)
  }, [current, label])

  const debouncedFetchData = useCallback(() => {
    const debouncedFn = debounce(() => fetchData(), 500)
    return debouncedFn
  }, [fetchData])

  useEffect(() => {
    if (label) {
      debouncedFetchData()
    } else {
      fetchData()
    }

    return () => {
      debouncedFetchData.cancel()
    }
  }, [debouncedFetchData, fetchData, label])

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
      <RadioGroup />
      <Input.Search
        placeholder="Try to search..."
        onChange={handleChangeSearch}
        value={label}
      />
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

export default Page
