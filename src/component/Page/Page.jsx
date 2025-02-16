import './Page.module.scss'
import { Input, Pagination } from 'antd'
import { useEffect, useState } from 'react'

import RadioGroup from '../RaioGroup/RadioGroup'
import CardsList from '../CardsList/CardsList'
import SkeletonList from '../SkeletonList/SkeletonList'
import ApiService from '../../service/apiService'

const api = new ApiService()
// let data = await api.getMovies(1)

function Page() {
  const [label, setLabel] = useState('')
  const [current, setCurrent] = useState(1)
  const [data, setData] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  useEffect(() => {
    async function fetchData() {
      let result = null
      if (label) {
        result = await api.getSearchMovies(label, current) // Поиск с учетом текущей страницы
      } else {
        result = await api.getMovies(current) // Общие данные
      }
      setData(result)
      setTotalPages(result.total_pages)
    }
    fetchData()
  }, [current, label])

  const handleChangePage = (page) => {
    setCurrent(page)
  }

  const handleChangeSearch = async (e) => {
    const searchWords = e.target.value
    setLabel(searchWords)
    setCurrent(1)
  }

  // Если данные еще не загружены, показываем заглушку
  if (!data) {
    return <SkeletonList />
  }

  return (
    <>
      <RadioGroup />
      <Input.Search
        placeholder="Try to search..."
        onChange={handleChangeSearch}
        value={label}
      />
      <CardsList data={data} />
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
