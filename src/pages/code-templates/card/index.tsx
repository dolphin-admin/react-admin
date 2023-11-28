import type { Setting } from '@/types'
import LoadingIcon from '~icons/line-md/loading-twotone-loop'
import DeleteIcon from '~icons/mdi/delete-forever-outline'
import DisableIcon from '~icons/mdi/hand-back-left-off-outline'
import EnableIcon from '~icons/mdi/hand-back-left-outline'
import EditIcon from '~icons/mdi/pencil'
import RefreshIcon from '~icons/mdi/refresh'

export function Component() {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const { message: AMessage } = AApp.useApp()

  const [pagination, setPagination] = useImmer({
    current: 1,
    pageSize: 10,
    total: 0
  })
  const [searchParams, setSearchParams] = useImmer({
    searchText: ''
  })

  const {
    data: queryResult,
    isRefetching,
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
    onSuccess: ({ message }) => {
      AMessage.success(message)
      queryClient.invalidateQueries({
        queryKey: [SettingAPI.SETTING_LIST_QUERY_KEY]
      })
    }
  })

  useEffect(() => {
    if (queryResult) {
      setPagination((draft) => {
        draft.total = queryResult.total
      })
    }
  }, [queryResult])

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
    setPagination((draft) => {
      draft.current = 1
      draft.total = 0
    })
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

  return (
    <TableLayout
      operate={
        <div className="flex items-center justify-between space-x-2">
          <div>
            <AInput.Search
              value={searchParams.searchText}
              onChange={(e) => {
                setSearchParams((draft) => {
                  draft.searchText = e.target.value
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
            {processI18n(queryResult?.data).map((item) => (
              <ACard
                key={item.id}
                rootClassName="rounded"
                className={clsx('hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-gray-800')}
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
          <APagination
            rootClassName="self-end"
            {...pagination}
            onChange={(page, pageSize) => {
              setPagination((draft) => {
                draft.current = page
                draft.pageSize = pageSize
              })
            }}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => t('SHOW.TOTAL', { total })}
          />
        </div>
      }
    />
  )
}
