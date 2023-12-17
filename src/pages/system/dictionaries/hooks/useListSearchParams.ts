import type { ListSearchParams } from '../types'

export const useListSearchParams = () => {
  const [listSearchParams, setListSearchParams] = useImmer<ListSearchParams>({
    keywords: '',
    code: '',
    label: '',
    enabled: null,
    startTime: null,
    endTime: null
  })
  return {
    listSearchParams,
    setParams: setListSearchParams
  }
}
