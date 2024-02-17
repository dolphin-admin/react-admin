import type { Dictionary } from '@/api/dictionary.type'
import {
  ModalContent,
  useColumns,
  useCrud,
  useDictionariesQuery,
  useDictionaryListParams
} from '@/features/dictionaries'
import { ModalType, useModal } from '@/features/modal'
import { usePagination } from '@/features/pagination'

export function Component() {
  const { t } = useTranslation(['COMMON', 'DICTIONARY', 'VALIDATION'])
  const queryClient = useQueryClient()
  const [searchText, setSearchText] = useState('')

  const { pageParams, pagination, setTotal } = usePagination()
  const { open, modalType, setModalType, getModalTitle, toggle } = useModal()
  const { listParams } = useDictionaryListParams()
  const {
    data: listData,
    isRefetching,
    isFetching
  } = useDictionariesQuery({
    pageParams: { ...pageParams, ...listParams },
    prefetch: true
  })
  const {
    detail,
    detailItems,
    crudForm,
    isDetailLoading,
    isDeleteLoading,
    isPatchLoading,
    isFormSubmitting,
    setCurrentId,
    toggleEnabled,
    handleDelete,
    handleCreateSubmit,
    handleEditSubmit
  } = useCrud()

  const columns = useColumns({
    toggleEnabled,
    handleDelete,
    toggleEditModal,
    toggleDetailModal,
    isDeleteLoading,
    isPatchLoading
  })

  useEffect(() => {
    if (listData) {
      setTotal(listData.total)
    }
  }, [listData, setTotal])

  useEffect(() => {
    if (modalType === ModalType.EDIT) {
      crudForm.setFieldsValue({ ...detail })
    }
  }, [detail])

  // 新增
  function toggleCreateModal() {
    crudForm.resetFields()
    setModalType(ModalType.CREATE)
    toggle()
  }

  // 编辑
  async function toggleEditModal(id: number) {
    queryClient.cancelQueries({ queryKey: [id] })
    setCurrentId(id)
    setModalType(ModalType.EDIT)
    toggle()
  }

  // 详情
  function toggleDetailModal(id: number) {
    setCurrentId(id)
    setModalType(ModalType.DETAIL)
    toggle()
  }

  // 提交表单
  async function handleSubmit(values: Dictionary) {
    if (modalType === ModalType.CREATE) {
      await handleCreateSubmit(values)
    } else if (modalType === ModalType.EDIT) {
      await handleEditSubmit(values)
    }
    toggle()
  }

  return (
    <DpTableLayout
      renderOperate={
        <>
          <AButton type="default">{t('EXPORT')}</AButton>
          <AButton
            type="primary"
            onClick={() => toggleCreateModal()}
          >
            {t('CREATE')}
          </AButton>
        </>
      }
      renderHeader={
        <DpTableSearch
          searchText={searchText}
          setSearchText={setSearchText}
          loading={isRefetching}
          handleSearch={() => {}}
        />
      }
      renderTable={
        <ATable<Dictionary>
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={listData?.records}
          scroll={{
            scrollToFirstRowOnChange: true,
            x: 1500
          }}
          loading={isFetching}
          pagination={pagination}
        />
      }
      renderModal={{
        open,
        title: getModalTitle(),
        onOk: crudForm.submit,
        onCancel: toggle,
        confirmLoading: isFormSubmitting,
        renderContent: (
          <ModalContent
            modalType={modalType}
            detailItems={detailItems}
            crudForm={crudForm}
            isFormSubmitting={isFormSubmitting}
            isDetailLoading={isDetailLoading}
            handleSubmit={(values) => handleSubmit(values)}
          />
        )
      }}
    />
  )
}
