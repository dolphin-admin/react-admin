import type { ColumnsType } from 'antd/es/table'

import type { Setting } from '@/types'
import CheckIcon from '~icons/ic/baseline-check'
import LoadingIcon from '~icons/line-md/loading-twotone-loop'
import RefreshIcon from '~icons/mdi/refresh'

interface FormValues {
  searchText: string
}

export function Component() {
  const { t, i18n } = useTranslation('COMMON')
  const queryClient = useQueryClient()
  const { message } = AApp.useApp()
  const [form] = AForm.useForm<FormValues>()

  const [pagination, setPagination] = useImmer({
    current: 1,
    pageSize: 10,
    total: 0
  })

  const {
    data: queryResult,
    isRefetching,
    isPending,
    refetch
  } = useQuery({
    queryKey: [SettingAPI.SETTING_LIST_QUERY_KEY, pagination.current, pagination.pageSize],
    queryFn: () =>
      SettingAPI.getList(
        new BasePageModel({
          pageSize: pagination.pageSize,
          page: pagination.current,
          searchText: form.getFieldValue('searchText')
        })
      ),
    placeholderData: keepPreviousData
  })

  const enableMutation = useMutation({
    mutationFn: (id: number) => SettingAPI.enable(id),
    onSuccess: ({ message: msg }) => {
      message.success(msg)
      queryClient.invalidateQueries({
        queryKey: [SettingAPI.SETTING_LIST_QUERY_KEY]
      })
    }
  })

  const disableMutation = useMutation({
    mutationFn: (id: number) => SettingAPI.disable(id),
    onSuccess: ({ message: msg }) => {
      message.success(msg)
      queryClient.invalidateQueries({
        queryKey: [SettingAPI.SETTING_LIST_QUERY_KEY]
      })
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => SettingAPI.delete(id),
    onSuccess: ({ message: msg }) => {
      message.success(msg)
      queryClient.invalidateQueries({
        queryKey: [SettingAPI.SETTING_LIST_QUERY_KEY]
      })
    }
  })

  useEffect(() => {
    if (queryResult?.total) {
      setPagination((v) => {
        v.total = queryResult.total
      })
    }
  }, [queryResult])

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
      render: (value) => value && <CheckIcon className="w-full" />
    },
    {
      title: 'Built-in',
      dataIndex: 'builtIn',
      key: 'builtIn',
      width: 100,
      align: 'center',
      render: (value) => value && <CheckIcon className="w-full" />
    },
    {
      title: 'Sort',
      dataIndex: 'sort',
      key: 'sort',
      width: 100,
      align: 'center'
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
      ellipsis: {
        showTitle: true
      }
    },
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

  // 搜索
  const handleSearch = () => refetch()

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
    <TableLayout
      operate={
        <AForm
          className="flex items-center justify-between"
          name="search"
          form={form}
          initialValues={{
            searchText: ''
          }}
          onFinish={handleSearch}
          autoComplete="off"
          disabled={isRefetching}
        >
          <ASpace>
            <AForm.Item
              name="searchText"
              noStyle
            >
              <AInput.Search
                name="searchText"
                placeholder="请输入"
                loading={isRefetching}
                onSearch={handleSearch}
              />
            </AForm.Item>
          </ASpace>
          <ASpace>
            <AButton
              className="!flex items-center justify-center"
              shape="circle"
              icon={<AIcon component={isRefetching ? LoadingIcon : RefreshIcon} />}
              onClick={handleSearch}
            />
            <AButton type="primary">新增</AButton>
          </ASpace>
        </AForm>
      }
      table={
        <ATable<Setting>
          columns={columns}
          dataSource={processI18n(queryResult?.data)}
          scroll={{
            scrollToFirstRowOnChange: true,
            x: 1500
          }}
          loading={isPending}
          pagination={{
            ...pagination,
            onChange: (page, pageSize) => {
              setPagination((v) => {
                v.current = page
                v.pageSize = pageSize
              })
            },
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => t('SHOW.TOTAL', { total })
          }}
        />
      }
    />
  )
}
