import { useMemo } from 'react'
import './App.module.scss'
import { Tabs } from 'antd'

import SearchPage from '../Page/SearchPage/SearchPage'
import RatePage from '../Page/RatePage/RatePage'
import ApiService from '../../service/ApiService'
import ApiContext from '../../service/Context'

const items = [
  { key: 1, label: 'Search', children: <SearchPage /> },
  { key: 2, label: 'Rated', children: <RatePage /> },
]

function App() {
  const api = useMemo(() => new ApiService(), [])

  return (
    <ApiContext.Provider value={api}>
      <Tabs
        defaultActiveKey="1"
        destroyInactiveTabPane
        items={items}
        centered
      />
    </ApiContext.Provider>
  )
}

export default App
