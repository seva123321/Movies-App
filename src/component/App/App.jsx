import { useMemo } from 'react'
import './App.module.scss'
import { Tabs } from 'antd'

import ApiService from '@/service/apiService'
import { ApiContext } from '@/service/Context'
import GenreProvider from '@/hoc/GenreProvider'
import RatingProvider from '@/hoc/RatingProvider'

import SearchPage from '../Page/SearchPage'
import RatePage from '../Page/RatePage'

const items = [
  {
    key: 1,
    label: 'Search',
    children: <SearchPage />,
  },
  {
    key: 2,
    label: 'Rated',
    children: <RatePage />,
  },
]

function App() {
  const api = useMemo(() => new ApiService(), [])

  return (
    <ApiContext.Provider value={api}>
      <GenreProvider>
        <RatingProvider>
          <Tabs
            defaultActiveKey="1"
            destroyInactiveTabPane
            items={items}
            centered
          />
        </RatingProvider>
      </GenreProvider>
    </ApiContext.Provider>
  )
}

export default App
