import type { DragEvent } from 'react'

import type { Setting } from '@/types'
import DeleteIcon from '~icons/mdi/delete-forever-outline'
import DisableIcon from '~icons/mdi/hand-back-left-off-outline'
import EnableIcon from '~icons/mdi/hand-back-left-outline'
import EditIcon from '~icons/mdi/pencil'
import RefreshIcon from '~icons/mdi/refresh'

const { Search } = AInput

export function Component() {
  const { t, i18n } = useTranslation('COMMON')
  const queryClient = useQueryClient()
  const { message } = AApp.useApp()
  // 无限滚动的加载
  const loaderRef = useRef(null)
  // 拖拽的列表
  const [cards, setCards] = useState<Setting[]>([])
  const [nowDragIndex, setNowDragIndex] = useState<number | null>(null)

  const navigate = useNavigate()

  const [pagination, setPagination] = useImmer({
    current: 1,
    pageSize: 10,
    total: 0
  })
  const [searchContent, setSearchContent] = useImmer({
    searchText: ''
  })

  const {
    data: queryResult,
    isFetching,
    refetch
  } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [SettingAPI.SETTING_LIST_QUERY_KEY, pagination.pageSize, pagination.current],
    queryFn: () =>
      SettingAPI.getList(
        new BasePageModel({
          pageSize: pagination.pageSize,
          page: pagination.current,
          searchText: searchContent.searchText
        })
      ),
    placeholderData: keepPreviousData
  })

  const onSearch = (value: any) => {
    setSearchContent((prevSearchContent) => {
      const updatedSearchContent = { ...prevSearchContent, searchText: value }
      return updatedSearchContent
    })
    refetch()
  }
  // 处理字段的国际化
  const processI18n = (data?: Setting[]) => {
    if (!data) return []
    const lang = i18n.language
    return data.map((item) => ({
      ...item,
      label: item.label[lang],
      remark: item.remark[lang]
    }))
  }

  // 处理删除
  const deleteMutation = useMutation({
    mutationFn: (id: number) => SettingAPI.delete(id),
    onSuccess: ({ message: msg }) => {
      message.success(msg)
      queryClient.invalidateQueries({
        queryKey: [SettingAPI.SETTING_LIST_QUERY_KEY]
      })
    }
  })
  async function handleDelete(id: number) {
    await deleteMutation.mutateAsync(id)
  }

  // 处理启用禁用
  const enableMutation = useMutation({
    mutationFn: async ([isEnable, id]: [boolean, number]) => {
      if (isEnable) {
        await SettingAPI.enable(id)
      } else {
        await SettingAPI.disable(id)
      }
    },
    onSuccess: () => {
      message.success('操作成功')
      queryClient.invalidateQueries({
        queryKey: [SettingAPI.SETTING_LIST_QUERY_KEY]
      })
    }
  })
  async function handleEnable(isEnable: boolean, id: number) {
    await enableMutation.mutateAsync([isEnable, id])
  }

  // 实现拖拽排序
  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.stopPropagation()
    setNowDragIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>, targetCardId: number) => {
    const updatedCards = [...cards]
    const moveItem = updatedCards[nowDragIndex!]
    updatedCards.splice(nowDragIndex!, 1)
    updatedCards.splice(targetCardId, 0, moveItem)
    setCards(updatedCards)
  }

  useEffect(() => {
    if (queryResult) {
      setCards(queryResult.data)
    }
  }, [queryResult])

  useEffect(() => {
    if (queryResult?.total) {
      setPagination((v) => {
        v.total = queryResult.total
      })
    }
  }, [queryResult])

  // 实现无限滚动
  // Intersection Observer API 有效地跟踪和响应元素相对于其父容器或视口的可见性变化。
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0]
      if (firstEntry.isIntersecting) {
        setPagination((v) => {
          if (v.pageSize >= v.total) {
            v.pageSize = v.total
          } else {
            v.pageSize += 10
          }
        })
      }
    })
    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }
    return () => observer.disconnect()
  }, [setPagination])

  return (
    <div>
      <div className="flex">
        <div onClick={() => navigate('/code-templates/table-templates')}>code-templatesd</div>
        <div onClick={() => navigate('/code-templates/card-templates')}>card-templates</div>
      </div>
      <ACard
        hoverable
        className="min-h-[calc(100vh-150px)] border "
      >
        <ACard className="mb-2  bg-slate-50 dark:bg-slate-950">
          <div className="flex  items-center justify-between">
            <Search
              style={{ width: 250 }}
              placeholder="input search text"
              onSearch={onSearch}
              allowClear
              value={searchContent.searchText}
              onChange={(e) => {
                setSearchContent((v) => {
                  v.searchText = e.target.value
                })
              }}
            />
            <div className="flex gap-2">
              <AButton
                className="flex  items-center justify-center "
                shape="circle"
                onClick={() => refetch()}
                icon={<AIcon component={RefreshIcon} />}
              />
              <AButton type="primary">新增</AButton>
            </div>
          </div>
        </ACard>
        <ACard>
          <div
            className="flex min-h-[calc(100vh-214px)]  flex-col items-center justify-between gap-2
          "
          >
            <div className="grid w-full grid-cols-1 gap-4   lg:grid-cols-2 xl:grid-cols-3">
              {processI18n(cards).map((item, index) => (
                <ACard
                  rootClassName="rounded"
                  draggable
                  onDragStart={(event) => handleDragStart(event, index)}
                  onDragOver={handleDragOver}
                  onDrop={(event) => handleDrop(event, index)}
                  key={index}
                  className=" hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-gray-800"
                >
                  {isFetching ? (
                    <ASkeleton active />
                  ) : (
                    <div className="flex h-24 justify-between">
                      <div className="flex h-full flex-col items-start justify-between">
                        <div>
                          <span className="pr-2">{`${item.id}   ${item.value}`}</span>
                          <ATag color="processing">{item.key}</ATag>
                        </div>
                        <div>{item.remark}</div>
                        <div className="text-slate-400">{item.label}</div>
                      </div>
                      <div>
                        <div className="flex cursor-pointer items-center justify-center gap-4">
                          <ATooltip
                            placement="top"
                            title="编辑"
                            arrow
                          >
                            <AIcon
                              className="text-lg text-gray-500  hover:text-blue-400"
                              size={36}
                              component={EditIcon}
                            />
                          </ATooltip>
                          <ATooltip
                            placement="top"
                            title="删除"
                            arrow
                          >
                            <AIcon
                              onClick={() => handleDelete(item.id)}
                              className="text-xl text-gray-500 hover:text-blue-400"
                              component={DeleteIcon}
                            />
                          </ATooltip>

                          <ATooltip
                            placement="top"
                            title={item.enabled ? '禁用' : '启用'}
                            arrow
                          >
                            <AIcon
                              onClick={() => handleEnable(!item.enabled, item.id)}
                              className="text-lg text-gray-500 hover:text-blue-400"
                              component={item.enabled ? DisableIcon : EnableIcon}
                            />
                          </ATooltip>
                        </div>
                      </div>
                    </div>
                  )}
                </ACard>
              ))}
            </div>

            <div ref={loaderRef}>{isFetching ? <ASpin className="h-16 " /> : null}</div>
            <div className="flex w-full flex-nowrap items-center justify-end ">
              <APagination
                pageSize={pagination.pageSize}
                current={pagination.current}
                onChange={(page, pageSize) => {
                  setPagination((v) => {
                    v.current = page
                    v.pageSize = pageSize
                  })
                }}
                total={pagination.total}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => t('SHOW.TOTAL', { total })}
              />
            </div>
          </div>
        </ACard>
      </ACard>
    </div>
  )
}
