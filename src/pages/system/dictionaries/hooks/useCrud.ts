import type { DetailItems, Dictionary } from '@/types'

import { detailFields } from '../constants'
import type { EnableMutationParams } from '../types'

export const useCrud = () => {
  const queryClient = useQueryClient()
  const { message } = AApp.useApp()

  const [crudForm] = AForm.useForm<Dictionary>()

  const [currentId, setCurrentId] = useState<number>()

  const detailQuery = useQuery({
    queryKey: [DictionaryAPI.DETAIL_QUERY_KEY, currentId],
    queryFn: ({ queryKey }) => DictionaryAPI.detail(queryKey[1] as number),
    select: (res) => res.data,
    enabled: Boolean(currentId)
  })

  const createMutation = useMutation({
    mutationFn: (params: Dictionary) => DictionaryAPI.create(params),
    onSuccess: ({ msg }) => refetchList(msg)
  })

  const updateMutation = useMutation({
    mutationFn: (params: Dictionary) => DictionaryAPI.update(currentId!, params),
    onSuccess: ({ msg }) => refetchList(msg)
  })

  const patchMutation = useMutation({
    mutationFn: ({ id, enabled }: EnableMutationParams) => DictionaryAPI.patch(id, { enabled }),
    onSuccess: ({ msg }) => refetchList(msg)
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => DictionaryAPI.delete(id),
    onSuccess: ({ msg }) => refetchList(msg)
  })

  // 刷新列表
  function refetchList(msg: string) {
    message.success(msg)
    queryClient.invalidateQueries({
      queryKey: [DictionaryAPI.LIST_QUERY_KEY]
    })
  }

  // 切换启用/禁用状态
  const toggleEnabled = async (params: EnableMutationParams) => {
    await patchMutation.mutateAsync(params)
  }

  // 删除
  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id)
  }

  // 创建提交
  const handleCreateSubmit = async (values: Dictionary) => {
    await createMutation.mutateAsync(values)
  }

  // 编辑提交
  const handleEditSubmit = async (values: Dictionary) => {
    await updateMutation.mutateAsync(values)
  }

  // 格式化详情页数据
  const formatDetailItems = (): DetailItems =>
    detailFields.map((i) => ({
      ...i,
      label: i.label(),
      children: i.children({ value: detailQuery.data?.[i.key as keyof Dictionary] as any })
    }))

  return {
    crudForm,
    detail: detailQuery.data,
    detailItems: formatDetailItems(),
    isDetailLoading: detailQuery.isFetching,
    isDeleteLoading: deleteMutation.isPending,
    isPatchLoading: patchMutation.isPending,
    isFormSubmitting: createMutation.isPending || updateMutation.isPending,
    setCurrentId,
    toggleEnabled,
    handleDelete,
    handleCreateSubmit,
    handleEditSubmit
  }
}
