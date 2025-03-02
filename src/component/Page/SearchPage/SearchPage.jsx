import './SearchPage.module.scss'
import { Input, Pagination } from 'antd'
import { useCallback, useEffect, useRef, useState } from 'react'

import CardsList from '../../CardsList/CardsList'
import SkeletonList from '../../SkeletonList/SkeletonList'
import debounce from '../../../service/Utils'
import NoNetError from '../../../service/ErrorHandler'
import Alert from '../../Alert/Alert'
import PageError from '../PagePageError'
import useApi from '../../../hook/useApi'

function SearchPage() {
  const [label, setLabel] = useState('')
  const [current, setCurrent] = useState(1)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const searchInputRef = useRef()
  const [error, setError] = useState({
    isError: false,
    typeError: '',
    message: '',
  })

  const api = useApi()

  const handleChangePage = (page) => {
    setCurrent(page)
  }

  const handleChangeSearch = async (e) => {
    const searchWords = e.target.value
    setLabel(searchWords)
    setCurrent(1)
  }

  const onDataLoaded = (result) => {
    setData(result)
    setLoading(false)
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

  const onGettingSession = (result) => {
    const {
      success,
      guest_session_id: guestSessionId,
      expires_at: timeExpires,
    } = result

    if (success) {
      localStorage.setItem(
        'guestSessionId',
        JSON.stringify({ guestSessionId, timeExpires })
      )
    }
  }

  const addGuestSessionInStorage = useCallback(() => {
    const guestSesObj = localStorage.getItem('guestSessionId')
    const query = async () => {
      await api.getGuestSession().then(onGettingSession).catch(onError)
    }

    if (!guestSesObj) {
      query()
      localStorage.removeItem('moviesRating')
      return
    }

    const { timeExpires } = JSON.parse(guestSesObj)
    const isExpires = !(Date.parse(timeExpires) - Date.now())

    if (isExpires) query()
  }, [api])

  const fetchData = useCallback(async () => {
    if (!label) {
      await api.getMovies(current).then(onDataLoaded).catch(onError)
      return
    }
    await api.getSearchMovies(label, current).then(onDataLoaded).catch(onError)
  }, [current, label, api])

  useEffect(() => {
    const debouncedFetchData = debounce(fetchData, 500)
    searchInputRef.current.focus()
    if (label) {
      debouncedFetchData()
    } else {
      fetchData()
    }

    addGuestSessionInStorage()

    return () => {
      debouncedFetchData.cancel()
    }
  }, [fetchData, addGuestSessionInStorage, label])

  const { typeError, isError, message } = error

  const hasData = !(loading || isError)
  const content = hasData ? <CardsList data={data.results} /> : null
  const skeleton = loading ? <SkeletonList /> : null
  const messageError = error.isError ? <Alert message={message} /> : null

  if (typeError === 'noConnectError' && isError) {
    return <PageError />
  }

  return (
    <>
      <Input.Search
        placeholder="Try to search..."
        onChange={handleChangeSearch}
        value={label}
        ref={searchInputRef}
      />
      {content}
      {skeleton}
      {messageError}
      {data?.total_pages > 1 && (
        <Pagination
          onChange={handleChangePage}
          current={current}
          pageSize={20}
          defaultCurrent={1}
          total={data?.total_results}
          align="center"
        />
      )}
    </>
  )
}

export default SearchPage
