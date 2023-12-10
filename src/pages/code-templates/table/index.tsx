import type { ColumnsType } from 'antd/es/table'

import type { Setting } from '@/types'

export function Component() {
  const { t, i18n } = useTranslation('COMMON')
  const response = useResponsive()
  const queryClient = useQueryClient()
  const { message } = AApp.useApp()
  const [searchText, setSearchText] = useState('')
  const searchRef = useRef<string>('')

  const [pagination, setPagination] = useImmer({
    current: 1,
    pageSize: 10,
    total: 0
  })

  const templateQuery = useQuery({
    queryKey: [
      SettingAPI.LIST_QUERY_KEY,
      pagination.current,
      pagination.pageSize,
      searchRef.current
    ],
    queryFn: () =>
      SettingAPI.list(
        new BasePageModel({
          pageSize: pagination.pageSize,
          page: pagination.current,
          searchText: searchRef.current
        })
      ),
    select: (data) => data.data,
    placeholderData: keepPreviousData
  })

  const enableMutation = useMutation({
    mutationFn: (id: number) => SettingAPI.patch(id, { enabled: true }),
    onSuccess: ({ msg }) => {
      message.success(msg)
      queryClient.invalidateQueries({
        queryKey: [SettingAPI.LIST_QUERY_KEY]
      })
    }
  })

  const disableMutation = useMutation({
    mutationFn: (id: number) => SettingAPI.patch(id, { enabled: false }),
    onSuccess: ({ msg }) => {
      AMessage.success(msg)
      queryClient.invalidateQueries({
        queryKey: [SettingAPI.LIST_QUERY_KEY]
      })
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => SettingAPI.delete(id),
    onSuccess: ({ msg }) => {
      AMessage.success(msg)
      queryClient.invalidateQueries({
        queryKey: [SettingAPI.LIST_QUERY_KEY]
      })
    }
  })

  useEffect(() => {
    if (templateQuery.data?.total) {
      setPagination((draft) => {
        draft.total = templateQuery.data.total
      })
    }
  }, [templateQuery.data?.total, setPagination])

  const columns: ColumnsType<Setting> = [
    { title: 'ID', dataIndex: 'id', key: 'id', fixed: 'left', align: 'center', width: 60 },
    { title: 'Label', dataIndex: 'label', key: 'label', fixed: 'left', width: 200 },
    { title: 'Key', dataIndex: 'key', key: 'key', width: 200 },
    { title: 'Value', dataIndex: 'value', key: 'value', width: 200 },
    {
      title: 'Enabled',
      dataIndex: 'enabled',
      key: 'enabled',
      width: 100,
      align: 'center',
      render: (value) => value && <DpIcon type="Check" />
    },
    {
      title: 'Built-in',
      dataIndex: 'builtIn',
      key: 'builtIn',
      width: 100,
      align: 'center',
      render: (value) => value && <DpIcon type="Check" />
    },
    { title: 'Sort', dataIndex: 'sort', key: 'sort', width: 100, align: 'center' },
    { title: 'Remark', dataIndex: 'remark', key: 'remark', ellipsis: { showTitle: true } },
    {
      title: 'Action',
      align: 'center',
      fixed: 'right',
      width: 250,
      render: (_, record) => (
        <ASpace>
          <AButton size="small">编辑</AButton>
          {record.enabled ? (
            <APopconfirm
              title="禁用"
              description="确定执行该操作吗？"
              okText="确定"
              cancelText="取消"
              okButtonProps={{
                loading: disableMutation.isPending
              }}
              onConfirm={() => handleDisable(record.id)}
            >
              <AButton
                danger
                size="small"
              >
                禁用
              </AButton>
            </APopconfirm>
          ) : (
            <APopconfirm
              title="启用"
              description="确定执行该操作吗？"
              okText="确定"
              cancelText="取消"
              okButtonProps={{
                loading: enableMutation.isPending
              }}
              onConfirm={() => handleEnable(record.id)}
            >
              <AButton size="small">启用</AButton>
            </APopconfirm>
          )}
          <APopconfirm
            title="删除"
            description="确定执行该操作吗？"
            okText="确定"
            cancelText="取消"
            okButtonProps={{
              loading: deleteMutation.isPending
            }}
            onConfirm={() => handleDelete(record.id)}
          >
            <AButton
              danger
              size="small"
            >
              删除
            </AButton>
          </APopconfirm>
        </ASpace>
      )
    }
  ]

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

  // 启用
  async function handleEnable(id: number) {
    await enableMutation.mutateAsync(id)
  }

  // 禁用
  async function handleDisable(id: number) {
    await disableMutation.mutateAsync(id)
  }

  // 删除
  async function handleDelete(id: number) {
    await deleteMutation.mutateAsync(id)
  }

  return (
    <DpTableLayout
      renderOperate={<AButton type="primary">新增</AButton>}
      renderHeader={
        <DpTableSearch
          searchText={searchText}
          setSearchText={setSearchText}
          loading={templateQuery.isRefetching}
          handleSearch={() => {
            searchRef.current = searchText
          }}
        />
      }
      renderTable={
        <ATable<Setting>
          columns={columns}
          dataSource={processI18n(templateQuery.data?.records)}
          scroll={{
            scrollToFirstRowOnChange: true,
            x: 1500
          }}
          loading={templateQuery.isFetching}
          pagination={{
            ...pagination,
            onChange: (page, pageSize) => {
              setPagination((draft) => {
                draft.current = page
                draft.pageSize = pageSize
              })
            },
            rootClassName: '!mb-0',
            size: response.sm ? 'default' : 'small',
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => t('SHOW.TOTAL', { total })
          }}
        />
      }
    />
  )
}
