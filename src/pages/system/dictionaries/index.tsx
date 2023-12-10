import { ModalType } from '@/enums'
import type { Dictionary } from '@/types'

import { ModalContent } from './components'
import { useColumns, useCrud, useListQuery, useListSearchParams, useModal } from './hooks'

export function Component() {
  const { t } = useTranslation(['COMMON', 'DICTIONARY', 'VALIDATION'])
  const queryClient = useQueryClient()
  const [searchText, setSearchText] = useState('')

  const { listSearchParams } = useListSearchParams()
  const { open, modalType, setModalType, getModalTitle, toggle } = useModal()
  const { listData, isRefreshing, isListLoading, pagination } = useListQuery({
    params: listSearchParams
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
    queryClient.cancelQueries({ queryKey: [DictionaryAPI.DETAIL_QUERY_KEY, id] })
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
  const handleSubmit = async (values: Dictionary) => {
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
          loading={isRefreshing}
          handleSearch={() => {}}
        />
      }
      renderTable={
        <ATable<Dictionary>
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={listData}
          scroll={{
            scrollToFirstRowOnChange: true,
            x: 1500
          }}
          loading={isListLoading}
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
            handleSubmit={handleSubmit}
          />
        )
      }}
    />
  )
}
