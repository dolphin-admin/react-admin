import ValueIcon from '~icons/carbon/character-upper-case'
import RemarkIcon from '~icons/mdi/comment-multiple-outline'
import DeleteIcon from '~icons/mdi/delete-forever-outline'
import EnableIcon from '~icons/mdi/lock-open-outline'
import DisableIcon from '~icons/mdi/lock-outline'
import EditIcon from '~icons/mdi/pencil'
import KeyIcon from '~icons/solar/key-outline'

export function Component() {
  const { t } = useTranslation()
  const response = useResponsive()
  const queryClient = useQueryClient()
  const { message } = AApp.useApp()
  const hoverDisplay = useHoverDisplay<number>()

  const [pagination, setPagination] = useImmer({
    current: 1,
    pageSize: 10,
    total: 0
  })

  const templateQuery = useQuery({
    queryKey: [SettingAPI.LIST_QUERY_KEY, pagination.pageSize, pagination.current],
    queryFn: () =>
      SettingAPI.list(
        new BasePageModel({
          pageSize: pagination.pageSize,
          page: pagination.current
        })
      ),
    select: (data) => data.data,
    placeholderData: keepPreviousData
  })

  const toggleEnableMutation = useMutation({
    mutationFn: ({ id, enabled }: { id: number; enabled: boolean }) =>
      SettingAPI.patch(id, { enabled }),
    onMutate: async ({ id, enabled }) => {
      await queryClient.cancelQueries({
        queryKey: [SettingAPI.LIST_QUERY_KEY, pagination.pageSize, pagination.current]
      })
      const previous = await queryClient.getQueryData([
        SettingAPI.LIST_QUERY_KEY,
        pagination.pageSize,
        pagination.current
      ])
      await queryClient.setQueryData(
        [SettingAPI.LIST_QUERY_KEY, pagination.pageSize, pagination.current],
        (old: any) => {
          const records = [...old.data.records]
          const index = records.findIndex((item: any) => item.id === id)
          records[index].enabled = enabled
          return {
            ...old,
            records
          }
        }
      )
      return { previous }
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(
        [SettingAPI.LIST_QUERY_KEY, pagination.pageSize, pagination.current],
        context?.previous
      )
      message.success('操作失败')
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: [SettingAPI.LIST_QUERY_KEY, pagination.pageSize, pagination.current]
    //   })
    // },
    onSuccess: () => {
      message.success('操作成功')
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => SettingAPI.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [SettingAPI.LIST_QUERY_KEY]
      })
  })

  useEffect(() => {
    const { records, total } = templateQuery.data ?? {}
    if (records && total) {
      setPagination((draft) => {
        draft.total = total
      })
    }
  }, [templateQuery, setPagination])

  // 启用、禁用
  async function toggleEnable(id: number, enabled: boolean) {
    await toggleEnableMutation.mutateAsync({ id, enabled })
  }

  // 删除
  async function handleDelete(id: number) {
    await deleteMutation.mutateAsync(id)
  }

  return (
    <DpTableLayout
      renderOperate={<AButton type="primary">新增</AButton>}
      renderHeader={<DpTableSearch loading={templateQuery.isRefetching} />}
      renderTable={
        <div className="flex min-h-[calc(100vh-250px)] flex-col items-center justify-between gap-2">
          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {(templateQuery.data?.records ?? []).map((item) => (
              <ACard
                key={item.id}
                rootClassName="rounded"
                className="hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-gray-800"
                onMouseEnter={() => hoverDisplay.onMouseEnter(item.id)}
                onMouseLeave={hoverDisplay.onMouseLeave}
                onMouseOver={() => hoverDisplay.onMouseOver(item.id)}
                onMouseOut={hoverDisplay.onMouseOut}
              >
                <AFlex
                  vertical
                  className="space-y-1"
                >
                  <AFlex justify="space-between">
                    <AFlex className="space-x-1">
                      <ATag>{item.id}</ATag>
                      <span>{item.label}</span>
                    </AFlex>
                    <AFlex
                      align="center"
                      className={clsx(
                        'space-x-2 transition-[opacity,transform] duration-500',
                        hoverDisplay.hoverItem === item.id
                          ? 'translate-x-0 opacity-100'
                          : 'translate-x-[-100%] opacity-0'
                      )}
                    >
                      <ATooltip
                        placement="top"
                        title="编辑"
                        arrow
                      >
                        <AIcon
                          className="cursor-pointer text-lg text-muted hover:text-blue-400"
                          size={36}
                          component={EditIcon}
                        />
                      </ATooltip>
                      <ATooltip
                        placement="top"
                        title={item.enabled ? '禁用' : '启用'}
                        arrow
                      >
                        <AIcon
                          onClick={() => toggleEnable(item.id, !item.enabled)}
                          className="cursor-pointer text-lg text-muted hover:text-blue-400"
                          component={item.enabled ? EnableIcon : DisableIcon}
                        />
                      </ATooltip>
                      <ATooltip
                        placement="top"
                        title="删除"
                        arrow
                      >
                        <AIcon
                          onClick={() => handleDelete(item.id)}
                          className="cursor-pointer text-xl text-muted hover:text-red-400"
                          component={DeleteIcon}
                        />
                      </ATooltip>
                    </AFlex>
                  </AFlex>

                  <AFlex className="space-x-2">
                    <AIcon
                      component={KeyIcon}
                      className="text-muted"
                    />
                    <span>{item.key}</span>
                  </AFlex>

                  <AFlex className="space-x-2">
                    <AIcon
                      component={ValueIcon}
                      className="text-muted"
                    />
                    <span>{item.value}</span>
                  </AFlex>

                  <AFlex className="space-x-2 overflow-hidden text-ellipsis">
                    <AIcon
                      component={RemarkIcon}
                      className="text-muted"
                    />
                    <span>{item.remark}</span>
                  </AFlex>
                </AFlex>
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
            size={response.sm ? 'default' : 'small'}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => t('SHOW.TOTAL', { total })}
          />
        </div>
      }
    />
  )
}
