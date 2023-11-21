import type { DragEvent } from 'react'

import type { Setting } from '@/types'
import LoadingIcon from '~icons/line-md/loading-twotone-loop'
import DeleteIcon from '~icons/mdi/delete-forever-outline'
import DisableIcon from '~icons/mdi/hand-back-left-off-outline'
import EnableIcon from '~icons/mdi/hand-back-left-outline'
import EditIcon from '~icons/mdi/pencil'
import RefreshIcon from '~icons/mdi/refresh'

export function Component() {
  const { i18n } = useTranslation('COMMON')
  const queryClient = useQueryClient()
  const { message: AMessage } = AApp.useApp()

  // 无限滚动的加载
  const loadingRef = useRef(null)

  // 拖拽的列表
  const [list, setList] = useState<Setting[]>([])
  // 当前拖拽项的索引
  const [currentDragIndex, setCurrentDragIndex] = useState<number>(-1)
  const [pagination, setPagination] = useImmer({
    current: 1,
    pageSize: 50,
    total: 0
  })
  const [searchParams, setSearchParams] = useImmer({
    searchText: ''
  })

  const {
    data: queryResult,
    isRefetching,
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
          searchText: searchParams.searchText
        })
      ),
    placeholderData: keepPreviousData
  })

  // 启用、禁用
  const toggleEnableMutation = useMutation({
    mutationFn: ({ id, enable }: { id: number; enable: boolean }) =>
      enable ? SettingAPI.enable(id) : SettingAPI.disable(id),
    onSuccess: () => {
      AMessage.success('操作成功')
      refetch()
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => SettingAPI.delete(id),
    onSuccess: ({ message: msg }) => {
      AMessage.success(msg)
      queryClient.invalidateQueries({
        queryKey: [SettingAPI.SETTING_LIST_QUERY_KEY]
      })
    }
  })

  useEffect(() => {
    if (queryResult) {
      setList([...list, ...processI18n(queryResult.data)])
      setPagination((v) => {
        v.total = queryResult.total
      })
    }
  }, [queryResult])

  const callback = () => {
    if (!isRefetching && list.length <= pagination.total) {
      console.log(2)
      setPagination((v) => {
        v.current += 1
      })
      refetch()
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback)
    if (loadingRef.current) {
      observer.observe(loadingRef.current)
    }
    return () => observer.disconnect()
  }, [loadingRef])

  // 处理字段的国际化
  function processI18n(data?: Setting[]) {
    if (!data) return []
    const lang = i18n.language
    return data.map((item) => ({
      ...item,
      label: item.label[lang],
      remark: item.remark[lang]
    }))
  }

  // 搜索
  const handleSearch = () => {
    setPagination((v) => {
      v.current = 1
      v.total = 0
    })
    setList([])
    refetch()
  }

  // 删除
  async function handleDelete(id: number) {
    await deleteMutation.mutateAsync(id)
  }

  // 启用、禁用
  async function toggleEnable(id: number, enable: boolean) {
    await toggleEnableMutation.mutateAsync({ id, enable })
  }

  // 拖拽开始
  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.stopPropagation()
    setCurrentDragIndex(index)
  }

  // 拖拽结束
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault()

  // 拖拽放置
  const handleDrop = (_: DragEvent<HTMLDivElement>, targetCardId: number) => {
    const updatedCards = [...list]
    const moveItem = updatedCards[currentDragIndex!]
    updatedCards.splice(currentDragIndex!, 1)
    updatedCards.splice(targetCardId, 0, moveItem)
    setList(updatedCards)
    setCurrentDragIndex(-1)
  }

  return (
    <TableLayout
      operate={
        <div className="flex items-center justify-between space-x-2">
          <div>
            <AInput.Search
              value={searchParams.searchText}
              onChange={(e) => {
                setSearchParams((v) => {
                  v.searchText = e.target.value
                })
              }}
              onSearch={handleSearch}
              allowClear
              placeholder="请输入关键字"
            />
          </div>
          <ASpace>
            <AButton
              className="!flex items-center justify-center "
              shape="circle"
              icon={<AIcon component={isRefetching ? LoadingIcon : RefreshIcon} />}
              onClick={handleSearch}
            />
            <AButton type="primary">新增</AButton>
          </ASpace>
        </div>
      }
      table={
        <div className="flex min-h-[calc(100vh-214px)] flex-col items-center justify-between gap-2">
          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {list.map((item, index) => (
              <ACard
                key={item.id}
                rootClassName="rounded"
                draggable
                onDragStart={(event) => handleDragStart(event, index)}
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, index)}
                className={clsx(
                  'hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-gray-800',
                  currentDragIndex === index && '!cursor-move'
                )}
              >
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
                          onClick={() => toggleEnable(item.id, !item.enabled)}
                          className="text-lg text-gray-500 hover:text-blue-400"
                          component={item.enabled ? DisableIcon : EnableIcon}
                        />
                      </ATooltip>
                    </div>
                  </div>
                </div>
              </ACard>
            ))}
          </div>
          {isFetching && <ASpin className="h-16" />}
          <div ref={loadingRef} />
        </div>
      }
    />
  )
}
