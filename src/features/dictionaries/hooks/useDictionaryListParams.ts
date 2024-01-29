export const useDictionaryListParams = () => {
  const [listParams, setListParams] = useImmer({
    keywords: '',
    code: '',
    label: '',
    enabled: null,
    startTime: null,
    endTime: null
  })

  return {
    listParams,
    setListParams
  }
}
