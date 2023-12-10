import type { ListSearchParams } from '../types'

export const useListSearchParams = () => {
  const [listSearchParams, setListSearchParams] = useImmer<ListSearchParams>({
    searchText: '',
    code: '',
    label: '',
    enabled: null,
    builtIn: null,
    startTime: null,
    endTime: null
  })
  return {
    listSearchParams,
    setParams: setListSearchParams
  }
}
