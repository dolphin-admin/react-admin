import { DictionaryPageModel } from '@/api/dictionary.type'

interface Options {
  pageParams: DictionaryPageModel
  prefetch?: boolean
}

export const DICTIONARIES_QUERY_KEY = 'dictionaries'

export const dictionariesQK = (pageParams?: DictionaryPageModel) => {
  if (!pageParams) {
    return [DICTIONARIES_QUERY_KEY]
  }
  return [DICTIONARIES_QUERY_KEY, pageParams]
}

export const useDictionariesQuery = (options: Options) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: dictionariesQK(options.pageParams),
    queryFn: ({ signal }) =>
      DictionaryAPI.list(new DictionaryPageModel(options.pageParams), signal),
    placeholderData: keepPreviousData
  })

  useEffect(() => {
    if (options.prefetch && query.data) {
      const { page, pageSize, total } = query.data
      if (page * pageSize < total) {
        const params = {
          ...options.pageParams,
          page: options.pageParams.page + 1
        }
        queryClient.prefetchQuery({
          queryKey: dictionariesQK(params),
          queryFn: ({ signal }) => DictionaryAPI.list(params, signal)
        })
      }
    }
  }, [options.prefetch, options.pageParams, query.data, queryClient])

  return query
}
