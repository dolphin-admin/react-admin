import type { Dictionary } from '@/api/dictionary.type'
import type { DetailItems } from '@/types'

import { detailFields } from '../constants'
import type { EnableMutationParams } from '../types'

export const useCrud = () => {
  const queryClient = useQueryClient()

  const [crudForm] = AForm.useForm<Dictionary>()

  const [currentId, setCurrentId] = useState<number>()

  const detailQuery = useQuery({
    queryKey: ['DICTIONARY.DETAIL', currentId],
    queryFn: ({ queryKey }) => DictionaryAPI.detail(queryKey[1] as number),
    enabled: Boolean(currentId)
  })

  const createMutation = useMutation({
    mutationFn: (params: Dictionary) => DictionaryAPI.create(params),
    onSuccess: () => refetchList()
  })

  const updateMutation = useMutation({
    mutationFn: (params: Dictionary) => DictionaryAPI.update(currentId!, params),
    onSuccess: () => refetchList()
  })

  const patchMutation = useMutation({
    mutationFn: ({ id, enabled }: EnableMutationParams) => DictionaryAPI.patch(id, { enabled }),
    onSuccess: () => refetchList()
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => DictionaryAPI.delete(id),
    onSuccess: () => refetchList()
  })

  // 刷新列表
  function refetchList() {
    queryClient.invalidateQueries({
      queryKey: ['DICTIONARY.LIST']
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
