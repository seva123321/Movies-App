import { useContext } from 'react'

import ApiContext from '../service/Context'

export default function useApi() {
  return useContext(ApiContext)
}
