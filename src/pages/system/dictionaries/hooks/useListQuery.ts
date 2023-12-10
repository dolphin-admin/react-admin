import type { PaginationProps } from 'antd'

import type { ListSearchParams } from '../types'

interface Props {
  params: ListSearchParams
}

export const useListQuery = ({ params }: Props) => {
  const { t } = useTranslation()
  const response = useResponsive()

  const [pageParams, setPageParams] = useImmer({
    current: 1,
    pageSize: 10
  })
  const [total, setTotal] = useState(0)

  const { data, isRefetching, isFetching } = useQuery({
    queryKey: [DictionaryAPI.LIST_QUERY_KEY, pageParams, params],
    queryFn: () =>
      DictionaryAPI.list(
        new BasePageModel({
          pageSize: pageParams.pageSize,
          page: pageParams.current,
          ...params
        })
      ),
    select: (d) => d.data,
    placeholderData: keepPreviousData
  })

  // 设置总数
  useEffect(() => {
    if (data?.total) {
      setTotal(data.total)
    }
  }, [data?.total, setPageParams])

  // 设置分页
  const setPagination = (page: number, pageSize: number) =>
    setPageParams((draft) => {
      draft.current = page
      draft.pageSize = pageSize
    })

  return {
    listData: data?.records ?? [],
    isRefreshing: isRefetching,
    isListLoading: isFetching,
    pagination: {
      total,
      ...pageParams,
      onChange: setPagination,
      size: (response.sm ? 'default' : 'small') as PaginationProps['size'],
      rootClassName: '!mb-0',
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (totalPage: number) => t('SHOW.TOTAL', { total: totalPage })
    }
  }
}
