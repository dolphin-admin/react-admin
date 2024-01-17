import type { PaginationProps } from 'antd'

import { DEFAULT_PAGE_SIZE } from '@/constants'

export const usePagination = () => {
  const { t } = useTranslation()
  const response = useResponsive()

  const [pageParams, setPageParams] = useImmer({
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE
  })
  const [total, setTotal] = useState(0)

  const setPagination = (page: number, pageSize: number) =>
    setPageParams((draft) => {
      draft.page = page
      draft.pageSize = pageSize
    })

  return {
    pageParams,
    setPageParams,
    total,
    setTotal,
    pagination: {
      total,
      current: pageParams.page,
      pageSize: pageParams.pageSize,
      onChange: setPagination,
      size: (response.sm ? 'default' : 'small') as PaginationProps['size'],
      rootClassName: '!mb-0',
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (totalPage: number) => t('SHOW.TOTAL', { total: totalPage })
    }
  }
}
